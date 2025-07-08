'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function DivergencePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white px-4 py-6 space-y-6">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step3-5. 다이버전스 찾기</h1>
      </div>

      {/* 설명 */}
      <div className="space-y-4 text-sm text-gray-800">
        <p>
          다이버전스(Divergence)는 가격과 보조지표 간의 방향이 서로 다를 때 발생하는 현상으로,
          추세 반전을 예측할 수 있는 강력한 시그널로 활용됩니다.
        </p>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg space-y-2">
          <h2 className="font-semibold">📉 대표적인 다이버전스 종류</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>강세 다이버전스 (Bullish Divergence):</strong> 가격은 하락하지만 RSI 등 지표는 상승 → 상승 반전 가능성</li>
            <li><strong>약세 다이버전스 (Bearish Divergence):</strong> 가격은 상승하지만 RSI 등 지표는 하락 → 하락 반전 가능성</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
          <p className="font-semibold">📌 팁</p>
          <p>
            다이버전스는 단독으로 매매 신호로 삼기보다는, 추세선이나 패턴 분석과 함께 사용하여 신뢰도를 높이세요.
          </p>
        </div>
      </div>
    </div>
  );
}
