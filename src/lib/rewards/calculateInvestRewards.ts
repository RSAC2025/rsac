import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";

export async function calculateInvestRewards() {
  const { data: users } = await supabase.from("users").select("*");

  for (const user of users || []) {
    // 예시 계산 로직
    const amount = 1.0;

    await supabase.from("reward_invests").insert([
      {
        ref_code: user.ref_code,
        amount,
        reward_date: getKSTISOString(),
      },
    ]);
  }

  console.log("✅ 투자 리워드 저장 완료");
}
