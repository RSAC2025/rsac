'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CryptoTopic4() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단 뒤로가기 + 제목 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">탈중앙화란?</h1>
      </div>

      {/* ✅ 개념 카드 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-500">📌 탈중앙화란 무엇인가요?</p>
        <p>
          탈중앙화는 ‘<strong>중앙의 통제 없이 여러 참여자들이 함께 운영하는 구조</strong>’를 의미합니다.
        </p>
        <p>
          예를 들어, 전통적인 은행 시스템은 중앙에서 계좌를 관리하고 승인하지만,  
          탈중앙화 시스템에서는 <strong>모든 거래가 네트워크 참가자들의 동의</strong>로 처리됩니다.
        </p>
      </div>

      {/* ✅ 이해 예시 카드 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-500">🕸 예시로 이해해보세요</p>
        <p className="font-semibold">🏫 중앙화된 구조 vs 🕸 탈중앙화된 구조</p>
        <p>
          중앙화된 구조는 ‘교장 선생님 혼자 모든 걸 결정하는 학교’와 같고,  
          탈중앙화는 ‘모든 선생님이 모여 함께 결정하는 운영위’와 비슷합니다.
        </p>
        <p>
          블록체인은 바로 이 <strong>탈중앙화된 운영 방식</strong>을 가능하게 해주는 핵심 기술입니다.
        </p>
        <p className="text-yellow-600">
          ✅ 탈중앙화는 신뢰와 투명성을 기반으로 하는 새로운 시스템입니다.
        </p>
      </div>
    </div>
  );
}
