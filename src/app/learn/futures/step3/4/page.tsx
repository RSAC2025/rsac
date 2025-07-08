'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function StochasticPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white px-4 py-6 space-y-6">
      {/* 🔙 돌아가기 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step3-4. 스토캐스틱이란?</h1>
      </div>

      {/* 설명 */}
      <div className="space-y-4 text-sm text-gray-800">
        <p>
          스토캐스틱은 현재의 가격이 일정 기간 동안의 가격 범위 내에서 어느 위치에 있는지를 나타내는 지표입니다.
        </p>
        <p>
          일반적으로 과매수/과매도 상태를 파악하는 데 사용되며, %K와 %D 두 개의 선으로 구성되어 있습니다.
        </p>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">✅ 스토캐스틱 구성</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>%K:</strong> 현재 가격의 상대적 위치</li>
            <li><strong>%D:</strong> %K의 이동평균 (보통 3일)</li>
            <li>두 선의 교차를 통해 매수/매도 신호 포착</li>
          </ul>
        </div>

        {/* 정리 */}
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
          <p className="font-semibold">📌 요약</p>
          <p>
            스토캐스틱이 80 이상이면 과매수, 20 이하이면 과매도로 해석되며, %K가 %D를 상향 돌파하면 매수 신호로 볼 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
