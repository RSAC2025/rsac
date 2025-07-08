'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const topics = [
  { id: 1, title: 'MACD 이해하기', href: '/learn/futures/step3/1' },
  { id: 2, title: 'RSI 지표 해석', href: '/learn/futures/step3/2' },
  { id: 3, title: '볼린저 밴드 활용', href: '/learn/futures/step3/3' },
  { id: 4, title: '스토캐스틱 개념', href: '/learn/futures/step3/4' },
  { id: 5, title: '다이버전스 찾기', href: '/learn/futures/step3/5' },
];

export default function FuturesStep3Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 bg-white space-y-4">
      {/* 🔙 상단 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step3. 보조지표 이해</h1>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        보조지표는 차트 분석을 더 정밀하게 해주는 도구입니다. 아래 항목을 클릭해 학습해보세요.
      </p>

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
