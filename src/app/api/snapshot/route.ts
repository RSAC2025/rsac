import { NextResponse } from "next/server";
import { calculateAndSaveToRewards } from "@/lib/rewards/calculateAndSaveToRewards";
import { saveToRewardDetailsFromRewards } from "@/lib/rewards/saveToRewardDetailsFromRewards";
import { saveToRewardTransfers } from "@/lib/rewards/saveToRewardTransfers";

export async function POST() {
  return handleSnapshot();
}

export async function GET() {
  return handleSnapshot();
}

async function handleSnapshot() {
  try {
    await calculateAndSaveToRewards();
    await saveToRewardDetailsFromRewards();
    await saveToRewardTransfers();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("스냅샷 작업 실패:", error);
    return NextResponse.json(
      { error: "스냅샷 작업 실패", detail: error },
      { status: 500 }
    );
  }
}
