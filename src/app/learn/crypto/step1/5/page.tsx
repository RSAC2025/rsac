'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CryptoTopic5() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단 뒤로가기 + 제목 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">특징과 장점</h1>
      </div>

      {/* ✅ 특징 설명 카드 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-500">📌 암호화폐의 특징은 무엇인가요?</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>탈중앙화</strong>: 중앙 기관 없이 운영됩니다.</li>
          <li><strong>투명성</strong>: 모든 거래가 블록체인에 기록되어 누구나 확인할 수 있습니다.</li>
          <li><strong>보안성</strong>: 해킹이 매우 어렵고 안전합니다.</li>
          <li><strong>글로벌 사용성</strong>: 전 세계 어디서든 거래가 가능합니다.</li>
        </ul>
      </div>

      {/* ✅ 장점 예시 카드 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-500">🌍 암호화폐는 이런 점이 좋아요</p>
        <p>
          💸 <strong>중간 수수료 없이 빠른 송금</strong>이 가능합니다. 은행을 거치지 않아도 몇 분이면 전송 완료!
        </p>
        <p>
          🔐 <strong>개인 키를 이용한 보안성</strong>으로 본인만 자산에 접근할 수 있어 안전합니다.
        </p>
        <p>
          🌐 <strong>인터넷만 있다면 누구나 사용 가능</strong>한 글로벌 통화입니다.
        </p>
        <p className="text-yellow-600">
          ✅ 암호화폐는 미래의 금융 시스템을 바꾸고 있는 새로운 패러다임입니다.
        </p>
      </div>
    </div>
  );
}
