"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc20";
import { polygon } from "thirdweb/chains";
import { Home } from "lucide-react";

import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import PassPurchaseModal from "@/components/PassPurchaseModal";
import { client } from "@/lib/client";
import { supabase } from "@/lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";
import { getKSTDateString } from "@/lib/dateUtil";

const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

export default function HomePage() {
  const account = useActiveAccount();
  const address =
    account?.address?.toLowerCase() || "0x0000000000000000000000000000000000000000";
  const router = useRouter();
  const session = useSession();
  const balanceCalled = useRef(false);

  const [usdtBalance, setUsdtBalance] = useState("조회 중...");
  const [name, setName] = useState("");
  const [okxUid, setOkxUid] = useState("");
  const [uidSaved, setUidSaved] = useState(false);

  // ▼ [ADD] BINGX UID 상태
  const [bingxUid, setBingxUid] = useState("");
  const [bingxSaved, setBingxSaved] = useState(false);

  const [investReward, setInvestReward] = useState(0);
  const [referralReward, setReferralReward] = useState(0);
  const [selectedPass, setSelectedPass] = useState<any>(null);

  const [enrolledTitle, setEnrolledTitle] = useState<string | null>(null);
  const [enrolledUntil, setEnrolledUntil] = useState<string | null>(null);
  const [checkedEnrollments, setCheckedEnrollments] = useState(false);
  const [showEnrollAlert, setShowEnrollAlert] = useState(false);

  const usdtContract = useMemo(
    () => getContract({ client, chain: polygon, address: USDT_ADDRESS }),
    []
  );

  useEffect(() => {
    if (
      !account?.address ||
      account.address === "0x0000000000000000000000000000000000000000"
    ) {
      router.replace("/");
    }
  }, [account?.address]);

  useEffect(() => {
    if (account && !balanceCalled.current) {
      balanceCalled.current = true;
      fetchUSDTBalance();
      fetchTodayRewards();
      fetchUserInfo();
    }
  }, [account]);

  // ✅ 항상 페이지 진입 시 최신 수강 상태 확인
  useEffect(() => {
    if (!account?.address) return;
    fetchUserInfo();
  }, [account?.address]);

  const fetchUSDTBalance = async () => {
    if (!account?.address) return;
    try {
      const result = await balanceOf({ contract: usdtContract, address: account.address });
      const formatted = (Number(result) / 1e6).toFixed(2);
      localStorage.setItem("usdt_balance", formatted);
      setUsdtBalance(`${formatted} USDT`);
    } catch {
      setUsdtBalance("0.00 USDT");
    }
  };

  const fetchTodayRewards = async () => {
    if (!account?.address) return;
    const today = getKSTDateString();
    const { data: user } = await supabase
      .from("users")
      .select("ref_code")
      .eq("wallet_address", address)
      .maybeSingle();
    const refCode = user?.ref_code || "RS10001";

    const { data } = await supabase
      .from("reward_transfers")
      .select("reward_amount, referral_amount, center_amount")
      .eq("ref_code", refCode)
      .eq("reward_date", today);

    if (!data || data.length === 0) {
      setInvestReward(0);
      setReferralReward(0);
      return;
    }

    const [todayLog] = data;
    setInvestReward(Number(todayLog.reward_amount || 0));
    setReferralReward(
      Number(todayLog.referral_amount || 0) + Number(todayLog.center_amount || 0)
    );
  };

  const fetchUserInfo = async () => {
    const { data: user } = await supabase
      .from("users")
      // ▼ [MOD] bingx_uid 함께 조회
      .select("name, okx_uid, bingx_uid, ref_code")
      .eq("wallet_address", address)
      .maybeSingle();

    if (user) {
      setName(user.name || "");
      setOkxUid(user.okx_uid || "");
      setUidSaved(!!user.okx_uid);

      // ▼ [ADD] BINGX UID 세팅
      setBingxUid(user.bingx_uid || "");
      setBingxSaved(!!user.bingx_uid);

      const { data: enrollments } = await supabase
        .from("enrollments")
        .select("pass_type, pass_expired_at")
        .eq("ref_code", user.ref_code)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (enrollments?.pass_type) {
        const until = enrollments.pass_expired_at?.toString().split("T")[0] || null;

        // ▼ [ADD] 만료 처리: 오늘(KST) > 만료일이면 수강 상태 해제
        const todayKst = getKSTDateString(); // "YYYY-MM-DD"
        const isExpired = until ? todayKst > until : false;

        if (isExpired) {
          setEnrolledTitle(null);
          setEnrolledUntil(null);
        } else {
          setEnrolledTitle(enrollments.pass_type);
          setEnrolledUntil(until);
        }
      } else {
        setEnrolledTitle(null);
        setEnrolledUntil(null);
      }
    }

    setCheckedEnrollments(true);
  };

  const handleSaveUID = async () => {
    if (!okxUid || !address) return;

    await supabase.from("users").update({ okx_uid: okxUid }).eq("wallet_address", address);

    const { error } = await supabase
      .from("fee_records")
      .update({ okx_uid: okxUid })
      .eq("wallet_address", address);
    if (error) {
      console.error("❌ fee_records okx_uid 업데이트 실패:", error.message);
    } else {
      console.log("✅ fee_records okx_uid 업데이트 완료");
      setUidSaved(true);
    }
  };

  // ▼ [ADD] BINGX UID 저장 핸들러
  const handleSaveBingxUID = async () => {
    if (!bingxUid || !address) return;

    const { error: userErr } = await supabase
      .from("users")
      .update({ bingx_uid: bingxUid })
      .eq("wallet_address", address);

    const { error: feeErr } = await supabase
      .from("fee_records")
      .update({ bingx_uid: bingxUid })
      .eq("wallet_address", address);

    if (!userErr && !feeErr) {
      setBingxSaved(true);
      setTimeout(() => setBingxSaved(false), 1500);
    } else {
      console.error("❌ bingx_uid 업데이트 실패:", userErr || feeErr);
    }
  };

  const handlePassPurchased = async () => {
    if (!selectedPass || !address) return;
    setEnrolledTitle(selectedPass.name);
    // 실제 insert는 PassPurchaseModal에서 처리됨
  };

  // ▼ [ADD] 만료 안내 문구 계산 (KST 기준)
  const expiryMsg = useMemo(() => {
    if (!enrolledUntil) return null;

    // KST 00:00 기준 비교
    const todayKst = getKSTDateString(); // "YYYY-MM-DD"
    const startOfTodayKst = new Date(`${todayKst}T00:00:00+09:00`).getTime();
    const expireKst = new Date(`${enrolledUntil}T00:00:00+09:00`).getTime();

    const diffDays = Math.ceil((expireKst - startOfTodayKst) / (1000 * 60 * 60 * 24));

    if (diffDays === 3) return "구독 만료 3일 전이예요";
    if (diffDays === 2) return "구독 만료 2일 전이예요";
    if (diffDays === 1) return "구독 만료 1일 전이예요";
    return null; // 그 외에는 기본 문구 사용
  }, [enrolledUntil]);

  return (
    <main className="w-full min-h-screen bg-[#f5f7fa] pt-0 pb-20">
      <TopBar icon={<Home size={20} className="text-gray-700" />} title="홈" />

      {enrolledTitle && enrolledUntil && (
        <div className="max-w-[500px] mx-auto px-3 pt-2">
          <div className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-xl text-center shadow">
            {expiryMsg ?? `${enrolledTitle}를 수강중이예요! (~ ${enrolledUntil})`}
          </div>
        </div>
      )}

      <div className="px-3 pt-2">
        <img src="/okx.png" alt="광고 배너" className="w-full rounded-xl shadow mb-2" />
      </div>

      <div className="max-w-[500px] mx-auto px-3 pt-2 space-y-2">
        {/* OKX UID */}
        {!uidSaved ? (
          <section className="bg-white rounded-xl shadow px-4 pt-4 pb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">나의 OKX UID를 입력하세요</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="OKX UID"
                value={okxUid}
                onChange={(e) => setOkxUid(e.target.value)}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
              <button
                onClick={handleSaveUID}
                className="text-sm font-semibold bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                저장
              </button>
            </div>
            <p className="mt-3 text-[12px] text-center text-gray-500 bg-gray-100 rounded-full py-1">
              OKX UID를 입력하지 않으면 리워드를 받을 수 없어요
            </p>
          </section>
        ) : (
          <div className="bg-white rounded-xl shadow px-4 pt-4 pb-4 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">OKX UID : {okxUid}</span>
            <div className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">저장 완료</div>
          </div>
        )}

        {/* ▼ [ADD] BINGX UID */}
        {!bingxSaved ? (
          <section className="bg-white rounded-xl shadow px-4 pt-4 pb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">나의 BINGX UID를 입력하세요</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="BINGX UID"
                value={bingxUid}
                onChange={(e) => setBingxUid(e.target.value)}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
              <button
                onClick={handleSaveBingxUID}
                className="text-sm font-semibold bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                저장
              </button>
            </div>
            <p className="mt-3 text-[12px] text-center text-gray-500 bg-gray-100 rounded-full py-1">
              BINGX UID를 입력하지 않으면 리워드를 받을 수 없어요
            </p>
          </section>
        ) : (
          <div className="bg-white rounded-xl shadow px-4 pt-4 pb-4 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">BINGX UID : {bingxUid}</span>
            <div className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">저장 완료</div>
          </div>
        )}

        <section className="bg-white rounded-xl shadow px-4 pt-3 pb-0">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold">이번주의 리워드</h3>
            <p className="text-xl font-bold">
              {(investReward + referralReward).toFixed(2)} USDT
            </p>
          </div>
          <div className="mt-2 mb-0 text-center bg-gray-2 00 rounded-full px-4 py-1 text-[13px] text-gray-700">
            이번주의 리워드가 매주 토요일 오후 6시 이전에 입금돼요.
          </div>
        </section>

        <section
          className={`bg-white rounded-xl shadow px-4 py-3 ${
            enrolledTitle ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => {
            if (enrolledTitle) {
              router.push("/chart");
            } else {
              setShowEnrollAlert(true);
            }
          }}
        >
          <div className="flex items-center space-x-2">
            <img src="/chart.png" alt="차트" className="w-10 h-10" />
            <span
              className={`text-sm font-semibold ${
                enrolledTitle ? "text-blue-600" : "text-gray-400"
              }`}
            >
              트레이딩 뷰 차트 받아보기
            </span>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-blue-600 text-white text-md font-semibold px-4 py-1">나의 자산</div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img src="/tether-icon.png" className="w-7 h-7" />
                <span className="font-semibold text-gray-600">Tether</span>
              </div>
              <span className="text-gray-900 font-bold text-base">{usdtBalance}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => router.push("/deposit")}
                className="w-1/2 py-2 rounded bg-blue-100 text-blue-700 font-semibold"
              >
                입금하기
              </button>
              <button
                onClick={() => router.push("/withdraw")}
                className="w-1/2 py-2 rounded bg-blue-100 text-blue-700 font-semibold"
              >
                출금하기
              </button>
            </div>
          </div>
        </section>

        {/* 패스권 구입 섹션 */}
        <section className="bg-white rounded-xl shadow px-4 py-3">
          <h3 className="text-sm font-bold text-blue-500 mb-2">패스권 구입하기</h3>
          {[
            { title: "300 PASS", price: "300 USDT / 1개월", image: "/pass-300.png" },
            { title: "1800 PASS", price: "1800 USDT / 6개월", image: "/pass-1800.png" },
            { title: "3600 PASS", price: "3600 USDT / 12개월", image: "/pass-3600.png" },
            { title: "VIP PASS", price: "10000 USDT / 12개월", image: "/pass-vip.png" },
          ].map((pass, idx) => {
            const isEnrolled = enrolledTitle === pass.title;

            return (
              <div key={idx} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <img src={pass.image} className="w-9 h-9" />
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{pass.title}</p>
                    <p className="text-[12px] text-gray-500">{pass.price}</p>
                  </div>
                </div>

                {!checkedEnrollments ? (
                  <button
                    disabled
                    className="text-[12px] font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    로딩중...
                  </button>
                ) : isEnrolled ? (
                  <button
                    disabled
                    className="text-[12px] font-semibold text-gray-500 bg-gray-200 px-3 py-1 rounded-full"
                  >
                    수강중
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setSelectedPass({
                        name: pass.title,
                        period: pass.price.split("/")[1].trim(),
                        price: parseFloat(pass.price.replace("USDT", "").split("/")[0].trim()),
                        image: pass.image,
                      })
                    }
                    className="text-[12px] font-semibold text-white bg-blue-500 px-3 py-1 rounded-full hover:bg-blue-600"
                  >
                    수강신청
                  </button>
                )}
              </div>
            );
          })}
        </section>
      </div>

      {selectedPass && (
        <PassPurchaseModal
          selected={selectedPass}
          usdtBalance={parseFloat(usdtBalance.replace(" USDT", "")) || 0}
          onClose={() => setSelectedPass(null)}
          onPurchased={handlePassPurchased}
        />
      )}

      <BottomNav />

      {showEnrollAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-5 w-[90%] max-w-xs text-center shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowEnrollAlert(false)}
            >
              ✕
            </button>
            <img src="/alert.png" alt="알림" className="mx-auto w-12 h-12 mb-3" />
            <p className="text-sm font-semibold text-red-600">수강생만 이용 가능한 서비스입니다.</p>
            <p className="text-sm text-gray-700 mt-1">수강신청을 완료해주세요.</p>
          </div>
        </div>
      )}
    </main>
  );
}
