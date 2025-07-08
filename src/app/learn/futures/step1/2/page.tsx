'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep1_2() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">롱과 숏 포지션</h1>
      </div>

      {/* 📌 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 롱과 숏이란?</p>
        <p>
          <strong>롱(Long)</strong>은 가격 상승에 베팅하는 포지션입니다.  
          자산 가격이 오를수록 수익이 납니다.
        </p>
        <p>
          <strong>숏(Short)</strong>은 가격 하락에 베팅하는 포지션입니다.  
          자산 가격이 떨어질수록 수익이 납니다.
        </p>
        <p>
          선물거래에서는 <strong>상승과 하락 모두 수익 기회</strong>가 존재하지만, 반대 방향으로 움직이면 손실이 발생합니다.
        </p>
      </div>

      {/* 🧭 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">🧭 예시로 이해해보세요</p>
        <p className="font-semibold">📈 비트코인을 롱으로 진입한 경우</p>
        <p>
          현재 비트코인이 30,000달러일 때 롱(매수) 포지션을 잡았고,  
          이후 32,000달러로 올랐다면 차익이 발생합니다.
        </p>
        <p className="font-semibold">📉 반대로 숏으로 진입한 경우</p>
        <p>
          30,000달러에서 숏(매도) 포지션을 잡고,  
          이후 28,000달러로 떨어졌다면 역시 차익이 발생합니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 롱은 상승에, 숏은 하락에 투자하는 방식입니다.
        </p>
      </div>
    </div>
  );
}
