'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function BollingerBandsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white px-4 py-6 space-y-6">
      {/* 🔙 돌아가기 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step3-3. 볼린저 밴드란?</h1>
      </div>

      {/* 설명 */}
      <div className="space-y-4 text-sm text-gray-800">
        <p>
          볼린저 밴드는 이동평균선을 중심으로 위아래에 표준편차 범위를 설정하여 밴드를 형성한 보조지표입니다.
        </p>
        <p>
          이 밴드는 가격 변동성이 커지면 넓어지고, 변동성이 줄어들면 좁아집니다. 주로 가격이 밴드를 벗어날 때 추세 변화 신호로 해석됩니다.
        </p>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">✅ 볼린저 밴드 구성</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li>중심선: 일반적으로 20일 단순 이동평균(SMA)</li>
            <li>상단 밴드: 중심선 + 2 × 표준편차</li>
            <li>하단 밴드: 중심선 - 2 × 표준편차</li>
          </ul>
        </div>

        {/* 정리 */}
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
          <p className="font-semibold">📌 요약</p>
          <p>
            가격이 상단 밴드를 돌파하면 과매수, 하단 밴드를 돌파하면 과매도로 해석되며, 추세 전환의 힌트를 줄 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
