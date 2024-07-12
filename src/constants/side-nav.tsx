import { NavItem } from "@/types";
import { Book, BookOpenCheck, Edit, File, FileUp, User } from "lucide-react";

export const NavItems: NavItem[] = [
  {
    title: "Create",
    icon: Edit,
    href: "/browse/seminar/create",
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
        href: "/browse/course/list",
      },
      {
        title: "Seminar",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/browse/seminar/list",
      },
      {
        title: "Video",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/browse/video/list",
      },
    ],
  },
  {
    title: "Administration",
    icon: User   ,
    href: "/administration",
    color: "text-[#B4D1DF]",
    isChidren: true,
    children: [
      {
        title: "Users Permission",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/administration/user-permission/list",
      },
      {
        title: "Resolution Control",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/administration/resolution/list",
      },
      {
        title: "Division Control",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/administration/division/list",
        
      },
      {
        title: "Audit Log",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/administration/audit-log/list",
        
      }
    ],
  },
  {
    title: "Report",
    icon: Book,
    href: "/report",
    color: "text-sky-500",
  },
];
