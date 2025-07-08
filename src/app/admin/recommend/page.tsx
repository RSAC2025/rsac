"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface User {
  name: string;
  ref_code: string;
  ref_by: string | null;
  center_id: string;
}

interface TreeNode {
  user: User;
  children: TreeNode[];
}

export default function ReferralTreePage() {
  const [centerTrees, setCenterTrees] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: users } = await supabase
        .from("users")
        .select("name, ref_code, ref_by, center_id");

      if (!users) return;

      const userMap: Record<string, TreeNode> = {};
      users.forEach((u) => {
        userMap[u.ref_code] = { user: u, children: [] };
      });

      // 추천 연결 구성 (무한 루프 방지를 위해 자기 참조 방지)
      users.forEach((u) => {
        if (
          u.ref_by &&
          u.ref_by !== u.ref_code &&
          userMap[u.ref_by] &&
          userMap[u.ref_by] !== userMap[u.ref_code]
        ) {
          userMap[u.ref_by].children.push(userMap[u.ref_code]);
        }
      });

      // 센터 ID에 해당하는 유저(ref_code)를 루트로 간주
      const roots: TreeNode[] = [];
      users.forEach((u) => {
        if (u.ref_code === u.center_id) {
          roots.push(userMap[u.ref_code]);
        }
      });

      setCenterTrees(roots);
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderTree = (node: TreeNode, depth = 0) => {
    if (depth > 20) return <div className="text-red-500">⛔️ 트리 깊이 제한 초과</div>; // 안전 장치
    return (
      <div key={node.user.ref_code} className="relative pl-4 border-l border-gray-300 ml-2">
        <div className="py-1 pl-2 relative before:absolute before:left-0 before:top-2 before:w-2 before:border-t before:border-gray-300">
          <span className="font-medium text-sm">
            {node.user.name} ({node.user.ref_code})
          </span>
        </div>
        <div className="ml-4">
          {node.children.map((child) => renderTree(child, depth + 1))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🏢 센터 기반 추천 구조</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="space-y-6">
          {centerTrees.map((root) => (
            <div key={root.user.ref_code} className="border-l-4 border-blue-500 pl-4">
              <p className="text-md font-bold text-blue-700 mb-2">
                센터장: {root.user.name} ({root.user.ref_code})
              </p>
              {renderTree(root)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
