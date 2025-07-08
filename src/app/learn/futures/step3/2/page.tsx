'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function RSILearnPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white px-4 py-6 space-y-6">
      {/* 🔙 돌아가기 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step3-2. RSI 지표 해석</h1>
      </div>

      {/* 설명 */}
      <div className="space-y-4 text-sm text-gray-800">
        <p>
          RSI(Relative Strength Index)는 주어진 기간 동안의 상승과 하락 강도를 비교하여, 현재 자산의 과매수 또는 과매도 상태를 판단하는 지표입니다.
        </p>
        <p>
          일반적으로 RSI 값이 70 이상이면 과매수(overbought), 30 이하이면 과매도(oversold) 상태로 간주됩니다.
        </p>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">✅ RSI 주요 개념</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li>0~100 사이의 값을 가짐</li>
            <li>보통 14일 기준으로 계산</li>
            <li>과매수 구간: RSI &gt; 70 → 매도 고려</li>
            <li>과매도 구간: RSI &lt; 30 → 매수 고려</li>
          </ul>
        </div>

        {/* 정리 */}
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
          <p className="font-semibold">📌 요약</p>
          <p>
            RSI는 가격의 상대적인 강도를 수치화하여 과매수/과매도를 판단하는 데 유용한 지표입니다. 추세 반전을 예측할 수 있는 보조 도구로 활용됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
