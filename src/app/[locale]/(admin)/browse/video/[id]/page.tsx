"use client";
import PageLayout from "@/components/PageLayout";
import InfoVideo from "../info-video";
import { useSession } from "next-auth/react";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetailVideo() {
  const { data: session } = useSession();
  const params = useParams();
  const [infoVideo, setInfoVideo] = useState<any>();
  const [listTimeSpans, setListTimeSpans] = useState([]);
  const axiosAuth = useApiAuth();
  useEffect(() => {
    try {
      const res = session && axiosAuth.get(`Video/${params.id}`);
      res?.then((res) => {
        setInfoVideo(res.data);
      });
      session &&
        axiosAuth.get(`video/${params.id}/time-span`).then((res) => {
          setListTimeSpans(res.data);
        });
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Optionally handle specific error cases here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, session]);
  return (
    <PageLayout
      title={infoVideo ? `${infoVideo?.videoName}` : ""}
      btnBack={true}
      link="/browse/video/list"
    >
      <div className="bg-white p-[20px] rounded-[0.5rem]">
        <InfoVideo infoVideo={infoVideo} listTimeSpans={listTimeSpans} />
      </div>
    </PageLayout>
  );
}
