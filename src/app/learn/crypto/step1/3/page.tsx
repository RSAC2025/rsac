'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CryptoTopic3() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 뒤로가기 + 제목 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">비트코인의 탄생 배경</h1>
      </div>

      {/* ✅ 비트코인 개요 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-500">📌 왜 비트코인이 만들어졌을까요?</p>
        <p>
          2008년 세계 금융위기 이후, 정부와 은행 시스템에 대한 불신이 커졌습니다.
        </p>
        <p>
          이런 상황에서 <strong>사토시 나카모토</strong>라는 인물이 제안한 것이 바로
          정부의 개입 없이 누구나 신뢰할 수 있는 ‘디지털 화폐’, 비트코인이었습니다.
        </p>
      </div>

      {/* ✅ 역사적 맥락 설명 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-500">📚 어떤 시대적 배경이 있었을까요?</p>
 <p>
  2008년 당시, 대형 투자은행이 무너지고, 사람들은 &quot;은행이 돈을 망친다&quot;고 느꼈습니다.
</p>

        <p>
          사토시는 이 문제를 해결하기 위해 은행 없이 개인 간 거래가 가능한 블록체인 기반
          화폐를 설계했고, <span className="font-bold text-blue-600">2009년 1월, 비트코인의 첫 블록</span>을 채굴했습니다.
        </p>
        <p className="text-yellow-600">
          ✅ 비트코인은 ‘중앙이 필요 없는 화폐’를 꿈꾸며 시작된 프로젝트였습니다.
        </p>
      </div>
    </div>
  );
}
