import { Loader } from "lucide-react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="absolute top-[72px] flex justify-center items-center left-0 z-40 bg-black opacity-10 w-[100vw] h-[100vh]">
        <Loader className="z-50" />
    </div>
  }