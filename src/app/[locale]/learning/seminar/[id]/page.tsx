/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Header from "../../header";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCookies } from "react-cookie";
import { InfoVideoUser } from "@/types";
import HeaderListVideo from "./components/header-list-video";
import { useDispatch, useSelector } from "react-redux";
import { updateDuration, updateIdVideo, updateInfoVideo } from "@/redux/slices/learningSlice";
import ItemVideo from "./components/item-video";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ListTimestamp from "./components/list-time-stamp";

export default function DetailSemianr() {
  const learning = useSelector((state: any) => state.learning);
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(["userId"]);
  const [isHide, setIsHide] = useState<boolean>(false);
  const { data: session } = useSession();
  const axiosAuth = useApiAuth();
  const params = useParams();
  const [infoSeminar, setInfoSeminar] = useState<any>({});
  const [listVideo, setListVideo] = useState<any>();
  const getInfoSeminar = () => {
    session &&
      axiosAuth.get(`Seminar/${params.id}/user`).then((res: any) => {
        setInfoSeminar(res.data);
      });
  };
  const getListVideos = async () => {
    try {
      if (session) {
        const [videoSeminarUserResponse, viewHistoryResponse] =
          await Promise.all([
            axiosAuth.get(`Seminar/${params.id}/learning`),
            axiosAuth.get(`ViewHistory/${cookie.userId}/${params.id}`),
          ]);

        const videoSeminarUser = videoSeminarUserResponse.data;
        const viewHistory = viewHistoryResponse.data;

        const listVideo = videoSeminarUser.map((element: InfoVideoUser) => {
          let history = viewHistory.find((x: any) => x.videoId === element.id);
          element.viewedAll = history
            ? Math.floor(history.viewDuration / history.videoDuration) >= 1
            : false;
          return element;
        });

        setListVideo(listVideo);
        dispatch(updateIdVideo(listVideo[0].id));
        dispatch(updateInfoVideo(videoSeminarUser[0]));
        // this.idItemSelected = res.videoSeminarUser[0].id;
        // this.idVideoChange = res.videoSeminarUser[0].id;
        // this.infoVideo = res.videoSeminarUser[0];
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    getInfoSeminar();
    getListVideos();
  }, [session]);
  console.log({ listVideo });

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
        listBtn={[
          {
            title: "Check Course Details",
            link: "#",
          },
        ]}
      />
      <div className="container m-w-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8 ">
          <div className="col-span-1 lg:col-span-3 bg-white p-4 rounded-xl">
            asddsa
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-xl">
              <HeaderListVideo
                infoSeminar={infoSeminar}
                listVideo={listVideo}
                isHide={isHide}
                setIsHide={(value: boolean) => setIsHide(value)}
              />
              <div className="flex flex-col gap-2">
                <RadioGroup
                  defaultValue={
                    learning && learning.idVideo && `${learning.idVideo}`
                  }
                  className="flex flex-col gap-3"
                >
                  {listVideo &&
                    listVideo.map((item: any, index: number) => {
                      return <ItemVideo key={index} itemVideo={item} />;
                    })}
                </RadioGroup>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <ListTimestamp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
