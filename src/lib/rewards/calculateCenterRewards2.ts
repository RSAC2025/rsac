import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";

export async function calculateCenterRewards() {
  const { data: users } = await supabase.from("users").select("*");

  for (const user of users || []) {
    if (!user.center_id) continue;

    const amount = 0.1;

    await supabase.from("reward_centers").insert([
      {
        ref_code: user.center_id,
        amount,
        reward_date: getKSTISOString(),
      },
    ]);
  }

  console.log("✅ 센터 리워드 저장 완료");
}
