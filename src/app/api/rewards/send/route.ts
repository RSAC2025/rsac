import { NextResponse } from "next/server";
import { sendRewardUSDT } from "@/lib/rewards/sendRewardUSDT";

export async function POST() {
  try {
    const result = await sendRewardUSDT();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("❌ 송금 처리 오류:", error);
    return NextResponse.json(
      { success: false, error: error.message || "서버 오류" },
      { status: 500 }
    );
  }
}
