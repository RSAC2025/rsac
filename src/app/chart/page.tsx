"use client";
import { useState } from "react";

export default function ChartRegisterPage() {
  const [uid, setUid] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`UID 제출: ${uid}`);
    // TODO: supabase 저장 등으로 확장 가능
  };

  return (
    <main className="min-h-screen bg-[#f5f7fa] pb-20">
      
      {/* ✅ 상단: 이미지 배너로 대체 */}
<div className="w-full overflow-hidden">
  <img
    src="/tv.png"
    alt="TradingView"
    className="w-full object-cover"
  />
</div>


      {/* ✅ 신청 방법 */}
<section className="px-4 mt-0">
  <div className="bg-[#eaf1fb] rounded-xl shadow p-4 relative">

    {/* ✅ 중앙 상단 타이틀 */}
    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
      <div className="bg-white px-4 py-1 rounded-full shadow text-sm font-bold text-gray-800">
        신청 방법
      </div>
    </div>

    <ol className="pt-5 text-sm text-gray-800 space-y-4">
      <li className="flex items-start space-x-2">
        <span className="text-blue-600 font-bold">①</span>
        <span>
          아래 링크로 접속해 트레이딩뷰 회원가입을 진행해주세요. <br />
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
        <span>
          페이지 하단에 나의 트레이딩뷰 UID를 입력해주세요.{" "}
          <span className="text-red-500 font-semibold">(UID 확인방법)</span>
        </span>
      </li>

      <li className="flex items-start space-x-2">
        <span className="text-blue-600 font-bold">③</span>
        <span>승인이 완료되면</span>
      </li>

      <li className="flex items-start space-x-2">
        <span className="text-blue-600 font-bold">④</span>
        <span>
          트레이딩뷰 뷰어에서 차트를 추가해주세요.{" "}
          <span className="text-red-500 font-semibold">(자동 추가 방법)</span>
        </span>
      </li>
    </ol>
  </div>
</section>


      {/* ✅ UID 입력 */}
      <section className="mt-6 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-4 space-y-3"
        >
          <label className="block text-sm font-semibold text-gray-800">
            트레이딩뷰 UID 입력하기
          </label>
          <input
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="UID를 입력하세요"
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          >
            제출하기
          </button>
        </form>
      </section>
    </main>
  );
}
