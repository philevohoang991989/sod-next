"use client";
import PageLayout from "@/components/PageLayout";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InfoVideo from "../../info-video";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DeltePopup } from "../../../seminar/components/popup-delete";

export default function EditAllVideo() {
  const axiosAuth = useApiAuth();
  const seminar = useSelector((state: any) => state.seminar);
  const [listInfoVideo, setListInfoVideo] = useState([]);
  const [listTimeSpans, setListTimeSpans] = useState([]);
  const [infoVideo, setInfoVideo] = useState();
  useEffect(() => {
    const fetchVideoInfo = async () => {
      const promises = seminar.listVideoUpload.map((video: any) =>
        axiosAuth.get(`Video/${video}`)
      );
      try {
        const results = await Promise.all(promises);
        const videoInfo: any = results.map((res) => res.data);
        setListInfoVideo(videoInfo);
      } catch (error) {
        console.error("Error fetching video info:", error);
      }
    };

    fetchVideoInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seminar.listVideoUpload]);

  return (
    <PageLayout title="Edit Videos">
      <div className="flex flex-col lg:flex-row bg-white rounded-[0.5rem]">
        <RadioGroup className="flex w-[100%] lg:w-[50%] flex-col gap-3 border-r-none lg:border-r-[1px] border-r-[#D0D5DD]">
          <div className="p-[1.5rem] flex flex-col gap-3">
            <div className="text-[18px] font-medium text-[#667085]">
              List Video Upload
            </div>
            {listInfoVideo.map((item: any) => (
              <div key={item.id} className="item">
                <RadioGroupItem
                  value={`${item.id}`}
                  id={`${item.id}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`${item.id}`}
                  className="flex items-center justify-between rounded-md border-[1px] border-[#D0D5DD] bg-white p-4 hover:bg-[#EFF8FF] hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#EFF8FF] [&:has([data-state=checked])]:border-primary"
                  onClick={() => {
                    setInfoVideo(item);
                    axiosAuth.get(`video/${item.id}/time-span`).then((res) => {
                      setListTimeSpans(res.data);
                    });
                  }}
                >
                  <div className="text-[14px] font-medium text-[#101828]">
                    {item.videoName}
                  </div>
                  <DeltePopup
                    idItem={item.id}
                    title="Are you sure you want to remove this Video?"
                    message=""
                    handleOk={() => {
                      // handleDelete(item);
                    }} 
                  />
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        <div className="p-6 w-[100%] lg:w-[50%]">
          <InfoVideo infoVideo={infoVideo} listTimeSpans={listTimeSpans} />
        </div>
      </div>
    </PageLayout>
  );
}
