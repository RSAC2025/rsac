import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";

export async function saveToRewardTransfers(data: {
  wallet_address: string;
  total_amount: number;
  ref_code: string;
  name: string;
  created_by: string;
}) {
  const payload = {
    ...data,
    created_at: getKSTISOString(),
    status: "pending",
  };

  const { error } = await supabase.from("reward_transfers").insert([payload]);

  if (error) {
    console.error("❌ reward_transfers 저장 실패:", error.message);
    throw new Error("reward_transfers 저장 오류");
  }

  console.log("✅ reward_transfers 저장 완료:", data.wallet_address);
}
