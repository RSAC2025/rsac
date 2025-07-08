'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function Step4_4Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">CEX와 DEX의 차이</h1>
      </div>

      {/* 🏛 개념 설명 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">🏛 중앙화 vs 탈중앙화 거래소</p>
        <p>
          <strong>CEX(Centralized Exchange)</strong>는 회사(중앙 주체)가 운영하는 거래소로, 로그인과 KYC 인증을 통해 사용합니다. (예: 업비트, 바이낸스)
        </p>
        <p>
          <strong>DEX(Decentralized Exchange)</strong>는 사용자가 지갑만 연결해 <strong>자산을 직접 관리하며</strong> 거래할 수 있는 탈중앙 플랫폼입니다. (예: Uniswap, PancakeSwap)
        </p>
      </div>

      {/* ⚖️ 예시 설명 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">⚖️ 이렇게 이해해보세요</p>
        <p className="font-semibold">🧾 은행을 통한 거래 vs 직접 현금 주고받기</p>
        <p>
          CEX는 은행처럼 계정 내에서 거래를 대신 처리해주지만, 사용자는 자산을 맡겨야 하며 해킹 등의 위험도 존재합니다.
        </p>
        <p>
          반면 DEX는 은행 없이 직접 상대방과 자산을 교환하는 방식으로, <strong>지갑에서 직접 체결되고 중개인이 없습니다.</strong>
        </p>
        <p className="text-green-700 font-medium">
          ✅ CEX는 쉽고 빠르며, DEX는 자율성과 보안성이 높습니다.
        </p>
      </div>
    </div>
  );
}
