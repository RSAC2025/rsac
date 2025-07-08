'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CryptoStep3_5() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">기타 알트코인들</h1>
      </div>

      {/* 📌 개념 카드 */}
      <div className="bg-white rounded-xl border border-red-200 shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">📌 알트코인이란?</p>
        <p>
          알트코인은 <strong>비트코인과 이더리움을 제외한 모든 암호화폐</strong>를 통칭합니다.
        </p>
        <p>
          각각의 알트코인은 고유한 기능과 목적을 가지고 있으며, 특정 프로젝트나 생태계에서 사용됩니다.
        </p>
      </div>

      {/* 🪙 예시 카드 */}
      <div className="bg-white rounded-xl border border-blue-200 shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">🪙 예시로 이해해보세요</p>
        <p className="font-semibold">📊 다양한 기능의 암호화폐들</p>
        <p>
          예를 들어:
          <ul className="list-disc list-inside ml-3">
            <li><strong>BNB:</strong> 바이낸스 거래소 생태계에서 사용</li>
            <li><strong>SOL:</strong> 빠른 속도의 스마트 계약 플랫폼</li>
            <li><strong>MATIC:</strong> 이더리움의 확장성 해결</li>
            <li><strong>LINK:</strong> 외부 데이터와 스마트 계약 연결</li>
          </ul>
        </p>
        <p>
          알트코인은 각자의 생태계와 기술적 역할에 따라 <strong>투자, 결제, 기술 실현</strong> 등 다양한 목적으로 사용됩니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 알트코인은 다양한 산업과 기술에 특화된 암호화폐입니다.
        </p>
      </div>
    </div>
  );
}
