'use client'
import { MobileNav } from "@/components/mobile-nav";
import { SideNav } from "@/components/side-nav";
import { NavItems } from "@/constants/side-nav";

interface AdminLayoutProps {
  children: React.ReactNode;
}
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex flex-col h-full md:flex-row ">
      <div className="w-[275px] hidden md:block">
        <SideNav items={NavItems} />
      </div>
      <MobileNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
