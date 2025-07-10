// src/components/PassPurchaseModal.tsx

"use client";

import { useEffect } from "react";

interface PassPurchaseModalProps {
  selected: {
    name: string;
    period: string;
    price: number;
    image: string;
  };
  usdtBalance: number;
  onClose: () => void;
}

export default function PassPurchaseModal({ selected, usdtBalance, onClose }: PassPurchaseModalProps) {
  const insufficient = usdtBalance < selected.price;

  // ESC로 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="w-full max-w-[500px] bg-white rounded-t-3xl p-5">
        <div className="text-center mb-2 text-lg font-bold">결제하기</div>
        <div className="text-sm text-gray-600 mb-1">주문정보</div>

        {/* 선택한 강좌 */}
        <div className="flex items-center space-x-3 p-3 border rounded-xl my-2">
          <img src={selected.image} className="w-12 h-12 rounded-lg" alt={selected.name} />
          <div>
            <p className="font-semibold">{selected.name}</p>
            <p className="text-xs text-gray-500">{selected.period}</p>
          </div>
        </div>

        {/* 금액 */}
        <div className="flex justify-between text-sm mt-3">
          <span className="text-gray-700 font-medium">결제 금액</span>
          <span className="font-bold">{selected.price.toLocaleString()} USDT</span>
        </div>

        {/* 잔액 */}
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-500">사용 가능한 USDT</span>
          <span className="text-gray-600">{usdtBalance} USDT</span>
        </div>

        {/* 부족 안내 */}
        {insufficient && (
          <p className="text-xs text-red-500 mt-1">
            (USDT가 부족합니다. 금액 충전 후 결제를 진행해주세요.)
          </p>
        )}

        {/* 버튼 */}
        <button
          disabled={insufficient}
          className={`mt-4 w-full py-2 rounded-md text-white font-semibold text-sm ${
            insufficient ? "bg-blue-100 text-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          결제하기
        </button>

        {/* 닫기 영역 */}
        <div
          onClick={onClose}
          className="mt-3 text-center text-sm text-gray-400 cursor-pointer"
        >
          닫기
        </div>
      </div>
    </div>
  );
}
