'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const topics = [
  { id: 1, title: "선물거래란?", href: "/learn/futures/step1/1" },
  { id: 2, title: "롱과 숏 포지션", href: "/learn/futures/step1/2" },
  { id: 3, title: "레버리지와 청산", href: "/learn/futures/step1/3" },
  { id: 4, title: "주요 용어 정리", href: "/learn/futures/step1/4" },
  { id: 5, title: "디파이 기반 선물거래", href: "/learn/futures/step1/5" },
];

export default function FuturesStep1Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step1. 선물거래 기본 개념</h1>
      </div>

      <p className="text-sm text-gray-600 mb-4">아래 항목을 클릭해 선물거래의 기본 개념을 학습해보세요.</p>

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
