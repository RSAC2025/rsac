import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getKSTISOString, getKSTDateString } from "@/lib/dateUtil"; // ✅ 한국시간 함수 추가

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 추천코드 생성 함수 (RS10100부터 증가)
async function generateNextReferralCode(): Promise<string> {
  const { data, error } = await supabase
    .from("users")
    .select("ref_code")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("❌ ref_code 조회 실패:", error.message);
    throw error;
  }

  let newNumber = 1000;
  if (data.length > 0 && data[0].ref_code?.startsWith("SW")) {
    const lastNum = parseInt(data[0].ref_code.slice(2));
    newNumber = lastNum + 1;
  }

  return `RS${newNumber}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    wallet_address,
    email = "",  
    phone = "01000000000",
    ref_by = "RS10100",
    name = "", // ✅ name 파라미터 받음
  } = body;

  if (!wallet_address) {
    return NextResponse.json({ error: "지갑 주소는 필수입니다." }, { status: 400 });
  }

  const normalizedAddress = wallet_address.toLowerCase();

  // 🔍 이미 등록된 유저 확인
  const { data: existing, error: lookupError } = await supabase
    .from("users")
    .select("id, ref_code, nickname")
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
      nickname: existing.nickname,
    });
  }

  // 🧠 추천인 정보 확인 → 센터 ID 계산
  let center_id = "RS10100"; // 기본 센터
  const { data: referrer, error: referrerError } = await supabase
    .from("users")
    .select("role, center_id, ref_code")
    .eq("ref_code", ref_by)
    .maybeSingle();

  if (referrerError) {
    console.error("❌ 추천인 정보 조회 실패:", referrerError.message);
    return NextResponse.json({ error: "추천인 정보 조회 실패" }, { status: 500 });
  }

  if (referrer) {
    if (referrer.role === "center") {
      center_id = referrer.ref_code;
    } else {
      center_id = referrer.center_id || "RS10100";
    }
  }

  // 신규 추천코드/닉네임 생성
  const newRefCode = await generateNextReferralCode();
  const finalName = name?.trim() || null; // ❗null로 저장하면 이후 name 체크 가능

  // ✅ 가입 날짜/시간 설정 (KST 기준)
  const joinedAt = getKSTISOString();     // 예: 2025-05-26T09:12:33.000Z
  const joinedDate = getKSTDateString();  // 예: 2025-05-26

  // 🆕 신규 유저 등록
  const { data: inserted, error: insertError } = await supabase
    .from("users")
    .insert({
      wallet_address: normalizedAddress,
      email,
      phone,
      nickname: newRefCode,
      name: finalName,
      ref_code: newRefCode,
      ref_by,
      center_id,
      role: "user",
      joined_at: joinedAt,         // ✅ 한국시간 시간
      joined_date: joinedDate,     // ✅ 한국시간 날짜
    })
    .select("id, ref_code, nickname")
    .single();

  if (insertError) {
    console.error("❌ 등록 실패:", insertError.message);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "등록 완료",
    id: inserted.id,
    ref_code: inserted.ref_code,
    nickname: inserted.nickname,
  });
}
