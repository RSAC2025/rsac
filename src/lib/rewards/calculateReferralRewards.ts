import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";

export async function calculateReferralRewards() {
  const { data: users } = await supabase.from("users").select("*");

  for (const user of users || []) {
    if (!user.ref_by) continue;

    const amount = 0.2;

    await supabase.from("reward_referrals").insert([
      {
        ref_code: user.ref_by,
        amount,
        reward_date: getKSTISOString(),
      },
    ]);
  }

  console.log("✅ 추천 리워드 저장 완료");
}
