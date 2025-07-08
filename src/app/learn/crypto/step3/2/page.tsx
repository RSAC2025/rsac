'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CryptoStep3_2() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">이더리움(ETH)의 기능</h1>
      </div>

      {/* 📌 개념 설명 카드 */}
      <div className="bg-white rounded-xl border border-red-200 shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 이더리움은 무엇인가요?</p>
        <p>
          이더리움은 2015년 비탈릭 부테린이 개발한 <strong>스마트 계약 플랫폼</strong>입니다.
        </p>
        <p>
          비트코인이 ‘디지털 금’이라면, 이더리움은 <strong>디지털 앱 생태계의 기반</strong>입니다.
          개발자들은 이더리움 위에 다양한 디앱(DApp)을 만들 수 있습니다.
        </p>
      </div>

      {/* ⚙️ 예시 설명 카드 */}
      <div className="bg-white rounded-xl border border-blue-200 shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">⚙️ 이렇게 이해해보세요</p>
        <p className="font-semibold">🧠 자동 계약이 가능한 블록체인</p>
        <p>
          예를 들어 “A가 B에게 ETH를 보내면, B는 NFT를 자동 발송”하는 식의
          <strong> 조건부 거래를 코드로 처리</strong>할 수 있습니다.
        </p>
        <p>
          이더리움은 탈중앙화된 인터넷을 구축하는 기반으로,
          <strong>DeFi, NFT, 게임, DAO</strong> 등에 널리 활용됩니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 이더리움은 스마트 계약을 통해 탈중앙화 앱 시대를 여는 핵심 플랫폼입니다.
        </p>
      </div>
    </div>
  );
}
