'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep4_1() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-6">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">거래소란?</h1>
      </div>

      {/* 📘 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 거래소란 무엇인가요?</p>
        <p>
          거래소는 디지털 자산을 사고팔 수 있도록 중개해주는 플랫폼입니다. 사용자는 여기서 암호화폐를 매매하거나 현물, 선물 거래 등을 진행할 수 있습니다.
        </p>
        <p>
          거래소는 크게 <strong>중앙화 거래소(CEX)</strong>와 <strong>탈중앙화 거래소(DEX)</strong>로 나뉘며, 각각 장단점이 존재합니다.
        </p>
      </div>

      {/* 🔍 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">🔍 쉽게 이해해보세요</p>
        <p>🧭 중앙화 거래소 예시: 업비트, 바이낸스 등</p>
        <ul className="list-disc pl-5">
          <li>간편한 인터페이스와 빠른 거래 속도</li>
          <li>중앙 기관이 자산을 보관함 → 해킹 리스크</li>
        </ul>
        <p>🧭 탈중앙화 거래소 예시: Uniswap, PancakeSwap 등</p>
        <ul className="list-disc pl-5">
          <li>개인 지갑을 직접 연결해 거래</li>
          <li>자산 보관은 사용자 책임, 익명성 우수</li>
        </ul>
      </div>

      {/* ✅ 정리 카드 */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-sm">
        <p className="font-semibold">✅ 요약</p>
        <p>
          중앙화 거래소는 사용자 친화적이며 초보자에게 적합하고, DEX는 자유도와 보안성이 높지만 사용이 다소 복잡할 수 있습니다.
        </p>
      </div>
    </div>
  );
}