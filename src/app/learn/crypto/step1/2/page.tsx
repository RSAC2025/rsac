'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CryptoTopic2() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 뒤로가기 + 제목 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">법정화폐와의 차이점</h1>
      </div>

      {/* ✅ 개념 설명 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-500">📌 법정화폐와 암호화폐, 어떻게 다를까요?</p>
        <p>
          <strong>법정화폐</strong>는 정부가 발행하고, 중앙은행이 관리하는 화폐입니다.  
          예: 원화(KRW), 달러(USD), 유로(EUR)
        </p>
        <p>
          <strong>암호화폐</strong>는 블록체인 네트워크에서 발행되며, 중앙 기관 없이 탈중앙화된 방식으로 운영됩니다.  
          예: 비트코인(BTC), 이더리움(ETH)
        </p>
      </div>

      {/* ✅ 비교 예시 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-3">
        <p className="font-semibold text-blue-500">📊 예시로 비교해보세요</p>

        <div className="grid grid-cols-2 gap-2 text-center text-sm">
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-gray-500">법정화폐</p>
            <p className="font-semibold text-black">정부가 발행</p>
            <p className="text-xs text-gray-500">은행을 통해 유통</p>
          </div>
          <div className="bg-blue-100 rounded-lg p-3">
            <p className="text-gray-500">암호화폐</p>
            <p className="font-semibold text-blue-700">누구나 발행 가능</p>
            <p className="text-xs text-gray-500">P2P로 직접 거래</p>
          </div>
        </div>

        <p className="text-yellow-600 mt-2">
          ✅ 암호화폐는 ‘디지털 시대의 자유로운 화폐’입니다.
        </p>
      </div>
    </div>
  );
}
