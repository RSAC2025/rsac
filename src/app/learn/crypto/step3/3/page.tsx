'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CryptoStep3_3() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">스테이블코인이란?</h1>
      </div>

      {/* 📌 개념 설명 카드 */}
      <div className="bg-white rounded-xl border border-red-200 shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 스테이블코인이란?</p>
        <p>
          스테이블코인은 <strong>달러나 원화 같은 법정화폐에 가치를 고정</strong>시킨 암호화폐입니다.
        </p>
        <p>
          가격 변동이 큰 비트코인이나 이더리움과 달리, <strong>1:1 환율</strong>을 유지하여 결제, 송금 등에 안정적으로 사용됩니다.
        </p>
      </div>

      {/* 💵 예시 설명 카드 */}
      <div className="bg-white rounded-xl border border-blue-200 shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">💵 이렇게 이해해보세요</p>
        <p className="font-semibold">💰 디지털 달러처럼 쓸 수 있는 암호화폐</p>
        <p>
          예를 들어, <strong>USDT(테더)</strong>는 1달러에 고정된 코인입니다.  
          1 USDT ≒ 1달러로 간주되기 때문에 가격이 급등락하지 않고 <strong>달러 대체 수단</strong>으로 쓰입니다.
        </p>
        <p>
          거래소 간 자산 이동이나 디파이 예치 등에도 많이 활용됩니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 스테이블코인은 암호화폐 세계의 ‘디지털 현금’입니다.
        </p>
      </div>
    </div>
  );
}
