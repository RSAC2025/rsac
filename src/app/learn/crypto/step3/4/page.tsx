'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CryptoStep3_4() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">NFT와 디지털 자산</h1>
      </div>

      {/* 📌 개념 설명 카드 */}
      <div className="bg-white rounded-xl border border-red-200 shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 NFT란 무엇인가요?</p>
        <p>
          NFT는 <strong>Non-Fungible Token(대체 불가능 토큰)</strong>의 약자로, 고유한 디지털 자산을 블록체인 위에 기록한 것입니다.
        </p>
        <p>
          예를 들어 그림, 음악, 영상, 게임 아이템 등을 <strong>소유권이 있는 유일한 토큰</strong>으로 발행할 수 있습니다.
        </p>
      </div>

      {/* 🖼 예시 설명 카드 */}
      <div className="bg-white rounded-xl border border-blue-200 shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">🖼 이렇게 이해해보세요</p>
        <p className="font-semibold">🎨 디지털 세상의 소유증명서</p>
        <p>
          일반 이미지는 복사할 수 있지만, NFT는 <strong>해당 이미지의 ‘진짜 소유자’를 증명</strong>할 수 있게 해줍니다.
        </p>
        <p>
          NFT는 예술, 수집품, 메타버스, 게임 등 다양한 분야에서 <strong>디지털 자산화</strong>에 활용되고 있습니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ NFT는 디지털 콘텐츠의 ‘희소성과 소유권’을 증명하는 수단입니다.
        </p>
      </div>
    </div>
  );
}
