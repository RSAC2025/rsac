'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CryptoStep2_4() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">스마트 계약이란?</h1>
      </div>

      {/* 📌 개념 카드 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-500">📌 스마트 계약이란?</p>
        <p>
          스마트 계약(Smart Contract)은 <strong>정해진 조건이 충족되면 자동으로 실행되는 계약</strong>입니다.
        </p>
        <p>
          블록체인 위에서 실행되며, 중개자 없이 <strong>신뢰성 있고 자동화된 거래</strong>를 가능하게 합니다.
        </p>
      </div>

      {/* 🤖 예시 카드 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-500">🤖 예시로 이해해보세요</p>
        <p className="font-semibold">🎫 자동 티켓 판매기</p>
        <p>
          티켓 자판기에 10,000원을 넣으면 바로 티켓이 나오는 것처럼,  
          스마트 계약도 <strong>조건이 맞으면 자동 실행</strong>됩니다.
        </p>
        <p>
          예를 들어 “A가 B에게 코인을 보내면, B는 자동으로 NFT를 전달한다.”  
          → 이 전체 과정이 <strong>프로그램으로 작성되어 블록체인에서 실행</strong>되는 것이 스마트 계약입니다.
        </p>
        <p className="text-yellow-600">
          ✅ 스마트 계약은 자동화된 약속, 중개인이 없는 신뢰 계약입니다.
        </p>
      </div>
    </div>
  );
}
