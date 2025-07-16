"use client";

import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { supabase } from "@/lib/supabaseClient";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

interface UserNode {
  name: string;
  ref_code: string;
  grade: string;
  created_at: string;
  children?: UserNode[];
}

const GRADE_LABELS: Record<string, string> = {
  v1: "일반회원",
  v2: "실버회원",
  v3: "골드회원",
  v4: "초보강사",
  v5: "선임강사",
  v6: "센터장",
  v7: "마스터센터장",
  v8: "골드센터장",
  v9: "회사",
};

export default function InvitePage() {
  const account = useActiveAccount();
  const [refCode, setRefCode] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [treeData, setTreeData] = useState<UserNode[]>([]);

  // ✅ 내 초대코드 + 초대링크
  useEffect(() => {
    const loadRefCode = async () => {
      if (!account?.address) return;

      const { data } = await supabase
        .from("users")
        .select("ref_code")
        .eq("wallet_address", account.address.toLowerCase())
        .single();

      if (data?.ref_code) {
        setRefCode(data.ref_code);
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        setInviteLink(`${origin}/invite/${data.ref_code}`);
      }
    };
    loadRefCode();
  }, [account]);

  // ✅ 조직도 불러오기 및 트리 구성
  useEffect(() => {
    const fetchHierarchy = async () => {
      if (!refCode) return;

      const { data: allUsers } = await supabase
        .from("users")
        .select("ref_code, ref_by, name, grade, joined_at");

      if (!allUsers) return;

      const map = new Map<string, UserNode>();
      allUsers.forEach(u => {
        map.set(u.ref_code, {
          name: u.name,
          ref_code: u.ref_code,
          grade: u.grade,
          created_at: u.joined_at,
          children: [],
        });
      });

      allUsers.forEach(u => {
        const node = map.get(u.ref_code)!;
        if (u.ref_by && map.has(u.ref_by)) {
          map.get(u.ref_by)!.children!.push(node);
        }
      });

      const myNode = map.get(refCode);
      if (myNode) {
        setTreeData([myNode]);
      }
    };

    fetchHierarchy();
  }, [refCode]);

  // ✅ 조직도 텍스트 출력 함수 (초대코드 제거)
  function renderTreeTable(nodes: UserNode[], indent = ""): string {
    return nodes
      .map((node) => {
        const indentPrefix = indent + (indent ? "└ " : "");
        const nameAndGrade = `${indentPrefix}${node.name} [${GRADE_LABELS[node.grade] || node.grade}]`;

        const nameField = nameAndGrade.padEnd(42, " "); // 넉넉히 조절
        const dateField = new Date(new Date(node.created_at).getTime() + 9 * 3600000)
          .toISOString()
          .slice(0, 10);

        return `${nameField}${dateField}` +
          (node.children && node.children.length > 0
            ? "\n" + renderTreeTable(node.children, indent + "  ")
            : "");
      })
      .join("\n");
  }

  // ✅ 초대링크 복사
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("복사 실패: 수동으로 복사해주세요.");
    }
  };

  return (
    <>
      <TopBar title="친구초대" showBack />
      <main className="min-h-screen bg-[#f5f7fa] pb-32 w-full">
        <div className="px-2 pt-4 max-w-md mx-auto space-y-4">
          {/* ✅ 나의 초대 코드 */}
          <section className="bg-white rounded-xl shadow overflow-hidden">
            <div className="bg-blue-600 text-white px-3 py-1 font-semibold text-base">
              나의 초대 코드
            </div>
            <div className="px-3 py-4 space-y-1 text-xs text-black">
              <div className="text-left">
                <span className="font-semibold">초대코드 :</span> {refCode || "불러오는 중..."}
              </div>
              {inviteLink && (
                <>
                  <div className="text-left break-all mt-6">
                    <span className="font-semibold">초대링크 :</span> {inviteLink}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-lg text-sm font-semibold mt-4"
                  >
                    {copied ? "✅ 복사됨" : "초대 링크 복사하기"}
                  </button>
                </>
              )}
            </div>
          </section>

          {/* ✅ 조직도 출력 */}
          <section className="bg-white rounded-xl shadow overflow-hidden">
            <div className="bg-blue-600 text-white px-3 py-1 font-semibold text-base">
              초대 조직도
            </div>
            <div className="px-3 py-4">
              {treeData.length > 0 ? (
                <pre className="whitespace-pre-wrap text-xs font-mono leading-relaxed">
이름 / 등급                                      가입일
{`\n${renderTreeTable(treeData)}`}
                </pre>
              ) : (
                <p className="text-center text-xs text-gray-400 py-4">초대한 친구가 없습니다.</p>
              )}
            </div>
          </section>
        </div>
        <BottomNav />
      </main>
    </>
  );
}
