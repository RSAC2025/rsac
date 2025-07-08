'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CryptoStep4_5() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white px-4 py-6 space-y-4">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Step4-5. 디파이(DeFi) 기초</h1>
      </div>

      {/* 🧩 설명 카드 */}
      <div className="bg-blue-50 rounded-xl p-4 shadow space-y-3">
        <h2 className="font-semibold text-lg text-blue-700">디파이란?</h2>
        <p className="text-gray-700 leading-relaxed">
          디파이(DeFi, Decentralized Finance)는 은행과 같은 중개기관 없이 누구나 자유롭게 이용할 수 있는
          탈중앙화 금융 시스템을 의미합니다.
          <br />블록체인과 스마트컨트랙트를 기반으로 운영되어 신뢰성과 투명성을 확보합니다.
        </p>
      </div>

      {/* 💰 주요 서비스 */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow space-y-3">
        <h2 className="font-semibold text-base text-blue-600">💰 디파이의 대표적인 서비스</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>스테이킹(Staking)</li>
          <li>이자농사(Yield Farming)</li>
          <li>탈중앙화 거래소(DEX)</li>
          <li>대출 및 예치 서비스(Lending)</li>
        </ul>
      </div>

      {/* 📈 장점 */}
      <div className="bg-green-50 rounded-xl p-4 shadow space-y-2">
        <h2 className="font-semibold text-base text-green-700">📈 디파이의 장점</h2>
        <ul className="list-disc list-inside text-gray-800">
          <li>중개자 없는 자유로운 금융 거래</li>
          <li>24시간 언제든 사용 가능</li>
          <li>개방성 및 투명성</li>
        </ul>
      </div>

      {/* ⚠️ 주의사항 */}
      <div className="bg-red-50 rounded-xl p-4 shadow space-y-2">
        <h2 className="font-semibold text-base text-red-700">⚠️ 주의할 점</h2>
        <ul className="list-disc list-inside text-gray-800">
          <li>스마트컨트랙트 해킹 위험 존재</li>
          <li>높은 수익률만 보고 진입 시 손실 가능성</li>
          <li>신뢰할 수 있는 플랫폼 선택 필요</li>
        </ul>
        <p className="text-sm text-red-500">※ 꼭 사전 조사를 충분히 하세요!</p>
      </div>
    </div>
  );
}
