"use server";

import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";
import { getRewardSetting } from "@/lib/rewards/getRewardSetting";

export async function calculateCenterRewards() {
  const nowIso = getKSTISOString();

  // 1) 리워드 설정
  const settings = await getRewardSetting();
  if (!settings) return { success: false, message: "리워드 설정 불러오기 실패" };

  // 2) 수수료 전체 로딩 (날짜 필터 제거)
  const { data: fees, error: feeErr } = await supabase
    .from("fee_records")
    .select("ref_code, fee_commission, fee_tuition, center_code, reward_date");
  if (feeErr) return { success: false, message: "수수료 로딩 실패", detail: feeErr.message };
  if (!fees?.length) return { success: false, message: "수수료 없음" };

  // 3) 센터 로딩
  const { data: centers, error: centerErr } = await supabase
    .from("centers")
    .select("id, name, ref_code, wallet_address, parent_master_center_id, parent_grand_center_id");
  if (centerErr) return { success: false, message: "센터 정보 로딩 실패", detail: centerErr.message };
  if (!centers?.length) return { success: false, message: "센터 정보 없음" };

  const centerMap = new Map(centers.map((c) => [c.id, c]));
  const centerByRefCode = new Map(centers.map((c) => [c.ref_code, c]));

  // 4) 날짜별/리더별 누적 구조: key = `${leaderRef}|${reward_date}`
  const rewardMap = new Map<
    string,
    {
      ref_code: string;           // 리더 ref_code
      reward_date: string;        // fee_records.reward_date
      center_id: string;
      name: string | null;
      wallet_address: string | null;
      amount_fee: number;
      amount_tuition: number;
    }
  >();

  for (const f of fees) {
    const baseFee  = Number(f.fee_commission) || 0;
    const baseTu   = Number(f.fee_tuition) || 0;
    const rdate    = f.reward_date as string;
    if ((!baseFee && !baseTu) || !f.center_code || !rdate) continue;

    const center = centerMap.get(f.center_code);
    if (!center) continue;

    // 센터/마스터/그랜드 레벨 정의
    const leaders: Array<{ ref_code: string; rate_fee: number; rate_tuition: number }> = [
      { ref_code: center.ref_code, rate_fee: settings.center_rate || 0, rate_tuition: settings.tuition_center_rate || 0 },
    ];

    const master = centerMap.get(center.parent_master_center_id || "");
    if (master) leaders.push({ ref_code: master.ref_code, rate_fee: settings.master_center_rate || 0, rate_tuition: 0 });

    const grand = centerMap.get(center.parent_grand_center_id || "");
    if (grand) leaders.push({ ref_code: grand.ref_code, rate_fee: settings.grand_center_rate || 0, rate_tuition: 0 });

    // 리더별/날짜별 합산
    for (const L of leaders) {
      const meta = centerByRefCode.get(L.ref_code);
      if (!meta) continue;

      const key = `${L.ref_code}|${rdate}`;
      const prev =
        rewardMap.get(key) ||
        {
          ref_code: L.ref_code,
          reward_date: rdate,
          center_id: meta.id,
          name: meta.name ?? null,
          wallet_address: meta.wallet_address ?? null,
          amount_fee: 0,
          amount_tuition: 0,
        };

      prev.amount_fee += baseFee * (L.rate_fee / 100);
      prev.amount_tuition += baseTu * (L.rate_tuition / 100);
      rewardMap.set(key, prev);
    }
  }

  // 5) 저장용 행 생성 (소수 고정)
  const rows = Array.from(rewardMap.values())
    .filter(r => r.amount_fee > 0 || r.amount_tuition > 0)
    .map(r => ({
      ref_code: r.ref_code,
      center_id: r.center_id,
      name: r.name,
      wallet_address: r.wallet_address,
      reward_date: r.reward_date,          // ← fee_records의 날짜 유지
      created_at: nowIso,
      amount_fee: +r.amount_fee.toFixed(6),
      amount_tuition: +r.amount_tuition.toFixed(6),
      memo: "센터 리워드",
    }));

  if (!rows.length) return { success: true, inserted: 0, message: "저장할 리워드 없음" };

  // 6) 대량 저장 (1000개씩)
  const chunkSize = 1000;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await supabase.from("reward_centers").insert(chunk);
    if (error) {
      return { success: false, message: "reward_centers 저장 실패", detail: error.message, insertedUntil: i };
    }
  }

  return { success: true, inserted: rows.length };
}
