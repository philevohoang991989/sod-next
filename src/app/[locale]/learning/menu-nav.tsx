"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuNav() {
  const path = usePathname();
  console.log({path});
  
  return (
    <div className="flex gap-4 items-center">
      <Link
        href=""
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "px-4 py-2 rounded-lg text-white",
          path === "/learning/seminar/list" && "bg-[#0F7BB2]"
        )}
      >
        Seminars
      </Link>
      <Link href="" className={cn(
          buttonVariants({ variant: "ghost" }),
          "px-4 py-2 rounded-lg text-white",
          
        )}>
        My Learning
      </Link>
    </div>
  );
}
