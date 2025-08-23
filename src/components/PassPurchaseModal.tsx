"use client";

import { useEffect, useMemo, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { getContract, prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { client } from "@/lib/client";
import { supabase } from "@/lib/supabaseClient";
import { getKSTISOString } from "@/lib/dateUtil";

// ✅ 성공 모달
function PurchaseSuccessModal({ amount, onClose }: { amount: number; onClose: () => void }) {
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-gray-800">수강신청 성공</h2>
        <p className="mt-1 text-sm text-blue-600 font-bold">{amount} USDT</p>
        <p className="text-sm text-gray-600 mt-1">결제가 완료되었습니다</p>
      </div>
    </div>
  );
}

interface PassPurchaseModalProps {
  selected: {
    name: string;
    period: string;
    price: number;
    image: string;
  };
  usdtBalance: number;
  onClose: () => void;
  onPurchased?: () => void;
}

const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const RECEIVER = "0x32b25B55Ca1D7E2314ca8B80B6A9eDC6a86482a6";

export default function PassPurchaseModal({
  selected,
  usdtBalance,
  onClose,
  onPurchased,
}: PassPurchaseModalProps) {
  const account = useActiveAccount();
  const insufficient = usdtBalance < selected.price;
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 진행 메시지(선택)
  const [gasStepMsg, setGasStepMsg] = useState<string>("");

  const contract = useMemo(() => {
    return getContract({
      client,
      chain: polygon,
      address: USDT_ADDRESS,
    });
  }, []);

  // ✅ 가스 보장: 서버에서 0.5 MATIC 전송 → tx 해시로 영수증 대기
  async function ensureGasIfNeeded(address: string) {
    setGasStepMsg("가스 지급 준비 중...");

    const res = await fetch("/api/grant-gas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress: address }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data?.error || "grant-gas failed");
    }

    // 이미 지급된 유저는 스킵
    if (data.skipped) {
      setGasStepMsg("");
      return;
    }

    // 서버가 돌려준 tx로 확정 대기
    if (!data.tx) {
      setGasStepMsg("");
      throw new Error("grant-gas: tx hash missing");
    }

    setGasStepMsg("가스 트랜잭션 확정 대기 중...");
    // 최대 60초 정도 대기(기본 타임아웃 내부 처리)
    await waitForReceipt({
      client,
      chain: polygon,
      transactionHash: data.tx,
    });

    setGasStepMsg("");
  }

  const handlePurchase = async () => {
    if (!account?.address) {
      alert("지갑이 연결되지 않았습니다.");
      return;
    }

    if (insufficient) {
      alert("잔액이 부족합니다.");
      return;
    }

    setLoading(true);
    try {
      // 1) 첫 결제 시 0.5 MATIC 자동 지급(가스리스 미사용 정책)
      await ensureGasIfNeeded(account.address);

      // 2) (기존) USDT 전송
      const amount = BigInt(Math.floor(selected.price * 1e6));

      const tx = prepareContractCall({
        contract,
        method: "function transfer(address _to, uint256 _value) returns (bool)",
        params: [RECEIVER, amount],
      });

      const result = await sendTransaction({
        account,
        transaction: tx,
      });

      setTxHash(result.transactionHash);
      setShowSuccessModal(true);

      // ✅ Supabase에 저장
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("wallet_address", account.address.toLowerCase())
        .single();

      if (userError) {
        console.error("❌ 유저 정보 조회 실패:", userError);
        return;
      }

      // ✅ 기간 계산
      const now = new Date();
      const expired = new Date(now);
      if (selected.period.includes("개월")) {
        const months = parseInt(selected.period.replace("개월", "").trim());
        expired.setMonth(expired.getMonth() + months);
      } else if (selected.period.includes("무제한")) {
        expired.setFullYear(2099);
      }

      // ✅ 수강 내역 저장
      const { error: insertError } = await supabase.from("enrollments").insert({
        ref_code: user.ref_code,
        ref_by: user.ref_by,
        center_id: user.center_id,
        name: user.name,
        pass_type: selected.name,
        pass_expired_at: expired.toISOString().split("T")[0],
        memo: "결제 완료",
        tuition_fee: selected.price, // 실제 결제 금액
        created_at: getKSTISOString(),
      });

      if (insertError) {
        console.error("❌ 수강 내역 저장 실패:", insertError);
      }

      onPurchased?.();
    } catch (err: any) {
      console.error("❌ 결제 실패:", err);
      alert(`결제에 실패했습니다. ${err?.message ?? ""}`);
    } finally {
      setGasStepMsg("");
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      {showSuccessModal && (
        <PurchaseSuccessModal
          amount={selected.price}
          onClose={() => {
            setShowSuccessModal(false);
            onClose();
          }}
        />
      )}

      <div className="fixed inset-0 z-40 flex items-end justify-center bg-black bg-opacity-40 backdrop-blur-sm">
        {/* ✅ 여기 하나만 유지 */}
        <div className="w-full max-w-[500px] bg-white rounded-t-3xl p-5 relative">
          {/* ✅ 우측 상단 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* ✅ 모달 내용 */}
          <div className="text-center mb-2 text-lg font-bold">결제하기</div>
          <div className="text-sm text-gray-600 mb-1">주문정보</div>

          <div className="flex items-center space-x-3 p-3 border rounded-xl my-2">
            <img src={selected.image} className="w-12 h-12 rounded-lg" alt={selected.name} />
            <div>
              <p className="font-semibold">{selected.name}</p>
              <p className="text-xs text-gray-500">{selected.period}</p>
            </div>
          </div>

          <div className="flex justify-between text-sm mt-3">
            <span className="text-gray-700 font-medium">결제 금액</span>
            <span className="font-bold">{selected.price.toLocaleString()} USDT</span>
          </div>

          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">사용 가능한 USDT</span>
            <span className="text-gray-600">{usdtBalance} USDT</span>
          </div>

          {insufficient && (
            <p className="text-xs text-red-500 mt-1">
              (USDT가 부족합니다. 금액 충전 후 결제를 진행해주세요.)
            </p>
          )}

          {/* 진행 상태 안내 */}
          {gasStepMsg && (
            <div className="mt-3 text-center text-sm text-blue-600">{gasStepMsg}</div>
          )}

          <button
            onClick={handlePurchase}
            disabled={insufficient || loading}
            className={`mt-4 w-full py-2 rounded-md text-white font-semibold text-sm ${
              insufficient || loading
                ? "bg-blue-100 text-blue-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "결제 처리 중..." : "결제하기"}
          </button>

          {txHash && (
            <div className="mt-3 text-center text-sm text-green-600">
              ✅ 수강신청 완료!
              <br />
              트랜잭션 해시:
              <br />
              <a
                href={`https://polygonscan.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline break-all"
              >
                {txHash}
              </a>
            </div>
          )}

          <div onClick={onClose} className="mt-3 text-center text-sm text-gray-400 cursor-pointer">
            닫기
          </div>
        </div>
      </div>
    </>
  );
}
