'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep4_2() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-6">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">주문 방식 이해하기</h1>
      </div>

      {/* 📘 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 주문 방식이란?</p>
        <p>
          거래소에서 암호화폐를 사고팔 때 사용하는 방식입니다. 사용자는 다양한 주문 방식 중 상황에 맞는 것을 선택해 거래할 수 있습니다.
        </p>
        <p>
          대표적인 주문 방식에는 <strong>지정가, 시장가, 스탑 리밋</strong>이 있습니다.
        </p>
      </div>

      {/* 🔍 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">🔍 주문 방식 예시</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>지정가:</strong> 내가 원하는 가격에 사고팔고 싶을 때 사용</li>
          <li><strong>시장가:</strong> 현재 시장 가격에 즉시 체결</li>
          <li><strong>스탑 리밋:</strong> 지정한 가격에 도달하면 자동으로 지정가 주문이 실행</li>
        </ul>
        <p>
          예: 비트코인을 35,000달러에 사고 싶다면 → <strong>지정가 주문</strong><br/>
          지금 바로 사고 싶다면 → <strong>시장가 주문</strong>
        </p>
      </div>

      {/* ✅ 정리 카드 */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-sm">
        <p className="font-semibold">✅ 요약</p>
        <p>
          시장 상황에 따라 적절한 주문 방식을 선택하면, 보다 전략적인 매매가 가능합니다.
        </p>
      </div>
    </div>
  );
}