"use server";

import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";

export async function buildRewardTransfers() {
  const today = getKSTISOString().slice(0, 10);
  const nowIso = getKSTISOString();

  // 1) 초대 리워드(전체)
  const { data: invites, error: invitesError } = await supabase
    .from("reward_invites")
    .select("ref_code, name, wallet_address, amount");
  if (invitesError) {
    console.error("❌ 초대 리워드 로딩 실패:", invitesError.message);
    return { success: false, message: invitesError.message };
  }

  // 2) 센터 리워드(전체)
  const { data: centers, error: centersError } = await supabase
    .from("reward_centers")
    .select("ref_code, name, wallet_address, amount_fee, amount_tuition");
  if (centersError) {
    console.error("❌ 센터 리워드 로딩 실패:", centersError.message);
    return { success: false, message: centersError.message };
  }

  // 3) ref_code 기준 누적 합산
  type Agg = {
    ref_code: string;
    name: string | null;
    wallet_address: string | null;
    amount_invite: number;
    amount_center_fee: number;
    amount_center_tuition: number;
  };
  const agg = new Map<string, Agg>();

  const upsertAgg = (ref: string, name?: string | null, wallet?: string | null) => {
    const cur = agg.get(ref) || {
      ref_code: ref,
      name: null,
      wallet_address: null,
      amount_invite: 0,
      amount_center_fee: 0,
      amount_center_tuition: 0,
    };
    // 빈 값이면 채워주기(어느 쪽이든 먼저 들어온 유효 값 사용)
    if (!cur.name && name) cur.name = name;
    if (!cur.wallet_address && wallet) cur.wallet_address = wallet;
    agg.set(ref, cur);
    return cur;
  };

  for (const i of invites || []) {
    const cur = upsertAgg(i.ref_code, i.name ?? null, i.wallet_address ?? null);
    cur.amount_invite += Number(i.amount) || 0;
  }

  for (const c of centers || []) {
    const cur = upsertAgg(c.ref_code, c.name ?? null, c.wallet_address ?? null);
    cur.amount_center_fee += Number(c.amount_fee) || 0;
    cur.amount_center_tuition += Number(c.amount_tuition) || 0;
  }

  // 4) 저장용 행(초대 코드 기준 1행)
  const rows = Array.from(agg.values()).map((r) => ({
    ref_code: r.ref_code,
    name: r.name,
    wallet_address: r.wallet_address,
    amount_invite: +r.amount_invite.toFixed(6),
    amount_center_fee: +r.amount_center_fee.toFixed(6),
    amount_center_tuition: +r.amount_center_tuition.toFixed(6),
    total_amount: +(r.amount_invite + r.amount_center_fee + r.amount_center_tuition).toFixed(6),
    reward_date: today,            // ← 실행일로 저장
    created_at: nowIso,
    status: "pending",
    memo: "초대코드 기준 누적 합산",
  }));

  if (!rows.length) return { success: true, message: "저장할 데이터 없음", count: 0 };

  // 5) 저장
  const { error } = await supabase.from("reward_transfers").insert(rows);
  if (error) {
    console.error("❌ reward_transfers 저장 실패:", error.message);
    return { success: false, message: error.message };
  }

  return { success: true, message: `✅ reward_transfers ${rows.length}건 저장(초대코드 기준 누적)`, count: rows.length };
}
