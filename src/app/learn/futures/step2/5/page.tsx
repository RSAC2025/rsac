'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep2_5() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">추세선과 거래량</h1>
      </div>

      {/* 📈 개념 카드 */}
      <div className="bg-white border border-purple-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-purple-600">📈 추세선이란?</p>
        <p>
          추세선은 가격의 고점 또는 저점을 연결해 <strong>상승, 하락, 횡보</strong> 추세를 시각화한 선입니다.
        </p>
        <p>
          <strong>상승 추세선</strong>은 저점을 연결하며, <strong>하락 추세선</strong>은 고점을 연결합니다.
        </p>
      </div>

      {/* 📊 거래량 카드 */}
      <div className="bg-white border border-orange-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-orange-600">📊 거래량의 의미</p>
        <p>
          거래량은 특정 시간 동안 <strong>얼마나 많은 매매가 이루어졌는지</strong>를 나타냅니다.
        </p>
        <p>
          상승/하락과 함께 거래량이 증가하면 <strong>신뢰할 수 있는 추세</strong>로 판단되고,
          거래량이 적으면 <strong>일시적인 움직임</strong>일 수 있습니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 추세선과 거래량을 함께 분석하면 더 정확한 트레이딩 전략을 세울 수 있습니다.
        </p>
      </div>
    </div>
  );
}
