"use server";

import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";
import { sendUSDT } from "@/lib/sendUSDT";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "@/lib/client";

export async function sendRewardUSDT() {
  const today = getKSTISOString().slice(0, 10); // YYYY-MM-DD

  const adminWallet = privateKeyToAccount({
    client,
    privateKey: process.env.ADMIN_PRIVATE_KEY!,
  });

  console.log("🚀 송금 지갑 주소:", adminWallet.address);

  const { data: targets, error: loadError } = await supabase
    .from("reward_transfers")
    .select("*")
    .eq("reward_date", today)
    .eq("status", "pending");

  if (loadError) {
    console.error("❌ 대상 조회 실패:", loadError.message);
    return { success: false, message: "송금 대상 조회 실패" };
  }

  if (!targets || targets.length === 0) {
    return { success: false, message: "송금 대상 없음" };
  }

  let successCount = 0;
  let failCount = 0;

  for (const reward of targets) {
    const { id, wallet_address, total_amount } = reward;

    try {
      console.log(`📤 송금 시도 → ${wallet_address}, 금액: ${total_amount}`);
      const tx = await sendUSDT(wallet_address, total_amount);

      if (!tx?.transactionHash) {
        console.error("❗ 트랜잭션 응답:", tx);
        throw new Error("트랜잭션 해시 없음");
      }

      console.log(`📝 상태 업데이트 → ${id}, status: completed`);

      const { error: updateError } = await supabase
        .from("reward_transfers")
        .update({
          status: "completed",
          tx_hash: tx.transactionHash,
          updated_at: getKSTISOString(),
        })
        .eq("id", id);

      if (updateError) {
        console.error(`⚠️ 상태 업데이트 실패 → ${id}`, updateError.message);
      }

      console.log(`✅ 송금 성공 → ${wallet_address}, TX: ${tx.transactionHash}`);
      successCount++;
    } catch (err: any) {
      console.error(`❌ 송금 실패 → ${wallet_address}`, err?.message || err);

      console.log(`📝 상태 업데이트 → ${id}, status: failed`);

      const { error: failUpdateError } = await supabase
        .from("reward_transfers")
        .update({
          status: "failed",
          memo: (err?.message || "송금 실패").slice(0, 100),
          updated_at: getKSTISOString(),
        })
        .eq("id", id);

      if (failUpdateError) {
        console.error(`⚠️ 실패 상태 업데이트 오류 → ${id}`, failUpdateError.message);
      }

      failCount++;
    }
  }

  return {
    success: true,
    message: `✅ 송금 완료: ${successCount}건 성공 / ${failCount}건 실패`,
    count: successCount,
    failed: failCount,
  };
}
