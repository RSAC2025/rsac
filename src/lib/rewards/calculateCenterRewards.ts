"use server";

import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";
import { getRewardSetting } from "@/lib/rewards/getRewardSetting";

export async function calculateCenterRewards() {
  const today = getKSTISOString().slice(0, 10);

  const settings = await getRewardSetting();
  if (!settings) return { success: false, message: "리워드 설정 불러오기 실패" };

  // ✅ 수수료 내역
  const { data: fees } = await supabase
    .from("fee_records")
    .select("ref_code, fee_commission, fee_tuition, center_code")
    .eq("reward_date", today);
  if (!fees) return { success: false, message: "수수료 없음" };

  // ✅ centers 테이블 로딩
  const { data: centers } = await supabase
    .from("centers")
    .select("id, name, ref_code, wallet_address, parent_master_center_id, parent_grand_center_id");
  if (!centers) return { success: false, message: "센터 정보 없음" };

  const centerMap = new Map(centers.map((c) => [c.id, c]));
  const centerByRefCode = new Map(centers.map((c) => [c.ref_code, c]));

  // ✅ 누적 리워드
  const rewardMap = new Map<
    string,
    {
      center_id: string;
      name: string;
      wallet_address: string;
      amount_fee: number;
      amount_tuition: number;
    }
  >();

  for (const fee of fees) {
    const center = centerMap.get(fee.center_code);
    if (!center) continue;

    const centerLeaders = [
      {
        ref_code: center.ref_code,
        rate_fee: settings.center_rate,
        rate_tuition: settings.tuition_center_rate,
      },
    ];

    const master = centerMap.get(center.parent_master_center_id || "");
    if (master) {
      centerLeaders.push({
        ref_code: master.ref_code,
        rate_fee: settings.master_center_rate,
        rate_tuition: 0,
      });
    }

    const grand = centerMap.get(center.parent_grand_center_id || "");
    if (grand) {
      centerLeaders.push({
        ref_code: grand.ref_code,
        rate_fee: settings.grand_center_rate,
        rate_tuition: 0,
      });
    }

    for (const leader of centerLeaders) {
      const leaderCenter = centerByRefCode.get(leader.ref_code);
      if (!leaderCenter) continue;

      const prev = rewardMap.get(leader.ref_code) || {
        center_id: leaderCenter.id,
        name: leaderCenter.name,
        wallet_address: leaderCenter.wallet_address,
        amount_fee: 0,
        amount_tuition: 0,
      };

      prev.amount_fee += (fee.fee_commission || 0) * (leader.rate_fee / 100);
      prev.amount_tuition += (fee.fee_tuition || 0) * (leader.rate_tuition / 100);
      rewardMap.set(leader.ref_code, prev);
    }
  }

  // ✅ 저장
  const rows = Array.from(rewardMap.entries()).map(([ref_code, info]) => ({
    ref_code,
    center_id: info.center_id,
    name: info.name,
    wallet_address: info.wallet_address,
    reward_date: today,
    created_at: getKSTISOString(),
    amount_fee: info.amount_fee,
    amount_tuition: info.amount_tuition,
    memo: "센터 리워드",
  }));

  if (rows.length > 0) {
    const { error } = await supabase.from("reward_centers").insert(rows);
    if (error) {
      console.error("❌ reward_centers insert 실패:", error.message);
      return { success: false, message: error.message };
    }
    console.log("✅ reward_centers 저장 성공:", rows.length, "건");
  } else {
    console.log("ℹ️ 저장할 리워드 없음");
  }

  return { success: true };
}
