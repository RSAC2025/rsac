'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const topics = [
  { id: 1, title: "블록체인이란?", href: "/learn/crypto/step2/1" },
  { id: 2, title: "블록 구조와 체인 연결 방식", href: "/learn/crypto/step2/2" },
  { id: 3, title: "작업증명(POW)과 합의 알고리즘", href: "/learn/crypto/step2/3" },
  { id: 4, title: "스마트 계약(Smart Contract)", href: "/learn/crypto/step2/4" },
  { id: 5, title: "블록체인의 활용 사례", href: "/learn/crypto/step2/5" },
];

export default function CryptoStep2Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-4">
      {/* 🔙 뒤로가기 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-blue-600">Step2. 블록체인 기술 이해</h1>
      </div>

      <p className="text-sm text-gray-600 mb-4">아래 주제를 클릭해 학습을 진행해 보세요.</p>

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
