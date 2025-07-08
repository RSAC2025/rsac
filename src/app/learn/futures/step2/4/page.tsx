'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep2_4() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">지지선과 저항선</h1>
      </div>

      {/* 📏 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📏 지지선과 저항선이란?</p>
        <p>
          <strong>지지선</strong>은 가격이 하락하다가 멈추고 반등하기 쉬운 구간입니다.
        </p>
        <p>
          <strong>저항선</strong>은 가격이 상승하다가 되돌리기 쉬운 구간입니다.
        </p>
        <p>
          이 두 선은 <strong>심리적인 매수/매도벽</strong>으로 작용하며, 과거 가격 흐름을 통해 예측할 수 있습니다.
        </p>
      </div>

      {/* 🔍 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">🔍 예시로 이해해보세요</p>
        <p>
          BTC가 여러 번 30,000달러에서 반등했다면 이 구간은 <strong>지지선</strong>으로 간주됩니다.
        </p>
        <p>
          반대로 33,000달러 근처에서 자주 하락했다면 이 구간은 <strong>저항선</strong>입니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 지지선과 저항선을 이용하면 진입과 손절 타이밍을 전략적으로 설정할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
