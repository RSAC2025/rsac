'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep4_5() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-6">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">모의투자 또는 실전 연결</h1>
      </div>

      {/* 📘 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm space-y-2 leading-relaxed">
        <p className="font-semibold text-red-600">📌 실전에 앞서 준비되셨나요?</p>
        <p>
          선물거래는 고위험 고수익 구조로, 실전 참여 전에는 반드시 <strong>모의투자</strong>를 통해 전략을 검증하는 것이 중요합니다.
        </p>
        <p>
          많은 거래소에서는 실전과 동일한 환경의 데모 계정을 제공하며, 이를 통해 실수를 줄이고 심리적 대응을 연습할 수 있습니다.
        </p>
      </div>

      {/* 🔍 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm space-y-2 leading-relaxed">
        <p className="font-semibold text-blue-600">🔍 실전 연결 예시</p>
        <ul className="list-disc pl-5">
          <li>📌 모의투자 플랫폼: Bybit Testnet, Binance Futures Testnet</li>
          <li>📌 실제 거래 플랫폼: 업비트, 바이낸스, Bitget, Phemex</li>
          <li>📌 전략 테스트 후, 실전 소액부터 시작 권장</li>
        </ul>
      </div>

      {/* ✅ 정리 카드 */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-sm">
        <p className="font-semibold">✅ 요약</p>
        <p>
          실전 진입 전 반드시 모의투자를 거쳐 경험을 쌓으세요. 준비된 사람만이 리스크를 관리하며 수익을 지킬 수 있습니다.
        </p>
      </div>
    </div>
  );
}
