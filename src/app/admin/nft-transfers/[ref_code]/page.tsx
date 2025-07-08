// src/app/admin/nft-transfers/[ref_code]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type NFTTransfer = {
  id: string;
  ref_code: string;
  nft_type: string;
  direction: "in" | "out";
  purpose: string;
  quantity: number;
  tx_hash: string;
  status: string;
  created_at: string;
  kst_date?: string;
};

export default function NftTransferPage() {
  const { ref_code } = useParams() as { ref_code: string };
  const [transfers, setTransfers] = useState<NFTTransfer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransfers = async () => {
      const { data, error } = await supabase
        .from("nft_transfers")
        .select("*")
        .eq("ref_code", ref_code)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ NFT 내역 조회 실패:", error.message);
        return;
      }
      setTransfers(data || []);
      setLoading(false);
    };

    fetchTransfers();
  }, [ref_code]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📦 NFT 이동 내역 - {ref_code}</h2>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <table className="min-w-full text-sm border border-gray-300 table-auto">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="p-2 border">날짜</th>
              <th className="p-2 border">방향</th>
              <th className="p-2 border">종류</th>
              <th className="p-2 border">목적</th>
              <th className="p-2 border">수량</th>
              <th className="p-2 border">Tx Hash</th>
              <th className="p-2 border">상태</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((tx) => (
              <tr key={tx.id} className="text-center">
                <td className="p-2 border">{new Date(tx.created_at).toLocaleString("ko-KR")}</td>
                <td className="p-2 border">{tx.direction}</td>
                <td className="p-2 border">{tx.nft_type}</td>
                <td className="p-2 border">{tx.purpose}</td>
                <td className="p-2 border">{tx.quantity}</td>
                <td className="p-2 border text-xs break-all">{tx.tx_hash}</td>
                <td className="p-2 border">{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
