"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { supabase } from "@/lib/supabaseClient";

export default function MyPage() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);
  const [editingField, setEditingField] = useState<"name" | "phone" | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!account?.address) return;

      const { data: user, error } = await supabase
        .from("users")
        .select("name, phone, email, created_at, ref_by, joined_at")
        .eq("wallet_address", account.address.toLowerCase())
        .maybeSingle();

      if (!user) return;

      let refName = null;
      if (user.ref_by) {
        const { data: refUser } = await supabase
          .from("users")
          .select("name")
          .eq("ref_code", user.ref_by)
          .maybeSingle();
        refName = refUser?.name || null;
      }

      setUserData({
        ...user,
        ref_by_name: refName,
      });
    };

    fetchUserData();
  }, [account]);

  if (!account) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">
        <p className="text-gray-500 text-sm">지갑 주소 불러오는 중...</p>
      </main>
    );
  }

  const handleLogout = async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("logged_out", "true");
      window.location.replace("/");
    } catch (error) {
      console.error("❌ 로그아웃 실패:", error);
      alert("로그아웃 중 문제가 발생했습니다.");
    }
  };

  return (
    <>
      <TopBar title="마이페이지" showBack />
      <main className="min-h-screen bg-[#f5f7fa] pb-16 w-full">
        <div className="px-4 pt-2 max-w-[500px] mx-auto">
          {/* 계정관리 */}
          <section className="mb-2">
            <h2 className="text-md font-semibold text-gray-700 mb-1 pl-2">계정관리</h2>
            <div className="bg-white rounded-xl shadow border text-sm divide-y divide-gray-200">
              {/* 이름 */}
              <div className="flex justify-between px-4 py-3 items-center">
                <span>내 이름</span>
                {editingField === "name" ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="text-sm border rounded px-2 py-1 w-28"
                    />
                    <button
                      onClick={async () => {
                        const { error } = await supabase
                          .from("users")
                          .update({ name: nameInput })
                          .eq("wallet_address", account.address.toLowerCase());

                        if (!error) {
                          setEditingField(null);
                          setUserData({ ...userData, name: nameInput });
                        }
                      }}
                      className="text-blue-500 text-sm"
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-800">
                    {userData?.name || "-"}{" "}
                    <span
                      className="text-blue-500 cursor-pointer text-sm"
                      onClick={() => {
                        setEditingField("name");
                        setNameInput(userData?.name || "");
                      }}
                    >
                      수정
                    </span>
                  </span>
                )}
              </div>

              {/* 휴대폰 번호 */}
              <div className="flex justify-between px-4 py-3 items-center">
                <span>휴대폰 번호</span>
                {editingField === "phone" ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="text-sm border rounded px-2 py-1 w-28"
                    />
                    <button
                      onClick={async () => {
                        const { error } = await supabase
                          .from("users")
                          .update({ phone: phoneInput })
                          .eq("wallet_address", account.address.toLowerCase());

                        if (!error) {
                          setEditingField(null);
                          setUserData({ ...userData, phone: phoneInput });
                        }
                      }}
                      className="text-blue-500 text-sm"
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-800">
                    {userData?.phone || "-"}{" "}
                    <span
                      className="text-blue-500 cursor-pointer text-sm"
                      onClick={() => {
                        setEditingField("phone");
                        setPhoneInput(userData?.phone || "");
                      }}
                    >
                      수정
                    </span>
                  </span>
                )}
              </div>

              {/* 이메일 */}
              <div className="flex justify-between px-4 py-3">
                <span>가입 이메일</span>
                <span className="text-gray-800">{userData?.email || "-"}</span>
              </div>

              {/* 가입 일시 */}
              <div className="flex justify-between px-4 py-3">
                <span>가입 일시</span>
                <span className="text-gray-800">
                  {userData?.joined_at
                    ? userData.joined_at.slice(0, 19).replace("T", " ")
                    : "-"}
                </span>
              </div>

              {/* 추천인 */}
              <div className="flex justify-between px-4 py-3">
                <span>추천인</span>
                <span className="text-gray-800">{userData?.ref_by_name || "-"}</span>
              </div>
            </div>
          </section>

          {/* 내역관리 */}
          <section className="mb-2">
            <h2 className="text-md font-semibold text-gray-700 mb-1 pl-2">내역관리</h2>
            <div className="bg-white rounded-xl shadow border text-sm divide-y divide-gray-200">
              <button
                onClick={() => router.push("/mypage/history/usdt")}
                className="w-full px-4 py-3 hover:bg-gray-50 flex justify-between items-center"
              >
                <span>USDT 입출금 내역</span>
                <img src="/icon-go.png" alt="이동" className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* 문의 */}
          <section className="space-y-4 mb-2">
            <a
              href="http://pf.kakao.com/_rxaxmGn/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white p-4 rounded-xl shadow flex justify-between items-center hover:bg-gray-50"
            >
              <div className="flex items-center space-x-2">
                <img src="/icon-question.png" alt="문의" className="w-5 h-5" />
                <span className="text-sm">1:1 문의하기</span>
              </div>
              <img src="/icon-link.png" alt="이동" className="w-4 h-4" />
            </a>
          </section>

          {/* 로그아웃 */}
          <button
            onClick={handleLogout}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold mb-4"
          >
            로그아웃
          </button>
        </div>
        <BottomNav />
      </main>
    </>
  );
}
