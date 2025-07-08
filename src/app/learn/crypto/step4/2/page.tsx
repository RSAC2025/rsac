'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Step4_2Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">입출금 방법</h1>
      </div>

      {/* 📌 개념 설명 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 암호화폐 입출금이란?</p>
        <p>
          암호화폐 입출금은 <strong>지갑 주소를 이용해 블록체인상에서 자산을 전송하거나 받는 행위</strong>입니다.
        </p>
        <p>
          주소를 정확히 입력해야 하며, 네트워크(예: Ethereum, Polygon, BNB Chain 등)도 반드시 맞아야 합니다.
        </p>
      </div>

      {/* 💸 예시 설명 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">💸 이렇게 이해해보세요</p>
        <p className="font-semibold">🏦 은행 계좌 이체와 비슷하지만 주소와 네트워크를 직접 입력</p>
        <p>
          예를 들어, 메타마스크 지갑의 Polygon 주소로 USDT를 보내려면:
          <ul className="list-disc list-inside pl-2">
            <li>받는 주소를 정확히 입력</li>
            <li>전송하는 코인의 네트워크를 Polygon으로 선택</li>
            <li>가스비(MATIC)가 충분한지 확인</li>
          </ul>
        </p>
        <p>
          반대로 입금도 상대가 내 지갑 주소와 네트워크를 정확히 입력해야 성공합니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 입출금은 주소 + 네트워크 + 가스비 확인이 필수입니다.
        </p>
      </div>
    </div>
  );
}
