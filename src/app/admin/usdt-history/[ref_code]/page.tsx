"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type UsdtHistory = {
  id: string;
  ref_code: string;
  type: "external" | "user" | "reward";
  direction: "in" | "out";
  amount: number;
  tx_hash: string;
  status: string;
  created_at: string;
};

export default function UsdtHistoryPage() {
  const { ref_code } = useParams() as { ref_code: string };
  const [history, setHistory] = useState<UsdtHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from("usdt_history")
        .select("*")
        .eq("ref_code", ref_code)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ USDT 내역 조회 실패:", error.message);
        return;
      }
      setHistory(data || []);
      setLoading(false);
    };

    fetchHistory();
  }, [ref_code]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">💸 USDT 입출금 내역 - {ref_code}</h2>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <table className="min-w-full text-sm border border-gray-300 table-auto">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="p-2 border">날짜</th>
              <th className="p-2 border">방향</th>
              <th className="p-2 border">유형</th>
              <th className="p-2 border">금액</th>
              <th className="p-2 border">Tx Hash</th>
              <th className="p-2 border">상태</th>
            </tr>
          </thead>
          <tbody>
            {history.map((tx) => (
              <tr key={tx.id} className="text-center">
                <td className="p-2 border">{new Date(tx.created_at).toLocaleString("ko-KR")}</td>
                <td className="p-2 border">{tx.direction}</td>
                <td className="p-2 border">{tx.type}</td>
                <td className="p-2 border">{tx.amount}</td>
                <td className="p-2 border text-xs break-all">{tx.tx_hash || "-"}</td>
                <td className="p-2 border">{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
