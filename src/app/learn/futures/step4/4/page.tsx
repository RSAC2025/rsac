'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FuturesStep4_4() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-6">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">리스크 관리 설정</h1>
      </div>

      {/* 📘 개념 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 리스크 관리란?</p>
        <p>
          선물거래에서는 수익보다 손실 방지가 더 중요합니다. 리스크 관리는 자산 손실을 최소화하기 위한 전략으로, <strong>손절, 익절, 자산 배분</strong> 등이 핵심입니다.
        </p>
      </div>

      {/* 🔍 예시 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">🔍 예시로 이해해보세요</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>손절가 설정:</strong> 손실이 커지기 전 자동으로 포지션 종료</li>
          <li><strong>익절가 설정:</strong> 목표 수익 도달 시 자동 청산</li>
          <li><strong>1회 진입 비중 제한:</strong> 총 자산의 5~10%로 포지션 진입 제한</li>
        </ul>
        <p>
          예: 100만원 자산 보유 중 1회 매매에 10만원만 사용하고,<br/>
          손절 -5%, 익절 +10%로 설정하는 방식입니다.
        </p>
      </div>

      {/* ✅ 정리 카드 */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-sm">
        <p className="font-semibold">✅ 요약</p>
        <p>
          리스크 관리는 꾸준한 수익보다 <strong>큰 손실을 피하는 것</strong>에 집중하는 전략입니다. 진입보다 <strong>청산 기준</strong>이 더욱 중요합니다.
        </p>
      </div>
    </div>
  );
}