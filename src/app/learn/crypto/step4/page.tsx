'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const topics = [
  { id: 1, title: "지갑이란?", href: "/learn/crypto/step4/1" },
  { id: 2, title: "입출금 방법", href: "/learn/crypto/step4/2" },
  { id: 3, title: "거래소에서 사고팔기", href: "/learn/crypto/step4/3" },
  { id: 4, title: "CEX와 DEX 차이", href: "/learn/crypto/step4/4" },
  { id: 5, title: "디파이 기초", href: "/learn/crypto/step4/5" },
];

export default function CryptoStep4Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step4. 크립토 사용 방법</h1>
      </div>

      <p className="text-sm text-gray-600 mb-4">크립토 자산을 실제로 어떻게 사용하는지 아래 항목을 클릭해 학습해보세요.</p>

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
