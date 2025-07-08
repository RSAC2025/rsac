'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import TopBar from '@/components/TopBar'; // ✅ TopBar 불러오기

export default function LearnPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-24">
      {/* ✅ 통일된 상단바 */}
      {/* 학습 콘텐츠 */}
      <div className="px-4 mt-6 space-y-6">
        {/* 🔹 크립토 기초 */}
        <div>
          <h2 className="font-semibold mb-2">크립토 기초</h2>
          <div className="space-y-2">
            <div
              onClick={() => router.push('/learn/crypto/step1')}
              className="bg-white rounded-xl p-4 flex justify-between items-center shadow cursor-pointer"
            >
              <span>Step1 크립토의 기본 개념</span>
              <span>{'>'}</span>
            </div>
            <div
              onClick={() => router.push('/learn/crypto/step2')}
              className="bg-white rounded-xl p-4 flex justify-between items-center shadow cursor-pointer"
            >
              <span>Step2 블록체인 기술 이해</span>
              <span>{'>'}</span>
            </div>
            <div
              onClick={() => router.push('/learn/crypto/step3')}
              className="bg-white rounded-xl p-4 flex justify-between items-center shadow cursor-pointer"
            >
              <span>Step3 크립토 자산 종류</span>
              <span>{'>'}</span>
            </div>
            <div
              onClick={() => router.push('/learn/crypto/step4')}
              className="bg-white rounded-xl p-4 flex justify-between items-center shadow cursor-pointer"
            >
              <span>Step4 크립토 사용 방법</span>
              <span>{'>'}</span>
            </div>
          </div>
        </div>

        {/* 🔸 선물거래 */}
        <div>
          <h2 className="font-semibold mb-2">선물거래</h2>
          <div className="space-y-2">
            <div
              onClick={() => router.push('/learn/futures/step1')}
              className="bg-white rounded-xl p-4 flex justify-between items-center shadow cursor-pointer"
            >
              <span>Step1 선물거래 기본개념</span>
              <span>{'>'}</span>
            </div>
            <div
              onClick={() => router.push('/learn/futures/step2')}
              className="bg-white rounded-xl p-4 flex justify-between items-center shadow cursor-pointer"
            >
              <span>Step2 기술적분석 기초</span>
              <span>{'>'}</span>
            </div>
            <div
              onClick={() => router.push('/learn/futures/step3')}
              className="bg-white rounded-xl p-4 flex justify-between items-center shadow cursor-pointer"
            >
              <span>Step3 보조지표 이해</span>
              <span>{'>'}</span>
            </div>
            <div
              onClick={() => router.push('/learn/futures/step4')}
              className="bg-white rounded-xl p-4 flex justify-between items-center shadow cursor-pointer"
            >
              <span>Step4 거래소 사용법</span>
              <span>{'>'}</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
