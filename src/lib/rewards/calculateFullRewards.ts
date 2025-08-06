import { calculateInvestRewards } from "./calculateInvestRewards";
import { calculateReferralRewards } from "./calculateReferralRewards";
import { calculateCenterRewards } from "./calculateCenterRewards";

export async function calculateFullRewards() {
  console.log("📌 [1] 투자 리워드 계산 중...");
  await calculateInvestRewards();

  console.log("📌 [2] 추천 리워드 계산 중...");
  await calculateReferralRewards();

  console.log("📌 [3] 센터 리워드 계산 중...");
  await calculateCenterRewards();

  console.log("✅ 전체 리워드 계산 완료");
}
