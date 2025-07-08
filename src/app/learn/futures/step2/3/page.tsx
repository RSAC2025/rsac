'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep2_3() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">캔들패턴 이해</h1>
      </div>

      {/* 🕯️ 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">🕯️ 캔들패턴이란?</p>
        <p>
          <strong>캔들패턴(Candlestick Pattern)</strong>은 가격의 심리와 방향성을 시각적으로 보여주는 차트 형식입니다.
        </p>
        <p>
          하나의 캔들은 <strong>시가(시작 가격), 종가(마감 가격), 고가, 저가</strong>를 나타내며,  
          그 조합에 따라 상승 또는 하락 신호를 유추할 수 있습니다.
        </p>
      </div>

      {/* 📌 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">📌 대표적인 패턴 예시</p>
        <ul className="list-disc list-inside text-gray-800 space-y-1">
          <li>
            <strong>망치형(hammer)</strong>: 하락장에서 반등 신호로 해석
          </li>
          <li>
            <strong>역망치형(inverted hammer)</strong>: 반등 후 되밀릴 가능성 있음
          </li>
          <li>
            <strong>장대 양봉</strong>: 강한 매수세 → 추세 지속 가능성
          </li>
          <li>
            <strong>도지(doji)</strong>: 매수·매도 세력 균형 → 추세 전환 신호 가능
          </li>
        </ul>
        <p className="text-green-700 font-medium">
          ✅ 캔들패턴을 이해하면 진입 타이밍을 보다 정밀하게 잡을 수 있습니다.
        </p>
      </div>
    </div>
  );
}
