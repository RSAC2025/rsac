'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep2_2() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">차트 보는 법</h1>
      </div>

      {/* 📉 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📉 차트란 무엇인가요?</p>
        <p>
          <strong>차트(Chart)</strong>는 자산의 가격 변화와 거래량을 시각적으로 보여주는 도구입니다.  
          주로 <strong>캔들 차트</strong>를 많이 사용하며, 시간 단위별로 매수/매도 흐름을 쉽게 파악할 수 있습니다.
        </p>
        <p>
          기본적으로 <strong>시간봉</strong>에 따라 1분, 1시간, 1일 등 다양한 차트를 볼 수 있습니다.
        </p>
      </div>

      {/* 👁️‍🗨️ 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">👁️‍🗨️ 예시로 이해해보세요</p>
        <p className="font-semibold">🕒 1시간봉 차트를 본다면?</p>
        <p>
          하나의 캔들이 1시간 동안의 가격 움직임을 보여줍니다.  
          <strong>시가, 종가, 고가, 저가</strong>가 시각적으로 표시되어,  
          매수세/매도세를 쉽게 분석할 수 있습니다.
        </p>
        <p>
          예를 들어, 여러 개의 양봉이 연속된다면 <strong>상승 추세</strong>로 판단할 수 있고,  
          음봉이 연속되면 <strong>하락세</strong>로 간주할 수 있습니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 차트를 보면 매수/매도 타이밍을 시각적으로 판단할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
