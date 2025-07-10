"use client";

import { useActiveAccount } from "thirdweb/react";
import { Copy } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DepositPage() {
  const account = useActiveAccount();
  const router = useRouter();
  const address = account?.address || "0x0000000000000000000000000000000000000000";

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="min-h-screen bg-[#eaf0f4] pb-20">
      {/* 상단바 */}
      <div className="bg-white px-4 py-3 flex items-center shadow">
        <button onClick={() => router.back()} className="text-gray-600 text-sm mr-2">{`←`}</button>
        <h1 className="text-md font-semibold text-gray-800">입금하기</h1>
      </div>

      {/* 자산 정보 */}
      <div className="px-4 mt-5 space-y-4">
        <section className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="/tether-icon.png" alt="USDT" className="w-6 h-6" />
              <span className="font-semibold text-gray-700">Tether</span>
            </div>
            <span className="text-gray-800 font-semibold text-sm">0 USDT</span>
          </div>
        </section>

        {/* 지갑주소 */}
        <section className="bg-[#f1f5fa] rounded-xl shadow p-4 text-center space-y-2">
          <p className="text-sm font-mono text-gray-700 break-all">{address}</p>
          <hr className="my-1" />
          <p className="text-xs text-gray-500 leading-5">
            </p>해당 주소는 <b>POLYGON 네트워크</b>를 지원합니다.<p>
            <br />
            그 외의 네트워크로는 자산 입금이 불가능합니다.
          </p>
          <button
            onClick={handleCopy}
            className="w-full mt-2 bg-blue-100 text-blue-700 text-sm font-semibold py-2 rounded-md hover:bg-blue-200"
          >
            {copied ? "✅ 복사 완료!" : "주소 복사하기"}
          </button>
        </section>
      </div>
    </main>
  );
}
