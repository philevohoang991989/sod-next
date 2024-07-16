"use client";
import Image from "next/image";
import Logo from "@/assets/icons/logo.svg";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import MenuNav from "./menu-nav";

interface AdminLayoutProps {
  children: React.ReactNode;
}
export default function LearningLayout({ children }: AdminLayoutProps) {
  return (
    <div className="overflow-y-hidden">
      <div className="flex w-[100%] bg-primary">
        <div className="container flex gap-[60px] m-w-2xl py-[1rem]">
          <Image src={Logo} alt="logo" />
          <MenuNav />
        </div>
      </div>
      <div className="m-w-2xl overflow-y-hidden">{children}</div>
    </div>
  );
}
