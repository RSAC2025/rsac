"use server";

import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";

export async function buildRewardTransfers() {
  const today = getKSTISOString().slice(0, 10); // YYYY-MM-DD

  // 1. 초대 리워드
  const { data: invites, error: invitesError } = await supabase
    .from("reward_invites")
    .select("ref_code, name, wallet_address, amount")
    .eq("reward_date", today);

  if (invitesError) {
    console.error("❌ 초대 리워드 로딩 실패:", invitesError.message);
    return { success: false, message: invitesError.message };
  }

  // 2. 센터 리워드
  const { data: centers, error: centersError } = await supabase
    .from("reward_centers")
    .select("ref_code, name, wallet_address, amount_fee, amount_tuition")
    .eq("reward_date", today);

  if (centersError) {
    console.error("❌ 센터 리워드 로딩 실패:", centersError.message);
    return { success: false, message: centersError.message };
  }

  const rewardMap = new Map<string, any>();

  // 3. 초대 리워드 집계
  for (const i of invites || []) {
    const item = rewardMap.get(i.ref_code) || {
      ref_code: i.ref_code,
      name: i.name,
      wallet_address: i.wallet_address,
      amount_invite: 0,
      amount_center_fee: 0,
      amount_center_tuition: 0,
    };
    item.amount_invite += i.amount;
    rewardMap.set(i.ref_code, item);
  }

  // 4. 센터 리워드 합산
  for (const c of centers || []) {
    const item = rewardMap.get(c.ref_code) || {
      ref_code: c.ref_code,
      name: c.name,
      wallet_address: c.wallet_address,
      amount_invite: 0,
      amount_center_fee: 0,
      amount_center_tuition: 0,
    };
    item.amount_center_fee += c.amount_fee || 0;
    item.amount_center_tuition += c.amount_tuition || 0;
    rewardMap.set(c.ref_code, item);
  }

  // 5. 저장할 rows 구성
  const rows = Array.from(rewardMap.values()).map((r) => ({
    ref_code: r.ref_code,
    name: r.name,
    wallet_address: r.wallet_address,
    amount_invite: r.amount_invite,
    amount_center_fee: r.amount_center_fee,
    amount_center_tuition: r.amount_center_tuition,
    total_amount: r.amount_invite + r.amount_center_fee + r.amount_center_tuition,
    reward_date: today,
    created_at: getKSTISOString(),
    status: "pending",
    memo: "수수료 리워드 합산",
  }));

  // 6. reward_transfers 저장
  try {
    const { error } = await supabase.from("reward_transfers").insert(rows);
    if (error) {
      console.error("❌ reward_transfers 저장 실패:", error.message);
      return { success: false, message: error.message };
    }
    console.log("✅ reward_transfers 저장 완료:", rows.length, "건");
    return {
      success: true,
      message: `✅ reward_transfers ${rows.length}건 저장`,
      count: rows.length,
    };
  } catch (err: any) {
    console.error("❌ 예외 발생:", err.message || err);
    return { success: false, message: err.message || "알 수 없는 오류" };
  }
}
