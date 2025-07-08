'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CryptoStep2_5() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">블록체인의 활용 사례</h1>
      </div>

      {/* 📌 개요 카드 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-green-600">📌 블록체인의 실제 활용</p>
        <p>
          블록체인은 단순히 비트코인만을 위한 기술이 아닙니다.  
          <strong>투명성, 보안성, 자동화</strong>가 필요한 다양한 분야에서 활용됩니다.
        </p>
      </div>

      {/* ✅ 활용 사례들 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm space-y-4">
        <div>
          <p className="font-semibold">💰 금융</p>
          <p>해외 송금, 무역금융, 결제 시스템 등에 블록체인이 도입되고 있습니다.</p>
        </div>
        <div>
          <p className="font-semibold">🎨 NFT & 콘텐츠</p>
          <p>디지털 그림, 음악, 게임 아이템 등을 <strong>고유 자산</strong>으로 만들어 거래할 수 있습니다.</p>
        </div>
        <div>
          <p className="font-semibold">📦 유통 / 공급망</p>
          <p>상품 이동 경로를 기록해 <strong>위조 방지</strong>와 <strong>신뢰 확보</strong>에 활용됩니다.</p>
        </div>
        <div>
          <p className="font-semibold">🏥 의료</p>
          <p>의료 기록을 안전하게 저장하고 필요한 경우에만 열람할 수 있도록 합니다.</p>
        </div>
        <div>
          <p className="font-semibold">🗳️ 전자 투표</p>
          <p>선거의 <strong>투명성과 조작 방지</strong>를 위해 블록체인 기반 투표 시스템이 실험되고 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
