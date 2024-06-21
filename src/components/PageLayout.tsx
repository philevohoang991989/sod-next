import { useTranslations } from "next-intl";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageLayout({ children, title }: Props) {
  const t = useTranslations("PageLayout");

  return (
    <div className="relative flex flex-col bg-slate-850">
      <div className="flex w-[100%] h-[88px] bg-white items-center p-[32px] font-semibold text-[1.5rem] text-[#101828]">
        {title}
      </div>
      <div className="p-[2rem]">{children}</div>
    </div>
  );
}
