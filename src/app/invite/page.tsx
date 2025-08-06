"use client";

import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { supabase } from "@/lib/supabaseClient";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { ClipboardCopy } from "lucide-react";

interface User {
  ref_code: string;
  ref_by: string | null;
  name: string;
  created_at: string;
}

interface UserNode extends User {
  children: UserNode[];
}

export default function InvitePage() {
  const account = useActiveAccount();
  const [refCode, setRefCode] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [tree, setTree] = useState<UserNode | null>(null);

  // ✅ 초대코드 로드
  useEffect(() => {
    const loadRefCode = async () => {
      if (!account?.address) return;

      const { data, error } = await supabase
        .from("users")
        .select("ref_code")
        .eq("wallet_address", account.address.toLowerCase())
        .single();

      if (data?.ref_code) {
        setRefCode(data.ref_code);
        setInviteLink(`http://localhost:3000/invite/${data.ref_code}`);
      }
    };
    loadRefCode();
  }, [account]);

  // ✅ 전체 유저 로드 + 트리 빌드
  useEffect(() => {
    const fetchAndBuildTree = async () => {
      if (!refCode) return;

      const { data: users } = await supabase
        .from("users")
        .select("ref_code, ref_by, name, created_at");

      if (users) {
        const treeData = buildUserTree(users, refCode);
        setTree(treeData);
      }
    };
    fetchAndBuildTree();
  }, [refCode]);

  // ✅ 트리 생성 함수 (무한 재귀 방지 포함)
  function buildUserTree(
    users: User[],
    rootRefCode: string,
    visited = new Set<string>()
  ): UserNode {
    if (visited.has(rootRefCode)) {
      return {
        ref_code: rootRefCode,
        ref_by: null,
        name: "(순환 참조)",
        created_at: "",
        children: [],
      };
    }

    visited.add(rootRefCode);

    const rootUser = users.find((u) => u.ref_code === rootRefCode);
    if (!rootUser) {
      return {
        ref_code: rootRefCode,
        ref_by: null,
        name: "(사용자 없음)",
        created_at: "",
        children: [],
      };
    }

    const children = users
      .filter((u) => u.ref_by === rootRefCode)
      .map((child) => buildUserTree(users, child.ref_code, new Set(visited)));

    return { ...rootUser, children };
  }

  // ✅ 재귀적으로 레그 표시
function renderTree(
  node: UserNode,
  prefix: string = "",
  isLast: boolean = true
): React.ReactElement {
  const hasChildren = node.children.length > 0;
  const branchSymbol = prefix ? (isLast ? "└─ " : "├─ ") : "";
  const childPrefix = prefix + (isLast ? "   " : "│  ");

  return (
    <div key={node.ref_code}>
      <div className="font-mono ml-2 text-sm">
        {prefix}
        {branchSymbol}
        {node.name} ({node.ref_code})
      </div>
      {node.children.map((child, index) =>
        renderTree(child, childPrefix, index === node.children.length - 1)
      )}
    </div>
  );
}


  return (
    <div className="min-h-screen bg-[#e5f3f7]">
      <TopBar title="초대하기" />
      <div className="p-4 space-y-6">
        <div className="bg-white rounded-xl shadow p-4 border-2 border-blue-600">
          <div className="text-blue-600 font-bold mb-2">나의 초대 코드</div>
          <div className="text-sm">초대코드 : {refCode}</div>
          <div className="text-sm">초대링크 : {inviteLink}</div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(inviteLink);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="mt-2 w-full bg-blue-100 text-blue-700 py-2 rounded hover:bg-blue-200 flex items-center justify-center gap-2"
          >
            <ClipboardCopy size={16} />
            {copied ? "복사됨!" : "초대 링크 복사하기"}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-4 border-2 border-blue-600">
          <div className="text-blue-600 font-bold mb-2">나의 초대 친구</div>
          {tree ? renderTree(tree) : <p className="text-sm">불러오는 중...</p>}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
