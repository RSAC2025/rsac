// components/ChartSuccessModal.tsx
"use client";

import { X } from "lucide-react";

export default function ChartSuccessModal({ uid, onClose }: { uid: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-[#e6eef4] w-[300px] rounded-xl p-6 relative text-center">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="text-blue-500 text-4xl mb-3">✔️</div>
        <div className="font-bold mb-1">차트 신청 성공</div>
        <div className="text-sm text-blue-600">{uid}</div>
        <div className="text-sm mt-1">UID 제출이 완료되었습니다</div>
      </div>
    </div>
  );
}
