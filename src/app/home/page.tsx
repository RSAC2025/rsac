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
  const [selectedPass, setSelectedPass] = useState<{
    name: string;
    period: string;
    price: number;
    image: string;
  } | null>(null);

  const usdtContract = useMemo(() => getContract({ client, chain: polygon, address: USDT_ADDRESS }), []);

  useEffect(() => {
    const invalid = !account?.address || account.address === "0x0000000000000000000000000000000000000000";
    if (invalid) router.replace("/");
  }, [account?.address]);

  useEffect(() => {
    if (account && !balanceCalled.current) {
      balanceCalled.current = true;
      fetchUSDTBalance();
      fetchTodayRewards();
      syncNFTs();
      fetchUserInfo();
    }
  }, [account]);

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
    const { data: user } = await supabase.from("users").select("ref_code").eq("wallet_address", address).maybeSingle();
    if (!user?.ref_code) return;
    const { data } = await supabase
      .from("reward_transfers")
      .select("reward_amount, referral_amount, center_amount")
      .eq("ref_code", user.ref_code)
      .eq("reward_date", today);
    if (!data || data.length === 0) {
      setInvestReward(0);
      setReferralReward(0);
      return;
    }
    const [todayLog] = data;
    setInvestReward(Number(todayLog.reward_amount || 0));
    setReferralReward(Number(todayLog.referral_amount || 0) + Number(todayLog.center_amount || 0));
  };

  const syncNFTs = async () => {
    if (!account?.address) return;
    const { data: user } = await supabase
      .from("users")
      .select("ref_code, ref_by, center_id, name")
      .eq("wallet_address", address)
      .maybeSingle();
    if (!user || !user.ref_code) return;
    const balances = await getOnchainNFTBalances(
      address,
      user.ref_code,
      user.ref_by || "SW10101",
      user.center_id || "SW10101"
    );
    await supabase.from("nfts").upsert({
      ref_code: user.ref_code,
      wallet_address: address,
      name: user.name || "",
      ref_by: user.ref_by || "SW10101",
      center_id: user.center_id || "SW10101",
      ...balances,
    }, { onConflict: "ref_code" });
    setNftBalances(balances);
  };

  const fetchUserInfo = async () => {
    const { data } = await supabase.from("users").select("name, nickname").eq("wallet_address", address).maybeSingle();
    if (data) {
      setName(data.name || "");
      setNickname(data.nickname || "");
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#f5f7fa] pt-0 pb-20">
      <TopBar icon={<Home size={20} className="text-gray-700" />} title="홈" />
      <div className="px-3 pt-2">
        <img src="/okx.png" alt="광고 배너" className="w-full rounded-xl shadow mb-2" />
      </div>

      <div className="max-w-[500px] mx-auto px-3 pt-2 space-y-2">
        <section className="bg-white rounded-xl shadow px-4 pt-3 pb-0">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold">오늘의 리워드</h3>
            <p className="text-xl font-bold">{(investReward + referralReward).toFixed(2)} USDT</p>
          </div>
          <div className="mt-2 mb-0 text-center bg-gray-200 rounded-full px-4 py-1 text-[13px] text-gray-700">
            어제의 리워드가 매일 오후 3시 이전에 자동 입금돼요.
          </div>
        </section>

        <section className="bg-white rounded-xl shadow px-4 py-3 cursor-pointer" onClick={() => router.push("/chart")}> 
          <div className="flex items-center space-x-2">
            <img src="/chart.png" alt="차트" className="w-10 h-10" />
            <span className="text-sm font-semibold text-blue-600">트레이딩 뷰 차트 받아보기</span>
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
              <button onClick={() => router.push("/deposit")} className="w-1/2 py-2 rounded bg-blue-100 text-blue-700 font-semibold">입금하기</button>
              <button onClick={() => router.push("/withdraw")} className="w-1/2 py-2 rounded bg-blue-100 text-blue-700 font-semibold">출금하기</button>
            </div>
          </div>
        </section>

<section className="bg-white rounded-xl shadow px-4 py-3">
  <h3 className="text-sm font-bold text-blue-500 mb-2">패스권 구입하기</h3>
  {[
    {
      title: "300 PASS",
      price: "300 USDT / 1개월",
      image: "/pass-300.png"
    },
    {
      title: "1800 PASS",
      price: "1800 USDT / 6개월",
      image: "/pass-1800.png"
    },
    {
      title: "3600 PASS",
      price: "3600 USDT / 12개월",
      image: "/pass-3600.png"
    },
    {
      title: "VIP PASS",
      price: "10000 USDT / 무제한",
      image: "/pass-vip.png"
    }
  ].map((pass, idx) => (
    <div key={idx} className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <img src={pass.image} className="w-9 h-9" />
        <div>
          <p className="font-bold text-gray-800 text-sm">{pass.title}</p>
          <p className="text-[12px] text-gray-500">{pass.price}</p>
        </div>
      </div>

      {/* ✅ 항상 수강신청 버튼 노출 */}
<button
  onClick={() =>
    setSelectedPass({
      name: pass.title,
      period: pass.price.split("/")[1].trim(),
      price: parseFloat(pass.price.replace("USDT", "").split("/")[0].trim()), // ✅ 여기를 수정
      image: pass.image,
    })
  }
  className="text-[12px] font-semibold text-white bg-blue-500 px-3 py-1 rounded-full hover:bg-blue-600"
>
  수강신청
</button>
    </div>
  ))}
</section>

      </div>

      {selectedPass && (
        <PassPurchaseModal
          selected={selectedPass}
          usdtBalance={parseFloat(usdtBalance.replace(" USDT", "")) || 0}
          onClose={() => setSelectedPass(null)}
        />
      )}

      <BottomNav />
    </main>
  );
}
