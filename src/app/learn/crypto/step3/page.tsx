'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const topics = [
  { id: 1, title: "비트코인(BTC)의 특징", href: "/learn/crypto/step3/1" },
  { id: 2, title: "이더리움(ETH)의 기능", href: "/learn/crypto/step3/2" },
  { id: 3, title: "스테이블코인(USDT 등)", href: "/learn/crypto/step3/3" },
  { id: 4, title: "NFT와 디지털 자산", href: "/learn/crypto/step3/4" },
  { id: 5, title: "기타 알트코인들", href: "/learn/crypto/step3/5" },
];

export default function CryptoStep3Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step3. 크립토 자산의 종류</h1>
      </div>

      <p className="text-sm text-gray-600 mb-4">아래 항목을 클릭해 각 자산 종류를 학습해보세요.</p>

      <div className="space-y-2">
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => router.push(topic.href)}
            className="bg-gray-100 rounded-xl p-4 flex justify-between items-center shadow cursor-pointer hover:bg-gray-200 transition"
          >
            <span>{topic.title}</span>
            <span className="text-gray-500">{'>'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
