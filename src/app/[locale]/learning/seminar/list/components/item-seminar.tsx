"use client";

import { ENDPOINT } from "@/constants/endpoint";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { cn } from "@/lib/utils";
import { Calculator, Calendar, Timer } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  itemSeminar: any;
  isGrid: boolean;
  aspectRatio?: "portrait" | "square";
}
export default function ItemSeminar({
  itemSeminar,
  aspectRatio,
  isGrid,
}: Props) {
  const [imageSeminar, setImageSeminar] = useState<any>();
  const { data: session } = useSession();
  const axiosAuth = useApiAuth();
  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        await axiosAuth
          .get(ENDPOINT.GET_THUMBNAIL.replace(":id", itemSeminar.thumbnailId))
          .then((res) => {
            setImageSeminar(res.data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    if (itemSeminar.thumbnailId !== null) {
      fetchThumbnail();
    } else {
      setImageSeminar("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSeminar]);
  return (
    <Link
    href={`/learning/seminar/${itemSeminar.id}`}
      className={cn(
        "relative flex w-[100%] p-[1.5rem] rounded-2xl bg-white border border-[#EAECF0] hover:cursor-pointer",
        isGrid
          ? "flex-col max-h-[25rem] gap-6 "
          : "flex-row max-h-[12rem] gap-6"
      )}
    >
      <div className={cn("h-[50%] overflow-hidden rounded-[0.5rem] flex justify-center items-center",
        !isGrid && "w-[200px] h-[100%]"
      )}>
        {imageSeminar && (
          <Image
            src={imageSeminar ?? undefined}
            alt={itemSeminar.seminarName}
            width={0}
            height={0}
            className={cn(
              "h-auto object-cover transition-all hover:scale-105 w-[100%]",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
        )}
      </div>
      <div className="flex flex-col">
      <div className="flex justify-start items-center gap-3">
        <p className="rounded-[6.25rem] bg-[#EBE9FE] py-1 px-3 text-[0.75rem] text-[#5925DC] font-medium">
          {itemSeminar.courseSubject}
        </p>
        <p className="rounded-[6.25rem] bg-[#FFE4E8] py-1 px-3 text-[0.75rem] text-[#C11574] font-medium">
          {itemSeminar.id}
        </p>
      </div>
      <p className="font-medium text-base">{itemSeminar.seminarName}</p>
      <div className="flex gap-2 justify-start flex-wrap xl:flex-row">
        <p className="flex justify-start gap-2 items-center text-base text-[#667085] font-medium">
          <Calendar size={20} />{" "}
          {moment(itemSeminar.heldDate).format("DD/MM/YYYY")}
        </p>
        <p className="flex justify-start gap-2   text-[#667085] font-medium">
          <Timer size={20} />{" "}
          {moment.utc(+(itemSeminar.totalDuration ?? 0)).format("HH:mm:ss")}
        </p>
      </div>
      </div>
    </Link>
  );
}
