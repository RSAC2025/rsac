"use client";

import { useState } from "react";

export default function ManualRewardPanel() {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);

  const [stepLoading, setStepLoading] = useState<string | null>(null);
  const [stepResult, setStepResult] = useState("");

  const handleSend = async () => {
    if (!date) {
      alert("날짜를 선택해주세요.");
      return;
    }

    setLoading(true);
    setResult("");
    setIsError(false);

    try {
      const res = await fetch(`/api/manual-send-rewards?date=${date}`);
      const json = await res.json();

      if (!res.ok) {
        setIsError(true);
        setResult(json.error || "❌ 송금 중 오류 발생");
      } else {
        setIsError(false);
        setResult(json.message || "✅ 송금 완료");
      }
    } catch (e) {
      console.error("❌ 에러:", e);
      setIsError(true);
      setResult("❌ 송금 중 예외 발생");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 단계별 테스트용 POST 호출
  const handleStep = async (label: string, endpoint: string) => {
    setStepLoading(label);
    setStepResult("");

    try {
      const res = await fetch(`/api/rewards/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();

      setStepResult(`${label} 완료: ${JSON.stringify(json)}`);
    } catch (e) {
      console.error(e);
      setStepResult(`${label} 실패`);
    } finally {
      setStepLoading(null);
    }
  };

  return (
    <div className="bg-white p-5 border rounded shadow space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-800">📅 지정 날짜 리워드 수동 송금</h3>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-1 rounded w-full max-w-xs"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "송금 중..." : "리워드 송금 실행"}
        </button>
        {result && (
          <p className={`text-sm mt-2 ${isError ? "text-red-600" : "text-green-600"}`}>
            {result}
          </p>
        )}
      </div>

      {/* ✅ 단계별 리워드 버튼들 */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-800">🧪 리워드 처리 단계별 테스트</h3>

        <button
          onClick={() => handleStep("1️⃣ 수수료 리워드 계산", "calculate-commission")}
          disabled={!!stepLoading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          {stepLoading === "1️⃣ 수수료 리워드 계산" ? "계산 중..." : "1️⃣ 수수료 리워드 계산"}
        </button>

        <button
          onClick={() => handleStep("2️⃣ 센터 리워드 계산", "calculate-center")}
          disabled={!!stepLoading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {stepLoading === "2️⃣ 수강료 리워드 계산" ? "계산 중..." : "2️⃣ 센터 리워드 계산"}
        </button>

        <button
          onClick={() => handleStep("3️⃣ reward_transfers 저장", "transfer")}
          disabled={!!stepLoading}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          {stepLoading === "3️⃣ reward_transfers 저장" ? "처리 중..." : "3️⃣ reward_transfers 저장"}
        </button>

        <button
          onClick={() => handleStep("4️⃣ USDT 송금 처리", "send")}
          disabled={!!stepLoading}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {stepLoading === "4️⃣ USDT 송금 처리" ? "송금 중..." : "4️⃣ USDT 송금 처리"}
        </button>

        {stepResult && (
          <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{stepResult}</p>
        )}
      </div>
    </div>
  );
}
