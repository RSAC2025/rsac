'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Step4_3Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">거래소에서 사고팔기</h1>
      </div>

      {/* 📌 개념 설명 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 거래소란 무엇인가요?</p>
        <p>
          거래소는 <strong>암호화폐를 사고팔 수 있는 플랫폼</strong>으로, 일반적인 주식 거래소처럼 주문을 등록하고 체결합니다.
        </p>
        <p>
          국내 거래소(업비트, 빗썸 등)와 해외 거래소(바이낸스, OKX 등)가 있으며, <strong>계정 등록 → 입금 → 매수/매도</strong> 순으로 이용합니다.
        </p>
      </div>

      {/* 💱 예시 설명 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">💱 이렇게 이해해보세요</p>
        <p className="font-semibold">📉 주식처럼 코인을 사고파는 거래소</p>
        <p>
          예를 들어 업비트에서 비트코인을 사려면:
          <ul className="list-disc list-inside pl-2">
            <li>원화를 입금</li>
            <li>BTC/₩ 마켓에서 원하는 수량과 가격으로 주문</li>
            <li>시장가/지정가 선택 후 체결</li>
          </ul>
        </p>
        <p>
          해외 거래소는 <strong>USDT 마켓</strong> 중심이며, 입출금 주소와 네트워크를 직접 입력해야 합니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 거래소는 암호화폐의 시작점이자 유동성 중심입니다.
        </p>
      </div>
    </div>
  );
}
