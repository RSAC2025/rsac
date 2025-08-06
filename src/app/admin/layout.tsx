import Link from "next/link";
import Providers from "@/components/Providers";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "관리자 페이지",
  description: "ROLLING STONES 관리자 기능",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="w-full max-w-[1280px] mx-auto bg-white min-h-screen p-6">
        <header className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">👑 관리자 페이지</h1>
          <nav className="flex flex-wrap gap-4 text-sm text-blue-600">
            <Link href="/admin">대시보드</Link>
            <Link href="/admin/users">유저관리</Link>
            <Link href="/admin/recommend">추천구조</Link>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </Providers>
  );
}