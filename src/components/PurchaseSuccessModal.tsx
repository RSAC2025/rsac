"use client";

interface PurchaseSuccessModalProps {
  amount: number;
  onClose: () => void;
}

export default function PurchaseSuccessModal({ amount, onClose }: PurchaseSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-[#f5f9fc] w-80 rounded-2xl px-6 py-10 text-center shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-800">수강신청 성공</h2>
        <p className="mt-1 text-sm text-blue-600 font-bold">{amount} USDT</p>
        <p className="text-sm text-gray-600 mt-1">결제가 완료되었습니다</p>
      </div>
    </div>
  );
}
