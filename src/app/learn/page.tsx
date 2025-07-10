'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import TopBar from '@/components/TopBar';
import { ChevronRight, Megaphone } from 'lucide-react';

type StepItemProps = {
  step: number;
  title: string;
  href: string;
};

const StepItem = ({ step, title, href }: StepItemProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="flex justify-between items-center bg-[#e5eaee] rounded-xl px-4 py-5 cursor-pointer"
    >
      <div className="flex items-center space-x-2">
        <span className="bg-white text-[12px] font-medium text-[#666] px-2 py-0.5 rounded-md">
          Step{step}
        </span>
        <span className="text-[15px] font-semibold text-black">{title}</span>
      </div>

      <ChevronRight size={18} className="text-[#2f80ed]" />
    </div>
  );
};


export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-24">
      <TopBar title="교육" />

      {/* ✅ PASS 수강중 안내 */}
      <div className="px-4 mt-4">
        <div className="bg-blue-100 text-blue-800 text-sm font-medium rounded-full px-4 py-2 flex items-center space-x-2">
          <Megaphone size={16} className="text-blue-600" />
          <span>
            <span className="font-bold text-blue-600">300 PASS</span>
            <span className="ml-1">를 수강중이에요! (2025.07.01~2025.07.07)</span>
          </span>
        </div>
      </div>

      {/* ✅ 학습 콘텐츠 */}
      <div className="px-4 mt-6 space-y-6">
        {/* 🔹 크립토 기초 */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">크립토 기초</h2>
          <div className="space-y-3">
            <StepItem step={1} title="크립토의 기본 개념" href="/learn/crypto/step1" />
            <StepItem step={2} title="블록체인 기술 이해" href="/learn/crypto/step2" />
            <StepItem step={3} title="크립토 자산 종류" href="/learn/crypto/step3" />
            <StepItem step={4} title="크립토 사용 방법" href="/learn/crypto/step4" />
          </div>
        </div>

        {/* 🔸 선물거래 */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">선물거래</h2>
          <div className="space-y-3">
            <StepItem step={1} title="선물거래 기본개념" href="/learn/futures/step1" />
            <StepItem step={2} title="기술적분석 기초" href="/learn/futures/step2" />
            <StepItem step={3} title="보조지표 이해" href="/learn/futures/step3" />
            <StepItem step={4} title="거래소 사용법" href="/learn/futures/step4" />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
