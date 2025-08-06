"use client";

import { useEffect, useMemo, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
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
const RECEIVER = "0xFa0614c4E486c4f5eFF4C8811D46A36869E8aEA1";

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

  const contract = useMemo(() => {
    return getContract({
      client,
      chain: polygon,
      address: USDT_ADDRESS,
    });
  }, []);

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

    // ✅ Supabase 유저 조회
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
      invited_by_code: user.ref_by,
      center_code: user.center_id,
      student_name: user.name,
      tv_account_id: user.tv_id,
      pass_type: selected.name,
      pass_expired_at: expired.toISOString().split("T")[0],
      memo: "결제 완료",
      created_at: getKSTISOString(),
    });

    if (insertError) {
      console.error("❌ 수강 내역 저장 실패:", insertError);
    }

// 📌 수강료 결제 정보
  const reward_date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const created_at = new Date().toISOString();

  // ✅ 기존 fee_records 조회
  const { data: existingFeeRecord, error: fetchError } = await supabase
    .from("fee_records")
    .select("id")
    .eq("wallet_address", account.address.toLowerCase())
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("❌ 수강료 조회 실패:", fetchError);
  }

  if (existingFeeRecord) {
    // ✅ 기존 데이터 있으면 업데이트
    const { error: updateError } = await supabase
      .from("fee_records")
      .update({
        fee_tuition: selected.price,
        source: `수강신청: ${selected.name}`,
        reward_date,
        created_at,
      })
      .eq("id", existingFeeRecord.id);

    if (updateError) {
      console.error("❌ 수강료 업데이트 실패:", updateError);
    } else {
      console.log("✅ 수강료 업데이트 완료:", selected.price);
    }
  } else {
    // ✅ 없으면 새로 삽입
    const { error: feeError } = await supabase.from("fee_records").insert({
      ref_code: user.ref_code,
      name: user.name,
      wallet_address: account.address.toLowerCase(),
      fee_commission: 0,
      fee_tuition: selected.price,
      source: `수강신청: ${selected.name}`,
      reward_date,
      created_at,
    });

    if (feeError) {
      console.error("❌ 수강료 기록 실패:", feeError);
    } else {
      console.log("✅ 수강료 기록 완료:", selected.price);
    }
  }

  if (onPurchased) onPurchased();
} catch (err) {
  console.error("❌ 결제 실패:", err);
  alert("결제에 실패했습니다. 다시 시도해주세요.");
} finally {
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
        <div className="w-full max-w-[500px] bg-white rounded-t-3xl p-5">
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
              ✅ 수강신청 완료!<br />
              트랜잭션 해시:<br />
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
