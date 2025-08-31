"use server";

import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";
import { getRewardSetting } from "@/lib/rewards/getRewardSetting";

export async function calculateFeeRewards() {
  const nowIso = getKSTISOString();

  // 1) 리워드 설정
  const settings = await getRewardSetting();
  if (!settings) return { success: false, message: "리워드 설정 불러오기 실패" };

  // 2) 전체 수수료 레코드 (날짜 필터 제거)
  const { data: fees, error: feeError } = await supabase
    .from("fee_records")
    .select("ref_code, name, wallet_address, fee_commission, reward_date, ref_by, ref_by2");

  if (feeError) return { success: false, message: "수수료 로딩 실패", detail: feeError.message };
  if (!fees?.length) return { success: false, message: "수수료 기록 없음" };

  // 3) 계산
  const rows: any[] = [];
  for (const f of fees) {
    const base = Number(f.fee_commission) || 0;
    if (base <= 0) continue;

    const rewardDate = f.reward_date; // ← 날짜는 각 행의 reward_date를 사용

    // 본인
    if (settings.self_rate) {
      rows.push({
        ref_code: f.ref_code,
        name: f.name ?? null,
        wallet_address: f.wallet_address ?? null,
        reward_date: rewardDate,
        created_at: nowIso,
        amount: +(base * (settings.self_rate / 100)).toFixed(6),
        level: 0,
        memo: "수수료 본인 리워드",
      });
    }

    // 초대1
    if (f.ref_by && settings.ref1_rate) {
      rows.push({
        ref_code: f.ref_by,
        name: null,
        wallet_address: null,
        reward_date: rewardDate,
        created_at: nowIso,
        amount: +(base * (settings.ref1_rate / 100)).toFixed(6),
        level: 1,
        memo: "수수료 초대1 리워드",
      });
    }

    // 초대2
    if (f.ref_by2 && settings.ref2_rate) {
      rows.push({
        ref_code: f.ref_by2,
        name: null,
        wallet_address: null,
        reward_date: rewardDate,
        created_at: nowIso,
        amount: +(base * (settings.ref2_rate / 100)).toFixed(6),
        level: 2,
        memo: "수수료 초대2 리워드",
      });
    }
  }

  if (!rows.length) return { success: false, message: "계산된 리워드 없음" };

  // 4) 대량 저장 (1000개씩 분할)
  const chunkSize = 1000;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await supabase.from("reward_invites").insert(chunk);
    if (error) {
      return { success: false, message: "리워드 저장 실패", detail: error.message, insertedUntil: i };
    }
  }

  return { success: true, inserted: rows.length };
}
