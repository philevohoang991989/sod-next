"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Search from "./search";
import Image from "next/image";
import IcFilter from "@/assets/icons/ic_filter.svg";
interface Props {
  setFilter?: (data: any) => void;
  filter?: any;
}
export default function MobileSearch({ setFilter, filter }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className=" md:hidden">
        <Button className="w-[100%] md:w-[5rem] border px-[10px] bg-white border-[#0D6999] rounded-[0.5rem] md:flex items-center gap-2 h-[40px]">
          <div className="flex justify-center items-center gap-2 ">
            {" "}
            <Image src={IcFilter} alt="IcFilter" />
            <span className="font-semibold text-[14px] text-[#344054]">
              Filter
            </span>
          </div>
        </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
      <Search setFilter={setFilter} filter={filter} />
      </SheetContent>
    </Sheet>
  );
}
