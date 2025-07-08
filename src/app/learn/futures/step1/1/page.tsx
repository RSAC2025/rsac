'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep1_1() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">선물거래란?</h1>
      </div>

      {/* 📌 개념 설명 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 선물거래란 무엇인가요?</p>
        <p>
          선물거래는 <strong>‘나중에 정해진 시점에, 정해진 가격으로 사고팔기로 약속하는 거래’</strong>입니다.
        </p>
        <p>
          쉽게 말하면, 현재는 자산을 주고받지 않지만 미래의 특정 시점에 <strong>가격을 미리 약속하고 거래하는 계약</strong>이라고 볼 수 있습니다.
        </p>
      </div>

      {/* 🎯 예시 설명 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">🎯 예시로 이해해보세요</p>
        <p className="font-semibold">🍎 사과 선물거래 이야기</p>
        <p>
          A씨는 사과 농장 주인이고, B씨는 마트 운영자입니다.  
          두 사람은 이렇게 약속합니다.
        </p>
        <p>
          <em>“3개월 뒤, 사과 1박스를 20,000원에 판매하기로!”</em>
        </p>
        <p>
          만약 3개월 후 사과 가격이 25,000원이 되었다면?  
          B씨는 싸게 산 셈이고 A씨는 손해입니다.  
          반대로 가격이 15,000원이 되었다면 A씨가 이익입니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 선물거래는 미래 가격을 예측하고 미리 사고파는 계약입니다.
        </p>
      </div>
    </div>
  );
}
