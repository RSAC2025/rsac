'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const topics = [
  { id: 1, title: "기술적 분석이란?", href: "/learn/futures/step2/1" },
  { id: 2, title: "차트 보는 법", href: "/learn/futures/step2/2" },
  { id: 3, title: "캔들패턴 이해", href: "/learn/futures/step2/3" },
  { id: 4, title: "지지선과 저항선", href: "/learn/futures/step2/4" },
  { id: 5, title: "추세선과 거래량", href: "/learn/futures/step2/5" },
];

export default function FuturesStep2Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step2. 기술적 분석 기초</h1>
      </div>

      <p className="text-sm text-gray-600 mb-4">아래 항목을 클릭해 기술적 분석의 기초를 학습해보세요.</p>

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