'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep2_1() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">기술적 분석이란?</h1>
      </div>

      {/* 📊 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📊 기술적 분석의 정의</p>
        <p>
          <strong>기술적 분석</strong>은 과거의 가격 움직임과 거래량 데이터를 기반으로,
          미래의 가격을 예측하려는 분석 방법입니다.
        </p>
        <p>
          주로 <strong>차트, 캔들 패턴, 보조지표</strong> 등을 활용하며,
          수급의 흐름과 심리를 시각적으로 파악할 수 있습니다.
        </p>
      </div>

      {/* 🔍 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">🔍 예시로 이해해보세요</p>
        <p className="font-semibold">📈 차트를 보고 판단하는 분석</p>
        <p>
          예를 들어 비트코인 가격이 반복적으로 30,000달러 근처에서 반등한다면,
          이 가격대를 <strong>지지선</strong>으로 보고 매수 기회로 판단할 수 있습니다.
        </p>
        <p>
          반대로 가격이 33,000달러 부근에서 자주 하락한다면, <strong>저항선</strong>으로 간주되어
          숏 포지션 전략을 세울 수 있습니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 기술적 분석은 과거 데이터를 통해 미래 흐름을 예측하는 도구입니다.
        </p>
      </div>
    </div>
  );
}
