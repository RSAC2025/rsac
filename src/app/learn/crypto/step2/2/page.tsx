'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CryptoStep2_2() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단 타이틀 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">블록 구조와 체인 연결</h1>
      </div>

      {/* 📌 블록 구조 설명 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-500">📌 블록은 어떤 구조인가요?</p>
        <p>
          블록은 다음과 같은 요소로 구성됩니다:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>트랜잭션 데이터</strong> – 누가 누구에게 무엇을 보냈는지</li>
          <li><strong>이전 블록의 해시</strong> – 바로 앞 블록과의 연결 고리</li>
          <li><strong>현재 블록의 해시</strong> – 블록 전체를 암호화한 고유값</li>
        </ul>
        <p>
          이 구조 덕분에 블록은 <strong>서로 연결된 안전한 기록체계</strong>를 형성합니다.
        </p>
      </div>

      {/* 🔗 체인 연결 방식 비유 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-500">🔗 예시로 이해해보세요</p>
        <p className="font-semibold">🧾 계약서에 도장을 찍듯이</p>
        <p>
          각 블록은 이전 블록의 해시값을 포함하므로, 하나만 바꿔도 **다음 블록까지 모두 변경**되어야 합니다.
        </p>
        <p>
          마치 도장이 찍힌 계약서를 조작하면 <strong>다음 장, 다다음 장까지 모두 위조해야 하는 것</strong>과 같죠.
        </p>
        <p className="text-yellow-600">
          ✅ 블록들이 서로 연결되어 있어, 변경이 거의 불가능한 구조를 만듭니다.
        </p>
      </div>
    </div>
  );
}
