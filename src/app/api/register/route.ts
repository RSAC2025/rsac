import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getKSTISOString, getKSTDateString } from "@/lib/dateUtil";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 🎯 추천 코드 생성
async function generateNextReferralCode(): Promise<string> {
  let newNumber = 10000;

  while (true) {
    const newCode = `RS${newNumber}`;
    const { data, error } = await supabase
      .from("users")
      .select("ref_code")
      .eq("ref_code", newCode)
      .maybeSingle();

    if (error) {
      console.error("❌ ref_code 중복 확인 실패:", error.message);
      throw error;
    }

    if (!data) return newCode;
    newNumber++;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    wallet_address,
    email = "",
    phone = "01000000000",
    ref_by = "RS10000",
    name = "",
    center_id = "C001",
  } = body;

  if (!wallet_address) {
    return NextResponse.json({ error: "지갑 주소는 필수입니다." }, { status: 400 });
  }

  const normalizedAddress = wallet_address.toLowerCase();

  // ✅ 기존 유저 확인
  const { data: existing, error: lookupError } = await supabase
    .from("users")
    .select("id, ref_code")
    .eq("wallet_address", normalizedAddress)
    .maybeSingle();

  if (lookupError) {
    console.error("❌ 유저 조회 실패:", lookupError.message);
    return NextResponse.json({ error: "유저 조회 실패" }, { status: 500 });
  }

  if (existing) {
    return NextResponse.json({
      message: "이미 등록된 유저입니다.",
      id: existing.id,
      ref_code: existing.ref_code,
    });
  }

  // ✅ 추천 코드 생성
  const newRefCode = await generateNextReferralCode();
  const finalName = name?.trim() || null;
  const joinedAt = getKSTISOString();
  const joinedDate = getKSTDateString();

  // ✅ 유저 등록
  const { data: inserted, error: insertError } = await supabase
    .from("users")
    .insert({
      wallet_address: normalizedAddress,
      email,
      phone,
      name: finalName,
      ref_code: newRefCode,
      ref_by,
      center_id,
      joined_at: joinedAt,
      joined_date: joinedDate,
    })
    .select("id, ref_code")
    .single();

  if (insertError) {
    console.error("❌ 등록 실패:", insertError.message);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // ✅ 유저 정보 확인용 로깅 (fee_records 저장은 이제 제외됨)
  const { data: userRow, error: userError } = await supabase
    .from("users")
    .select("ref_code, name, ref_by, center_id")
    .eq("id", inserted.id)
    .maybeSingle();

  if (userError || !userRow) {
    console.error("❌ 사용자 정보 로드 실패:", userError);
  }

  return NextResponse.json({
    message: "등록 완료",
    id: inserted.id,
    ref_code: inserted.ref_code,
  });
}
