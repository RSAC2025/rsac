'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep1_4() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">주요 용어 정리</h1>
      </div>

      {/* 📘 용어 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-3">
        <p className="font-semibold text-blue-600">📘 선물거래에서 자주 쓰이는 용어들</p>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>롱(Long)</strong>: 가격 상승에 베팅하는 포지션
          </li>
          <li>
            <strong>숏(Short)</strong>: 가격 하락에 베팅하는 포지션
          </li>
          <li>
            <strong>레버리지(Leverage)</strong>: 자본보다 큰 금액을 거래할 수 있게 해주는 기능
          </li>
          <li>
            <strong>마진(Margin)</strong>: 거래에 필요한 보증금. 유지 마진 미만일 경우 청산 발생
          </li>
          <li>
            <strong>청산가(Liquidation Price)</strong>: 자산이 강제 종료되는 가격
          </li>
          <li>
            <strong>PNL</strong>: 수익률 (Profit and Loss). 실현/미실현 손익을 의미
          </li>
          <li>
            <strong>Funding Fee</strong>: 롱과 숏 포지션 간 수수료 정산. 일정 시간마다 발생
          </li>
        </ul>
      </div>

      {/* ✅ 요약 */}
      <div className="bg-green-50 border border-green-200 rounded-xl shadow p-4 text-sm">
        <p className="text-green-800 font-medium">
          ✅ 기본 용어를 정확히 이해하면 선물거래가 훨씬 쉽게 느껴집니다.
        </p>
      </div>
    </div>
  );
}
