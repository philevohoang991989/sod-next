"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/subnav-accordion";
import { useEffect, useState } from "react";
import { useSidebar } from "@/lib/hook/useSidebar";
import Image from "next/image";
import Logo from "@/assets/icons/logo.svg";
import { ChevronDown } from "lucide-react";
import { NavItem } from "@/types";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div className="md:flex bg-[#0A4F73] h-full w-[100%]">
      <nav className="px-[20px] py-[24px] w-full">
        <div className="pb-[2rem]">
          {" "}
          <Image src={Logo} alt="Logo" />
        </div>
        {items.map((item) =>
          item.isChidren ? (
            <Accordion
              type="single"
              collapsible
              className="space-y-2"
              key={item.title}
              value={openItem}
              onValueChange={setOpenItem}
            >
              <AccordionItem value={item.title} className="border-none ">
                <AccordionTrigger
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "group relative flex h-12 justify-between px-4 py-2 text-[#B4D1DF] duration-200 hover:bg-[#083F5C] hover:no-underline",
                    path.includes(item.href) &&
                      "bg-[#083F5C] font-bold  text-white"
                  )}
                >
                  <div>
                    <item.icon className={cn("h-5 w-5", item.color)} />
                  </div>
                  <div
                    className={cn(
                      "absolute left-12 text-[#B4D1DF] duration-200 ",
                      !isOpen && className
                    )}
                  >
                    {item.title}
                  </div>

                  {isOpen && (
                    <ChevronDown className="h-6 w-6 shrink-0 text-[#B4D1DF] transition-transform duration-200" />
                  )}
                </AccordionTrigger>
                <AccordionContent className="mt-2 space-y-4 pb-1">
                  {item.children?.map((child) => (
                    <Link
                      key={child.title}
                      href={child.href}
                      onClick={() => {
                        if (setOpen) setOpen(false);
                      }}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "group relative flex h-12 justify-start gap-x-3 hover:bg-transparent hover:text-white",
                        path === child.href && "font-bold  text-white"
                      )}
                    >
                      <child.icon
                        className={cn(
                          "h-5 w-5 ",
                          path === item.href ? "text-white" : "text-[#B4D1DF]"
                        )}
                        color={`${
                          path === item.href ? "text-white" : "text-[#B4D1DF]"
                        }`}
                      />
                      <div
                        className={cn(
                          "absolute left-12 text-[#B4D1DF] duration-200 hover:bg-transparent hover:text-white",
                          path === child.href && "font-bold  text-white",
                          !isOpen && className
                        )}
                      >
                        {child.title}
                      </div>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "group relative flex h-12 justify-start hover:bg-[#083F5C] hover:text-white",
                path === item.href && "bg-[#083F5C] font-bold  text-white"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 hover:text-white",
                  path === item.href ? "text-white" : "text-[#B4D1DF]"
                )}
              />
              <span
                className={cn(
                  "absolute left-12 text-[#B4D1DF] duration-200 hover:text-white",
                  !isOpen && className
                )}
              >
                {item.title}
              </span>
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
