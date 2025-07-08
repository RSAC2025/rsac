'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CryptoStep2_3() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">작업증명과 합의 알고리즘</h1>
      </div>

      {/* 📌 개념 카드 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-500">📌 블록체인은 어떻게 ‘신뢰’를 만드나요?</p>
        <p>
          블록체인은 중앙 기관 없이 작동하기 때문에, <strong>모든 참여자가 동의할 수 있는 기준</strong>이 필요합니다.  
          이를 위해 사용하는 것이 바로 <strong>합의 알고리즘(Consensus Algorithm)</strong>입니다.
        </p>
        <p>
          대표적인 방식인 <strong>작업증명(POW, Proof of Work)</strong>은 복잡한 수학 문제를 가장 먼저 푼 사람에게 블록을 추가할 권한을 부여합니다.
        </p>
      </div>

      {/* 🛠 비유 예시 카드 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-500">🛠 예시로 이해해보세요</p>
        <p className="font-semibold">🏃‍♂️ 퍼즐 경주에서 이긴 사람만 기록!</p>
        <p>
          마치 <strong>복잡한 퍼즐을 푸는 경주</strong>를 하고,  
          가장 먼저 맞힌 사람이 새로운 거래장을 작성할 수 있는 것과 같습니다.
        </p>
        <p>
          이 방식은 <strong>공정성과 보안성</strong>은 뛰어나지만,  
          많은 전기와 컴퓨팅 자원이 필요하다는 단점이 있습니다.
        </p>
        <p className="text-yellow-600">
          ✅ 작업증명은 비트코인의 핵심 기술이며, ‘블록 생성 경쟁’을 기반으로 합니다.
        </p>
      </div>
    </div>
  );
}
