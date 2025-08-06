import { supabase } from "@/lib/supabaseClient";

export async function getRewardSetting(type: "commission" | "tuition" = "commission") {
  const { data, error } = await supabase
    .from("reward_settings")
    .select("*")
    .eq("type", type)
    .single();

  if (error) {
    console.error(`❌ ${type} 리워드 설정 로드 실패:`, error.message);
    return null;
  }

  return data;
}


