'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gift, Users, User } from "lucide-react";
import { BookOpen } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="relative">
      {/* ✅ 이 부분이 실제 고정되도록 내부 요소에 적용 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-14 text-xs text-gray-500">
          <Link href="/home" className="flex flex-col items-center">
            <Home size={20} className={isActive("/home") ? "text-blue-600" : "text-gray-400"} />
            <span className={isActive("/home") ? "text-blue-600" : "text-gray-400"}>홈</span>
          </Link>
<Link href="/learn" className="flex flex-col items-center">
  <BookOpen size={20} className={isActive("/learn") ? "text-blue-600" : "text-gray-400"} />
  <span className={isActive("/learn") ? "text-blue-600" : "text-gray-400"}>학습</span>
</Link>
          <Link href="/invite" className="flex flex-col items-center">
            <Users size={20} className={isActive("/invite") ? "text-blue-600" : "text-gray-400"} />
            <span className={isActive("/invite") ? "text-blue-600" : "text-gray-400"}>친구초대</span>
          </Link>
          <Link href="/mypage" className="flex flex-col items-center">
            <User size={20} className={isActive("/mypage") ? "text-blue-600" : "text-gray-400"} />
            <span className={isActive("/mypage") ? "text-blue-600" : "text-gray-400"}>마이페이지</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
