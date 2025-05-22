import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { sendUSDT } from "@/lib/sendUSDT";
import { getTodayDate } from "@/lib/dateUtil";

// ✅ GET 요청도 POST 로직으로 처리
export async function GET() {
  return await POST();
}

export async function POST() {
  const today = getTodayDate();
  console.log("✅ [CRON] /api/send-rewards 실행됨:", new Date().toISOString());
  console.log("📆 오늘 날짜:", today);

  const { data: transfers, error } = await supabase
    .from("reward_transfers")
    .select("ref_code, wallet_address, reward_amount, referral_amount, center_amount, total_amount")
    .eq("reward_date", today)
    .in("status", ["pending", "failed"]);

  if (error || !transfers) {
    console.error("❌ 송금 대상 불러오기 실패:", error);
    return NextResponse.json({ error: "송금 대상 불러오기 실패", detail: error }, { status: 500 });
  }

  console.log("📌 송금 대상 수:", transfers.length);
  const results: any[] = [];

  for (const entry of transfers) {
    const total = Number(entry.total_amount);
    if (total <= 0 || !entry.wallet_address) {
      console.log("⚠️ 유효하지 않은 전송 대상:", entry.ref_code, total, entry.wallet_address);
      continue;
    }

    console.log(`📤 송금 시작 - 대상: ${entry.wallet_address}, 금액: ${total}`);
    let status = "pending";
    let tx_hash = null;
    let error_message = "";

    try {
      const { transactionHash } = await sendUSDT(entry.wallet_address, total);
      tx_hash = transactionHash;
      status = "success";
      console.log("✅ 송금 성공:", tx_hash);
    } catch (err: any) {
      status = "failed";
      error_message = err.message;
      console.error("❌ 송금 실패:", entry.wallet_address, error_message);
    }

    await supabase
      .from("reward_transfers")
      .update({
        tx_hash,
        status,
        error_message,
        executed_at: new Date().toISOString(),
      })
      .eq("ref_code", entry.ref_code)
      .eq("reward_date", today);

    results.push({ ...entry, tx_hash, status });
  }

  console.log("📦 송금 결과:", results);
  return NextResponse.json({ success: true, results });
}
