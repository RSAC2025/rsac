import { NextResponse } from "next/server";
import { calculateFeeRewards } from "@/lib/rewards/calculateFeeRewards";

export async function POST() {
  try {
    const count = await calculateFeeRewards();
    return NextResponse.json({ count });  // 반드시 count만 있는 객체로 반환
  } catch (error: any) {
    console.error("❌ 리워드 계산 오류:", error);
    return NextResponse.json(
      { success: false, error: error.message || "서버 오류" },
      { status: 500 }
    );
  }
}

