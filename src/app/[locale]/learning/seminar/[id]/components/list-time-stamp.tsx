"use client";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function ListTimestamp() {
  const { data: session } = useSession();
  const axiosAuth = useApiAuth();
  const learning = useSelector((state: any) => state.learning);
  const [listTimestamp, setListTimestamp] = useState<any>([]);
  useEffect(() => {
    session &&
      axiosAuth.get(`video/${learning.idVideo}/time-span`).then((res) => {
        setListTimestamp(res.data);
      });
  }, [learning.idVideo, session]);
  return (
    <div className="flex flex-col gap-2">
        <div className="mb-[1rem]">
        <p className="text-[1rem] font-semibold text-[#292D32]">Timestamp</p></div>
      {(listTimestamp &&
        listTimestamp.length) ?
        listTimestamp.map((item: any, index: number) => {
          return (
            <div key={index}>
              <span className="font-medium text-[14px] text-[#101828]">
                {item.description}
              </span>
              <div className="font-medium text-[14px] text-[#667085]">
                {index === 0
                  ? "00:00:00"
                  : listTimestamp.length === index + 1
                  ? moment
                      .utc(+(listTimestamp[index].time ?? 0))
                      .format("HH:mm:ss")
                  : moment
                      .utc(+(listTimestamp[index - 1].time + 1000 ?? 0))
                      .format("HH:mm:ss")}
                -
                {index === 0
                  ? moment
                      .utc(+(listTimestamp[index].time ?? 0))
                      .format("HH:mm:ss")
                  : listTimestamp[index + 1] !== undefined
                  ? moment
                      .utc(+(listTimestamp[index + 1].time - 1000 ?? 0))
                      .format("HH:mm:ss")
                  : moment
                  .utc(+(learning.duration)).format("HH:mm:ss")}
              </div>
            </div>
          );
        }):''}
    </div>
  );
}
