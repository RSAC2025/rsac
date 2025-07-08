'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CryptoTopic1() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-4 pb-24 space-y-4">
      {/* 🔙 뒤로가기 + 제목 */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">암호화폐란?</h1>
      </div>

      {/* ✅ 정의 카드 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-red-500">📌 암호화폐는 무엇인가요?</p>
        <p>
          암호화폐란 ‘블록체인 기술을 기반으로 중앙기관 없이 발행되고 유통되는 디지털 화폐’를 의미합니다.
        </p>
        <p>
          대표적인 예로 비트코인(BTC), 이더리움(ETH), USDT 등이 있으며,  
          누구나 전 세계 어디서든 인터넷만 있으면 거래할 수 있습니다.
        </p>
      </div>

      {/* ✅ 예시 카드 */}
      <div className="bg-white rounded-xl shadow p-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-blue-500">🎯 이렇게 이해해보세요</p>
        <p className="font-semibold">💡 은행 없는 인터넷 돈 이야기</p>
        <p>
          전통적인 돈은 은행이 보관하고 이체해주는 역할을 하죠.<br />
          하지만 암호화폐는 은행 없이도 직접 거래할 수 있도록 만들어졌습니다.
        </p>
        <p>
          예를 들어, 철수가 미국에 있는 친구 존에게 송금하려면 은행을 거쳐야 하고 수수료도 꽤 들죠.
          반면에, 비트코인을 사용하면 은행 없이도 몇 분 만에 바로 보낼 수 있습니다.
        </p>
        <p className="text-yellow-600">✅ 암호화폐는 디지털 세상의 ‘현금’ 같은 존재입니다.</p>
      </div>
    </div>
  );
}
