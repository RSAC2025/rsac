// src/app/admin/page.tsx

"use client";

import AdminAuth from "@/components/AdminAuth";
import ManualRewardPanel from "@/components/admin/ManualRewardPanel"; // ✅ 신규 컴포넌트

export default function AdminDashboard() {
  return (
    <AdminAuth>
      <div className="space-y-8">
        {/* 상단 관리자 요약 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">📊 관리자 대시보드</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>총 유저 수</li>
            <li>누적 리워드 지급액</li>
            <li>대기 중인 출금 요청 수</li>
          </ul>
        </div>

        {/* ✅ 수동 송금 패널 */}
        <ManualRewardPanel />
      </div>
    </AdminAuth>
  );
}

