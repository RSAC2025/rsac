"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import { supabase } from "@/lib/supabaseClient";
import { getKSTDateString, getKSTISOString } from "@/lib/dateUtil";

export default function RegisterInfoPage() {
  const account = useActiveAccount();
  const router = useRouter();

  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneSuffix, setPhoneSuffix] = useState("");
  const [selectedCenterId, setSelectedCenterId] = useState("");
  const [refBy, setRefBy] = useState("RS10000");

  const centers = [
    { id: "c001", center_name: "써니월센터" },
    { id: "c002", center_name: "선릉센터" },
    { id: "c003", center_name: "웰투센터" },
    { id: "c004", center_name: "광주 SUN센터" },
    { id: "c005", center_name: "센터미정" },
  ];

  useEffect(() => {
    const savedRef = localStorage.getItem("ref_code");
    if (savedRef) setRefBy(savedRef);
  }, []);

  // ✅ 최초 유저 등록용
  useEffect(() => {
    const registerUser = async () => {
      if (!account?.address) return;

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet_address: account.address }),
        });

        if (!res.ok) {
          const err = await res.json();
          console.error("❌ register API 오류:", err.error);
        } else {
          console.log("✅ register API 호출 완료");
        }
      } catch (err) {
        console.error("❌ fetch 실패:", err);
      }
    };

    registerUser();
  }, [account]);

  // ✅ 제출 핸들러
const handleSubmit = async () => {
  if (!account?.address) {
    alert("지갑이 연결되지 않았습니다.");
    return;
  }

  if (!name.trim()) {
    alert("이름을 입력해주세요.");
    return;
  }

  if (phoneSuffix.length !== 8) {
    alert("휴대폰 번호 8자리를 정확히 입력해주세요.");
    return;
  }

  if (!selectedCenterId) {
    alert("센터를 선택해주세요.");
    return;
  }

  const { data: existingName } = await supabase
    .from("users")
    .select("id")
    .eq("name", name.trim())
    .maybeSingle();

  if (existingName) {
    alert("이미 사용 중인 이름입니다. 다른 이름을 입력해주세요.");
    return;
  }

  const email = `${emailId.trim()}@gmail.com`;
  const phone = `010${phoneSuffix}`;
  const wallet_address = account.address.toLowerCase();
  const ref_by_trimmed = refBy.trim();

  // ✅ 1. 유저 정보 업데이트
  const { error } = await supabase
    .from("users")
    .update({
      name: name.trim(),
      email,
      phone,
      center_id: selectedCenterId,
      ref_by: ref_by_trimmed,
    })
    .eq("wallet_address", wallet_address);

  if (error) {
    alert("저장 실패: " + error.message);
    return;
  }

  // ✅ 2. 3초 후 fee_records 직접 저장
  setTimeout(async () => {
    // 2-1. 유저 정보 다시 조회
    const { data: userRow, error: userError } = await supabase
      .from("users")
      .select("ref_code, name, ref_by, center_id")
      .eq("wallet_address", wallet_address)
      .maybeSingle();

    if (userError || !userRow) {
      console.error("❌ 유저 정보 조회 실패:", userError);
      return;
    }

    // 2-2. ref_by2 조회
    let ref_by2 = "";
    if (userRow.ref_by) {
      const { data: parent } = await supabase
        .from("users")
        .select("ref_by")
        .eq("ref_code", userRow.ref_by)
        .maybeSingle();
      ref_by2 = parent?.ref_by || "";
    }

    // 2-3. 날짜
    const created_at = getKSTISOString();
    const reward_date = getKSTDateString();

    // 2-4. 삽입
    const { error: insertError } = await supabase.from("fee_records").insert({
      ref_code: userRow.ref_code,
      wallet_address,
      name: userRow.name,
      ref_by: userRow.ref_by,
      ref_by2,
      center_code: userRow.center_id,
      fee_commission: 0,
      fee_tuition: 0,
      created_at,
      reward_date,
    });

    if (insertError) {
      console.error("❌ fee_records 저장 실패:", insertError.message);
    } else {
      console.log("✅ fee_records 저장 완료");
    }
  }, 3000);

  // ✅ 3. 페이지 이동
  router.push("/home");
};

  return (
    <main className="min-h-screen bg-[#eef3f8] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold text-[#333]">📋 정보 입력하기</h2>
        <p className="text-sm text-[#555]">
          서비스 이용을 위해 아래의 정보를 입력 후 제출해주세요.
        </p>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400"
          placeholder="성함을 입력하세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="relative">
          <input
            type="text"
            placeholder="이메일 ID를 입력하세요"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full pr-28 p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            @gmail.com
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-4 py-3 rounded-lg bg-gray-200 text-sm">010</span>
          <input
            type="text"
            maxLength={8}
            placeholder="휴대폰 뒤 8자리"
            value={phoneSuffix}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setPhoneSuffix(val.slice(0, 8));
            }}
            className="flex-1 p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-[#555]">센터 선택 (필수)</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg bg-white"
            value={selectedCenterId}
            onChange={(e) => setSelectedCenterId(e.target.value)}
          >
            <option value="">센터를 선택하세요</option>
            {centers.map((center) => (
              <option key={center.id} value={center.id}>
                {center.center_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm text-[#555]">추천인 코드 (자동입력 가능)</label>
          <input
            type="text"
            placeholder="예: RS10001"
            value={refBy}
            onChange={(e) => setRefBy(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg mt-4 disabled:bg-gray-400"
          disabled={!name || !emailId || phoneSuffix.length !== 8}
        >
          제출하기
        </button>
      </div>
    </main>
  );
}
