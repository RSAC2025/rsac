'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const topics = [
  { id: 1, title: "암호화폐란?", href: "/learn/crypto/step1/1" },
  { id: 2, title: "법정화폐와의 차이점", href: "/learn/crypto/step1/2" },
  { id: 3, title: "비트코인의 탄생 배경", href: "/learn/crypto/step1/3" },
  { id: 4, title: "탈중앙화란?", href: "/learn/crypto/step1/4" },
  { id: 5, title: "특징과 장점", href: "/learn/crypto/step1/5" },
];

export default function CryptoStep1Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-20 px-4">
      {/* ✅ 상단 뒤로가기 + 제목 */}
      <div className="flex items-center gap-2 py-4">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-blue-600">Step1. 크립토의 기본 개념</h1>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        아래 주제를 클릭해 학습을 진행해 보세요.
      </p>

      {/* ✅ 학습 항목 카드 */}
      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => router.push(topic.href)}
            className="flex items-center justify-between bg-white rounded-xl p-5 shadow hover:bg-blue-50 cursor-pointer transition"
          >
            <div className="text-base font-medium text-gray-800">
              {topic.title}
            </div>
            <ChevronRight size={20} className="text-blue-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
