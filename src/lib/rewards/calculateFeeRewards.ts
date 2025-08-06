"use server";

import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";
import { getRewardSetting } from "@/lib/rewards/getRewardSetting";

export async function calculateFeeRewards() {
  const today = getKSTISOString().slice(0, 10);

  // 1. 리워드 설정
  const settings = await getRewardSetting();
  if (!settings) return { success: false, message: "리워드 설정 불러오기 실패" };

  // 2. 수수료 기록 조회
  const { data: fees, error: feeError } = await supabase
    .from("fee_records")
    .select("*")
    .eq("reward_date", today);

  if (feeError || !fees || fees.length === 0) {
    return { success: false, message: "수수료 기록 없음" };
  }

  // 3. 유저정보 조회 (ref_code → name, wallet_address 매핑용)
  const { data: users } = await supabase.from("users").select("ref_code, name, wallet_address");
  const userMap = new Map(users?.map((u) => [u.ref_code, u]) || []);

  const rewardInviteRows = [];

  for (const fee of fees) {
    const {
      ref_code,
      fee_commission,
      ref_by,
      ref_by2,
    } = fee;

    // 🔹 본인
    const selfUser = userMap.get(ref_code);
    if (selfUser) {
      rewardInviteRows.push({
        ref_code,
        name: selfUser.name,
        wallet_address: selfUser.wallet_address,
        reward_date: today,
        created_at: getKSTISOString(),
        amount: fee_commission * (settings.self_rate / 100),
        level: 0,
        memo: "수수료 본인 리워드",
      });
    }

    // 🔹 초대1
    const ref1User = ref_by ? userMap.get(ref_by) : null;
    if (ref1User) {
      rewardInviteRows.push({
        ref_code: ref_by,
        name: ref1User.name,
        wallet_address: ref1User.wallet_address,
        reward_date: today,
        created_at: getKSTISOString(),
        amount: fee_commission * (settings.ref1_rate / 100),
        level: 1,
        memo: "수수료 초대1 리워드",
      });
    }

    // 🔹 초대2
    const ref2User = ref_by2 ? userMap.get(ref_by2) : null;
    if (ref2User) {
      rewardInviteRows.push({
        ref_code: ref_by2,
        name: ref2User.name,
        wallet_address: ref2User.wallet_address,
        reward_date: today,
        created_at: getKSTISOString(),
        amount: fee_commission * (settings.ref2_rate / 100),
        level: 2,
        memo: "수수료 초대2 리워드",
      });
    }
  }

  // 4. 저장
  if (rewardInviteRows.length > 0) {
    await supabase.from("reward_invites").insert(rewardInviteRows);
  }

  return rewardInviteRows.length;
}
