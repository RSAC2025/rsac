"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import { supabase } from "@/lib/supabaseClient";
import ChartSuccessModal from "@/components/ChartSuccessModal";

export default function ChartRegisterPage() {
  const router = useRouter();
  const account = useActiveAccount();

  const [uid, setUid] = useState("");
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid.trim()) {
      alert("UID를 입력해주세요.");
      return;
    }
    if (!account?.address) {
      alert("지갑이 연결되지 않았습니다.");
      return;
    }

    try {
      setSaving(true);

      // 1) 지갑 주소로 사용자 ref_code 조회
      const wallet = account.address.toLowerCase();
      const { data: user, error: userErr } = await supabase
        .from("users")
        .select("ref_code, name")
        .eq("wallet_address", wallet)
        .maybeSingle();

      if (userErr || !user?.ref_code) {
        alert("사용자 정보를 찾지 못했습니다. (ref_code 없음)");
        return;
      }

      // 2) 해당 ref_code의 최신 수강(enrollments) row 조회
      const { data: latestEnroll, error: enrollErr } = await supabase
        .from("enrollments")
        .select("id, pass_type, pass_expired_at")
        .eq("ref_code", user.ref_code)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (enrollErr || !latestEnroll?.id) {
        alert("수강 내역이 없습니다. 먼저 패스권을 결제/등록해주세요.");
        return;
      }

      // 3) 최신 수강 row의 tv_account 업데이트
      const { error: updateErr } = await supabase
        .from("enrollments")
        .update({ tv_account: uid.trim() })
        .eq("id", latestEnroll.id);

      if (updateErr) {
        console.error("❌ tv_account 업데이트 실패:", updateErr.message);
        alert("저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      // 성공 모달
      setShowModal(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7fa] pb-20">
      {/* 상단: 이미지 배너 + 뒤로가기 */}
      <div className="w-full overflow-hidden relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-10 bg-black bg-opacity-30 text-white text-sm px-3 py-1 rounded-full hover:bg-opacity-50"
        >
          ← Back
        </button>
        <img src="/tv.png" alt="TradingView" className="w-full object-cover" />
      </div>

      {/* 신청 방법 */}
      <section className="px-4 mt-0">
        <div className="bg-[#eaf1fb] rounded-xl shadow p-4 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="bg-white px-4 py-1 rounded-full shadow text-sm font-bold text-gray-800">
              신청 방법
            </div>
          </div>

          <ol className="pt-5 text-sm text-gray-800 space-y-4">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">①</span>
              <span>
                트레이딩뷰에 가입합니다.{" "}
                <a
                  href="https://kr.tradingview.com/"
                  className="text-blue-500 underline"
                  target="_blank"
                >
                  https://kr.tradingview.com/
                </a>
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">②</span>
              <span>하단에 본인의 트레이딩뷰 ID를 입력합니다.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">③</span>
              <span>승인 후 차트를 이용할 수 있습니다.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* ID 입력 */}
      <section className="mt-6 px-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 space-y-3">
          <label className="block text-sm font-semibold text-gray-800">
            트레이딩뷰 ID 입력하기
          </label>
          <input
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="ID를 입력하세요"
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
          />
          <button
            type="submit"
            disabled={saving}
            className={`w-full text-white font-semibold py-2 rounded-md ${
              saving ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "저장 중..." : "제출하기"}
          </button>
        </form>
      </section>

      {/* 제출 후 성공 모달 */}
      {showModal && <ChartSuccessModal uid={uid} onClose={() => setShowModal(false)} />}
    </main>
  );
}
