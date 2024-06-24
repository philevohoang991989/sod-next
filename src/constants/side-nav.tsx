import { NavItem } from "@/types";
import { BookOpenCheck, Edit, File, FileUp, LayoutDashboard } from "lucide-react";

export const NavItems: NavItem[] = [
  {
    title: "Create",
    icon: Edit,
    href: "/seminar/create",
    color: "text-[#B4D1DF]",
  },
  {
    title: "Upload",
    icon: FileUp,
    href: "/upload",
    color: "text-sky-500",
  },
  {
    title: "Browse",
    icon: File,
    href: "/browse",
    color: "text-[#B4D1DF]",
    isChidren: true,
    children: [
      {
        title: "Course",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/browse/course",
      },
      {
        title: "Seminar",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/browse/seminar",
      },
      {
        title: "Video",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/browse/video",
      },
    ],
  },
];
