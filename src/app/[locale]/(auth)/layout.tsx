import Image from "next/image";
import { ReactNode } from "react";
import Logo from "@/assets/icons/logo.svg";
type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div>
      <div className=" flex w-[100%] bg-primary">
        <div className="container m-w-2xl py-[1rem]">
          <Image src={Logo} alt="logo" />
        </div>
      </div>
      {children}
    </div>
  );
}
