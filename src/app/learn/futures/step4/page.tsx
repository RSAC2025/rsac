'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const topics = [
  { id: 1, title: "거래소란?", href: "/learn/futures/step4/1" },
  { id: 2, title: "주문 방식 이해하기", href: "/learn/futures/step4/2" },
  { id: 3, title: "포지션 진입과 종료", href: "/learn/futures/step4/3" },
  { id: 4, title: "리스크 관리 설정", href: "/learn/futures/step4/4" },
  { id: 5, title: "모의투자 또는 실전 연결", href: "/learn/futures/step4/5" },
];

export default function FuturesStep4Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step4. 거래소 사용법</h1>
      </div>

      <p className="text-sm text-gray-600 mb-4">아래 항목을 클릭해 거래소 사용법을 학습해보세요.</p>

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
