'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CryptoStep2_1() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단 뒤로가기 + 제목 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">블록체인이란?</h1>
      </div>

      {/* 📌 블록체인 정의 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-500">📌 블록체인 기술이란?</p>
        <p>
          블록체인은 <strong>정보를 블록(Block) 단위로 저장하고, 그 블록들을 연결(Chain)한 분산 원장 기술</strong>입니다.
        </p>
        <p>
          모든 거래 기록이 시간 순서대로 블록에 저장되며, 여러 컴퓨터(노드)에 동시에 공유되기 때문에 <strong>위조와 조작이 어렵고 신뢰성이 높습니다.</strong>
        </p>
      </div>

      {/* 🔍 비유로 이해하기 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-500">🔍 예시로 이해해보세요</p>
        <p className="font-semibold">📚 거래 장부의 디지털 진화</p>
        <p>
          블록체인은 마치 <strong>모두가 복사본을 가지고 있는 거래 장부</strong>와 같습니다.  
          A가 B에게 코인을 보냈다면, 이 내용은 모두의 장부에 동시에 기록됩니다.
        </p>
        <p>
          누군가 장부를 조작하려면 <strong>모든 사람의 장부를 동시에 바꿔야 하기 때문에</strong> 사실상 불가능합니다.
        </p>
        <p className="text-yellow-600">
          ✅ 블록체인은 투명하고 안전한 디지털 기록 시스템입니다.
        </p>
      </div>
    </div>
  );
}
