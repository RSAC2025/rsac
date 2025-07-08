'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep1_3() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">레버리지와 청산</h1>
      </div>

      {/* ⚙️ 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">⚙️ 레버리지란?</p>
        <p>
          <strong>레버리지(Leverage)</strong>는 내 자본보다 더 큰 금액을 거래할 수 있도록 해주는 기능입니다.
        </p>
        <p>
          예를 들어 100 USDT로 10배 레버리지를 쓰면 1,000 USDT 규모의 포지션을 잡을 수 있습니다.
        </p>

        <p className="font-semibold text-red-600 mt-4">💥 청산이란?</p>
        <p>
          포지션 손실이 커져서 <strong>보증금(증거금)이 모두 사라질 때 강제 종료</strong>되는 것을 청산(Liquidation)이라고 합니다.
        </p>
        <p>
          레버리지를 높일수록 청산 가격도 가까워지므로 주의가 필요합니다.
        </p>
      </div>

      {/* 📊 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">📊 예시로 이해해보세요</p>
        <p className="font-semibold">🔢 10배 레버리지의 위험</p>
        <p>
          비트코인이 30,000달러일 때, 100 USDT로 10배 롱 포지션을 잡았다면 1,000달러 규모의 거래를 하게 됩니다.
        </p>
        <p>
          그런데 가격이 29,000달러까지 떨어지면 보증금이 사라지고 <strong>강제 청산</strong>이 발생합니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 레버리지는 수익을 키우지만, 손실도 빠르게 커집니다.
        </p>
      </div>
    </div>
  );
}
