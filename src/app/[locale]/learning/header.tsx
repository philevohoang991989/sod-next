import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import BreadcrumbCustom from "./breadcrumb";

interface Props {
  listBreadcrumb: any;
  listBtn: any;
}

export default function Header({ listBreadcrumb, listBtn }: Props) {
  return (
    <div className="bg-white h-[60px] flex items-center">
      <div className="container m-w-2xl flex justify-between">
        <BreadcrumbCustom listBreadcrumb={listBreadcrumb} />
        {listBtn &&
          listBtn.map((item: any, index: number) => {
            return (
              <a
                key={index}
                href={`${item.link}`}
                className="underline leading-6 font-medium text-[14px] text-[#2E90FA]"
              >
                {item.title}
              </a>
            );
          })}
      </div>
    </div>
  );
}
