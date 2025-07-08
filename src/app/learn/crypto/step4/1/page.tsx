'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Step4_1Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 상단바 */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">지갑이란?</h1>
      </div>

      {/* 📌 개념 설명 카드 */}
      <div className="bg-white border border-red-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-600">🔐 크립토 지갑은 무엇인가요?</p>
        <p>
          암호화폐 지갑은 <strong>블록체인 상의 자산을 보관하고 전송·수신할 수 있게 해주는 도구</strong>입니다.
        </p>
        <p>
          보통 <strong>공개키(주소)</strong>와 <strong>개인키(비밀번호)</strong>로 구성되며, 본인이 직접 자산을 관리할 수 있습니다.
        </p>
      </div>

      {/* 💡 예시 설명 카드 */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-600">💡 이렇게 이해해보세요</p>
        <p className="font-semibold">🏦 은행 계좌 대신 내가 직접 관리하는 디지털 금고</p>
        <p>
          일반 은행 계좌는 은행이 보관하고 관리하지만, 암호화폐 지갑은 내가 <strong>직접 보관하고 이체까지</strong> 할 수 있습니다.
        </p>
        <p>
          자산을 타인에게 보내려면 <strong>개인키로 서명</strong>해서 전송하고,  
          받을 땐 <strong>공개 주소</strong>만 알리면 됩니다.
        </p>
        <p className="text-green-700 font-medium">
          ✅ 크립토 지갑은 내가 직접 관리하는 디지털 자산 금고입니다.
        </p>
      </div>
    </div>
  );
}
