"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc20";
import { polygon } from "thirdweb/chains";
import { Home, Copy } from "lucide-react";

import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { getOnchainNFTBalances } from "@/lib/getOnchainNFTBalances";
import { client } from "@/lib/client";
import { supabase } from "@/lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";
import { getKSTDateString } from "@/lib/dateUtil";

type NFTType = "nft300" | "nft3000" | "nft10000";

const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

export default function HomePage() {
  const account = useActiveAccount();
  const address = account?.address?.toLowerCase() || "0x0000000000000000000000000000000000000000";
  const session = useSession();
  const router = useRouter();
  const balanceCalled = useRef(false);

  useEffect(() => {
    const invalid =
      !account?.address ||
      account.address === "0x0000000000000000000000000000000000000000";

    if (invalid) {
      console.warn("⚠️ 유효하지 않은 지갑 주소. 로그인 페이지로 이동합니다.");
      router.replace("/");
    }
  }, [account?.address]);

  const [usdtBalance, setUsdtBalance] = useState("조회 중...");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [nftBalances, setNftBalances] = useState<Record<NFTType, number>>({
    nft300: 0,
    nft3000: 0,
    nft10000: 0,
  });
  const [investReward, setInvestReward] = useState(0);
  const [referralReward, setReferralReward] = useState(0);

  const usdtContract = useMemo(() => getContract({ client, chain: polygon, address: USDT_ADDRESS }), []);

  const fetchUSDTBalance = async () => {
    if (!account?.address) return;

    try {
      const result = await balanceOf({ contract: usdtContract, address: account.address });
      const formatted = (Number(result) / 1e6).toFixed(2);
      localStorage.setItem("usdt_balance", formatted);
      setUsdtBalance(`${formatted} USDT`);
    } catch (err) {
      console.error("❌ USDT 잔액 조회 실패:", err);
      setUsdtBalance("0.00 USDT");
    }
  };

  useEffect(() => {
    if (account && !balanceCalled.current) {
      balanceCalled.current = true;
      fetchUSDTBalance();
      fetchTodayRewards();
      syncNFTs();
      fetchUserInfo();
    }
  }, [account]);

  const fetchTodayRewards = async () => {
    if (!account?.address) return;
    const today = getKSTDateString();

    const { data: user } = await supabase
      .from("users")
      .select("ref_code")
      .eq("wallet_address", address)
      .maybeSingle();
    if (!user?.ref_code) return;

    const { data, error } = await supabase
      .from("reward_transfers")
      .select("reward_amount, referral_amount, center_amount")
      .eq("ref_code", user.ref_code)
      .eq("reward_date", today); // 👈 이 방식으로 날짜 정확하게 비교

    if (error || !data || data.length === 0) {
      setInvestReward(0);
      setReferralReward(0);
      return;
    }

    const todayLog = data[0];
    const invest = Number(todayLog.reward_amount || 0);
    const referral = Number(todayLog.referral_amount || 0);
    const center = Number(todayLog.center_amount || 0);

    setInvestReward(invest);
    setReferralReward(referral + center);
  };

  const syncNFTs = async () => {
    if (!account?.address) return;

    const lowerAddress = account.address.toLowerCase();

    const { data: user } = await supabase
      .from("users")
      .select("ref_code, ref_by, center_id, name")
      .eq("wallet_address", lowerAddress)
      .maybeSingle();
    if (!user || !user.ref_code) return;

    const balances = await getOnchainNFTBalances(
      lowerAddress,
      user.ref_code,
      user.ref_by || "SW10101",
      user.center_id || "SW10101"
    );

    const { error } = await supabase.from("nfts").upsert({
      ref_code: user.ref_code,
      wallet_address: lowerAddress,
      name: user.name || "", // ✅ name 추가
      ref_by: user.ref_by || "SW10101",
      center_id: user.center_id || "SW10101",
      nft300: balances.nft300,
      nft3000: balances.nft3000,
      nft10000: balances.nft10000,
    }, {
      onConflict: "ref_code",
    });

    if (!error) setNftBalances(balances);
  };

  const fetchUserInfo = async () => {
    const { data } = await supabase
      .from("users")
      .select("name, nickname")
      .eq("wallet_address", address)
      .maybeSingle();

    if (data) {
      setName(data.name || "");
      setNickname(data.nickname || "");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    alert("주소가 복사되었습니다.");
  };

  return (
    <main className="w-full min-h-screen bg-[#f5f7fa] pt-0 pb-20">
      <TopBar icon={<Home size={20} className="text-gray-700" />} title="홈" />
      {/* ✅ 광고 배너 추가 (OKX 등) */}
<div className="px-3 pt-2">
  <img
    src="/okx.png"  // ✅ 이미지 경로 또는 외부 링크로 대체 가능
    alt="광고 배너"
    className="w-full rounded-xl shadow mb-2"
  />
</div>

      <div className="max-w-[500px] mx-auto px-3 pt-2 space-y-2">
{/* ✅ 오늘의 리워드 카드 (말풍선 스타일 포함) */}
<section className="bg-white rounded-xl shadow px-4 pt-3 pb-0 relative">
  <div className="flex justify-between items-center">
    <h3 className="text-base font-bold text-gray-800">오늘의 리워드</h3>
    <p className="text-xl font-bold text-black">{(investReward + referralReward).toFixed(2)} USDT</p>
  </div>

  {/* 말풍선 형태 안내문 */}
  <div className="w-full mt-2 mb-0">
    <div className="bg-gray-200 rounded-full px-4 py-1 text-center text-[13px] text-gray-700">
      어제의 리워드가 매일 오후 3시 이전에 자동 입금돼요.
    </div>
  </div>
</section>

{/* ✅ 트레이딩 뷰 차트 받아보기 CTA */}
<div
  onClick={() => router.push("/chart")} // 페이지 경로는 필요에 따라 변경
  className="flex items-center justify-between bg-white rounded-xl shadow px-4 py-3 cursor-pointer"
>
  <div className="flex items-center space-x-2">
    <img src="/chart.png" alt="차트" className="w-10 h-10" />
    <span className="text-sm font-semibold text-blue-600">
      트레이딩 뷰 차트 받아보기
    </span>
  </div>
  <span className="text-blue-600 text-lg font-bold">{`>`}</span>
</div>


{/* ✅ 나의 자산 카드 (USDT) */}
<section className="bg-white rounded-xl shadow overflow-hidden">
  <div className="bg-blue-600 text-white text-md font-semibold px-4 py-1">
    나의 자산
  </div>

  <div className="p-4 space-y-3">
    {/* USDT 잔액 */}
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src="/tether-icon.png" alt="USDT" className="w-7 h-7" />
        <span className="font-semibold text-gray-600">Tether</span>
      </div>
      <span className="text-gray-900 font-bold text-base">{usdtBalance}</span>
    </div>

    {/* 입금 / 출금 버튼 */}
    <div className="flex space-x-2">
      <button
        onClick={() => router.push("/deposit")}
        className="w-1/2 py-2 rounded bg-blue-100 text-blue-700 text-sm font-semibold hover:bg-blue-200"
      >
        입금하기
      </button>
      <button
        onClick={() => router.push("/withdraw")}
        className="w-1/2 py-2 rounded bg-blue-100 text-blue-700 text-sm font-semibold hover:bg-blue-200"
      >
        출금하기
      </button>
    </div>
  </div>
</section>

{/* ✅ 패스권 구입하기 카드 */}
<section className="bg-white rounded-xl shadow px-4 py-3">
  <h3 className="text-sm font-bold text-blue-500 mb-2">패스권 구입하기</h3>

  {[
    {
      title: "300 PASS",
      price: "3000 USDT / 1개월",
      image: "/pass-300.png",
      status: "신청가능",
    },
    {
      title: "1800 PASS",
      price: "1800 USDT / 6개월",
      image: "/pass-1800.png",
      status: "수강중",
    },
    {
      title: "3600 PASS",
      price: "3600 USDT / 12개월",
      image: "/pass-3600.png",
      status: "신청가능",
    },
    {
      title: "VIP PASS",
      price: "10000 USDT / 무제한",
      image: "/pass-vip.png",
      status: "신청가능",
    },
  ].map((pass, idx) => (
    <div key={idx} className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <img src={pass.image} alt={pass.title} className="w-9 h-9" />
        <div>
          <p className="font-bold text-gray-800 text-sm">{pass.title}</p>
          <p className="text-[12px] text-gray-500">{pass.price}</p>
        </div>
      </div>

      {/* 상태 버튼 */}
      {pass.status === "수강중" ? (
        <span className="text-[12px] font-semibold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
          수강중
        </span>
      ) : (
        <button
          onClick={() => alert(`${pass.title} 신청 페이지로 이동`)}
          className="text-[12px] font-semibold text-white bg-blue-500 px-3 py-1 rounded-full hover:bg-blue-600"
        >
          수강신청
        </button>
      )}
    </div>
  ))}
</section>

      </div>
      <BottomNav />
    </main>
  );
}
