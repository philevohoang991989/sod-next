"use client";
import PageLayout from "@/components/PageLayout";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ListVideo from "../../list_video";
import InfoVideo from "../../../video/info-video";

export default function VideosOfSeminar() {
  const axiosAuth = useApiAuth();
  const { id } = useParams();
  const { data: session } = useSession();
  const [listVideos, setListVideos] = useState([]);
  useEffect(() => {
    session &&
      axiosAuth.get(`seminar/${id}/videos`).then((res) => {
        setListVideos(res.data);
      });
  }, [session]);
  return (
    <PageLayout title="All Video">
      <div className="flex flex-col lg:flex-row justify-start rounded-2xl bg-white border-[1px] border-[#D0D5DD]">
        <ListVideo listVideos={listVideos} />
        <div className="p-4 w-[100%]">
        <InfoVideo/>
        </div>
      </div>
      
    </PageLayout>
  );
}
