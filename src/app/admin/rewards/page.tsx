// src/app/admin/rewards/page.tsx
"use client";

import { useState } from "react";

export default function RewardAdminPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch("/api/rewards/calculate-commission", { method: "POST" });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div>
      <h1>수수료 리워드 계산</h1>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "계산 중..." : "리워드 계산 실행"}
      </button>
      {result && (
        <pre className="text-sm mt-4 bg-gray-100 p-2 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
