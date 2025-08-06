import { NextResponse } from "next/server";
import { calculateCenterRewards } from "../../../../lib/rewards/calculateCenterRewards";


export async function POST() {
  try {
    const result = await calculateCenterRewards();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("❌ 수강료 리워드 계산 오류:", error);
    return NextResponse.json({ success: false, error: error.message || "서버 오류" }, { status: 500 });
  }
}
