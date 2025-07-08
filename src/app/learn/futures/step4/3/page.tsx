'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep4_3() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-6">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">포지션 진입과 종료</h1>
      </div>

      {/* 📘 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 포지션이란?</p>
        <p>
          포지션은 선물 시장에서 현재 보유하고 있는 거래 상태를 의미합니다. 포지션에는 <strong>롱(Long)</strong>과 <strong>숏(Short)</strong>이 있으며, 각각 상승과 하락에 베팅하는 전략입니다.
        </p>
      </div>

      {/* 🔍 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">🔍 예시로 이해해보세요</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>롱 포지션:</strong> 가격 상승을 기대하며 진입 → 낮은 가격에 사서 높은 가격에 판매</li>
          <li><strong>숏 포지션:</strong> 가격 하락을 기대하며 진입 → 높은 가격에 팔고, 낮은 가격에 다시 사서 차익 실현</li>
        </ul>
        <p>
          예: 비트코인이 30,000달러에서 상승할 것으로 예상되면 롱 진입,<br/>
          반대로 하락할 것으로 예상되면 숏 진입을 선택합니다.
        </p>
      </div>

      {/* ✅ 정리 카드 */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-sm">
        <p className="font-semibold">✅ 요약</p>
        <p>
          포지션 진입은 시장 방향성에 대한 판단이며, <strong>진입 가격과 종료(청산) 전략</strong> 설정이 수익률에 큰 영향을 줍니다.
        </p>
      </div>
    </div>
  );
}