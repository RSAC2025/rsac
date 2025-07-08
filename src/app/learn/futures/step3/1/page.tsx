'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function MACDLearnPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white px-4 py-6 space-y-6">
      {/* 🔙 돌아가기 버튼 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step3-1. MACD 이해하기</h1>
      </div>

      {/* 설명 */}
      <div className="space-y-4 text-sm text-gray-800">
        <p>
          MACD는 이동 평균 수렴 확산 지표로, 시장의 추세 전환 시점을 포착하는 데 유용한 보조 지표입니다.
        </p>
        <p>
          MACD는 두 개의 이동 평균선(EMA) 간의 차이를 기반으로 계산되며, 시그널선과의 교차를 통해 매매 시점을 판단합니다.
        </p>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">✅ MACD 구성 요소</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li><b>MACD선</b>: 단기 EMA - 장기 EMA</li>
            <li><b>시그널선</b>: MACD의 9일 EMA</li>
            <li><b>히스토그램</b>: MACD와 시그널선의 차이</li>
          </ul>
        </div>


        {/* 정리 */}
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
          <p className="font-semibold">📌 요약</p>
          <p>
            MACD는 추세의 강도와 방향성을 파악할 수 있는 지표로, 시그널선과의 교차를 통해 매수/매도 시점을 예측할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
