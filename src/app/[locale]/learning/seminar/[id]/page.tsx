/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from "react";
import Header from "../../header";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCookies } from "react-cookie";
import { forkJoin } from "rxjs";
import { InfoVideoUser } from "@/types";

export default function DetailSemianr() {
  const [cookie, setCookie] = useCookies(["userId"]);
  const {data: session} = useSession()
  const axiosAuth = useApiAuth()
  const params = useParams()
  const [infoSemiar,setInfoSeminar] = useState()
  const [listVideo,setListVideo] = useState()
  const getInfoSeminar=()=>{
    session && axiosAuth.get(`Seminar/${params.id}/user`).then((res: any)=>{
      setInfoSeminar(res.data)
    })
  }
  const getListVideos=async()=> {
    try {
      if (session) {
        const [videoSeminarUserResponse, viewHistoryResponse] = await Promise.all([
          axiosAuth.get(`Seminar/${params.id}/learning`),
          axiosAuth.get(`ViewHistory/${cookie.userId}/${params.id}`)
        ]);

        const videoSeminarUser = videoSeminarUserResponse.data;
        const viewHistory = viewHistoryResponse.data;

        const listVideo = videoSeminarUser.map((element:InfoVideoUser) => {
          let history = viewHistory.find((x: any) => x.videoId === element.id);
          element.viewedAll = history
            ? Math.floor(history.viewDuration / history.videoDuration) >= 1
            : false;
          return element;
        });

        setListVideo(listVideo);
        // this.itemChange = res.videoSeminarUser[0];
        // this.idItemSelected = res.videoSeminarUser[0].id;
        // this.idVideoChange = res.videoSeminarUser[0].id;
        // this.infoVideo = res.videoSeminarUser[0];
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
  useEffect(()=>{
    getInfoSeminar();
    getListVideos()
  },[session])
  console.log({listVideo});
  
  return (
    <div>
      <Header
        listBreadcrumb={[
          {
            title: "Home",
            link: "/learning",
          },
          {
            title: "Seminar",
            link: "/learning/seminar/list",
          },
        ]}
        listBtn={[{
          title: "Check Course Details",
          link: "#",
        }]}
      />
      <div className="container m-w-2xl">dfsdfsd</div>
    </div>
  );
}
