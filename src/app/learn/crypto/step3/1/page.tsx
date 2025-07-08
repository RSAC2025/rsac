'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CryptoStep3_1() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">비트코인(BTC)의 특징</h1>
      </div>

      {/* 📌 개념 설명 카드 */}
      <div className="bg-white rounded-xl border border-red-200 shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 비트코인이란 무엇인가요?</p>
<p>
  비트코인은 2009년 &lsquo;사토시 나카모토&rsquo;가 만든 최초의 암호화폐로, 중앙 기관 없이 <strong>블록체인 기술을 기반으로 작동</strong>합니다.
</p>

        <p>
          총 발행량은 <strong>2,100만 개</strong>로 제한되어 있어 희소성이 높고, 디지털 금으로 불립니다.
        </p>
      </div>

      {/* 🪙 예시 설명 카드 */}
      <div className="bg-white rounded-xl border border-blue-200 shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">🪙 이렇게 이해해보세요</p>
        <p className="font-semibold">🏅 희소성을 가진 디지털 금</p>
        <p>
          금처럼 <strong>누구나 채굴할 수 있지만 한정된 수량만 존재</strong>합니다.  
          이는 비트코인이 시간이 지날수록 가치 저장 수단으로 여겨지는 이유입니다.
        </p>
        <p>
          또한, 은행이나 국가 없이도 <strong>인터넷만 있으면 전 세계 누구와도 직접 거래가 가능</strong>합니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 비트코인은 탈중앙화, 희소성, 투명성을 모두 갖춘 디지털 자산입니다.
        </p>
      </div>
    </div>
  );
}
