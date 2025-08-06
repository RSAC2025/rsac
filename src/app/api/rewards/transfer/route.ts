import { NextResponse } from "next/server";
import { buildRewardTransfers } from "@/lib/rewards/buildRewardTransfers";

export async function POST() {
  try {
    const result = await buildRewardTransfers();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("❌ reward_transfers 저장 오류:", error);
    return NextResponse.json(
      { success: false, error: error.message || "서버 오류" },
      { status: 500 }
    );
  }
}
