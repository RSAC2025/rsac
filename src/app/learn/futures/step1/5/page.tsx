'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep1_5() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">디파이 기반 선물거래</h1>
      </div>

      {/* 🌐 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">🌐 디파이 선물거래란?</p>
        <p>
          <strong>디파이 기반 선물거래(DeFi Futures)</strong>는 중앙 거래소(CEX) 없이,
          <strong>지갑 연결만으로 선물거래를 할 수 있는 탈중앙화 방식</strong>입니다.
        </p>
        <p>
          대표적인 플랫폼으로는 <strong>dYdX, GMX, Level Finance</strong> 등이 있으며,  
          사용자 자산은 직접 지갑에 보관되며 <strong>비수탁(non-custodial)</strong> 구조를 가집니다.
        </p>
      </div>

      {/* 📲 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">📲 예시로 이해해보세요</p>
        <p className="font-semibold">🧾 탈중앙 거래소에서 선물거래하는 법</p>
        <ul className="list-disc list-inside text-gray-800">
          <li>메타마스크 등 지갑을 연결</li>
          <li>자산을 예치 (또는 LP 토큰 활용)</li>
          <li>롱/숏 포지션 선택 및 레버리지 조절</li>
          <li>직접 거래 체결 및 포지션 관리</li>
        </ul>
        <p>
          디파이 기반 선물거래는 <strong>KYC 없이 거래 가능</strong>하고,  
          자산 통제권을 사용자 본인이 갖는다는 장점이 있습니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 디파이 선물거래는 자유롭지만, 수수료와 슬리피지 등도 고려해야 합니다.
        </p>
      </div>
    </div>
  );
}
