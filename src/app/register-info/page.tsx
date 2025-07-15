"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterInfoPage() {
  const account = useActiveAccount();
  const router = useRouter();

  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneSuffix, setPhoneSuffix] = useState("");
  const [selectedCenterId, setSelectedCenterId] = useState("CENTER001");
  const [refBy, setRefBy] = useState("RS10100");
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    // ✅ 센터 목록 불러오기
    const fetchCenters = async () => {
      const { data } = await supabase.from("centers").select("id, center_name");
      if (data) setCenters(data);
    };

    // ✅ localStorage 추천코드 있으면 자동 세팅
    const savedRef = localStorage.getItem("ref_code");
    if (savedRef) setRefBy(savedRef);

    fetchCenters();
  }, []);

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

    // ✅ 이름 중복 확인
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

    const { error } = await supabase
      .from("users")
      .update({
        name: name.trim(),
        email,
        phone,
        center_id: selectedCenterId,
        ref_by: refBy.trim(),
      })
      .eq("wallet_address", account.address.toLowerCase());

    if (error) {
      alert("저장 실패: " + error.message);
    } else {
      router.push("/home");
    }
  };

  return (
    <main className="min-h-screen bg-[#eef3f8] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold text-[#333]">📋 정보 입력하기</h2>
        <p className="text-sm text-[#555]">서비스 이용을 위해 아래의 정보를 입력 후 제출해주세요.</p>

        {/* 이름 */}
        <input
          className="w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400"
          placeholder="성함을 입력하세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* 이메일 */}
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

        {/* 전화번호 */}
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

        {/* ✅ 센터 선택 */}
        <div>
          <label className="block mb-1 text-sm text-[#555]">센터 선택</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg bg-white"
            value={selectedCenterId}
            onChange={(e) => setSelectedCenterId(e.target.value)}
          >
            {centers.map((center) => (
              <option key={center.id} value={center.id}>
                {center.center_name}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ 추천인 코드 */}
        <div>
          <label className="block mb-1 text-sm text-[#555]">추천인 코드 (자동입력 가능)</label>
          <input
            type="text"
            placeholder="예: RS10100"
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
