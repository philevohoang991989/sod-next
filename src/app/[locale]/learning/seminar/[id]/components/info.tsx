"use client";
import VideoPlayer from "@/components/video-player";
import { ViewHistoryAddDto } from "@/types";
import moment from "moment";
import { useCookies } from "react-cookie";
interface Props {
  infoSeminar: any;
  infoVideo: any;
  dataHistory: any;
  setDataHistory?: (value: any) => void;
}
export default function Info({
  infoSeminar,
  infoVideo,
  dataHistory,
  setDataHistory,
}: Props) {
  const [cookie] = useCookies(["userId"]);
  // useEffect(() => {
  //   typeof setDataHistory === "function" &&
  //     setDataHistory({
  //       userId: cookie.userId,
  //       seminarId: infoSeminar.id,
  //       videoId: infoVideo.id,
  //       viewDuration: 0,
  //     });
  // }, [infoSeminar, infoVideo]);

  return (
    <div>
      <p className="mb-4 text-[16px] font-medium text-[#101828]">
        {infoVideo.title}
      </p>
      {infoVideo.streamUrl && (
        <VideoPlayer
          src={`https://sod-antmedia-137-184-249-221.nip.io/WebRTCAppEE/streams/${infoVideo.streamUrl}.m3u8`}
          setDataHistory={(values: ViewHistoryAddDto) => {
            typeof setDataHistory === "function" &&
              setDataHistory({
                ...values,
                userId: cookie.userId,
                seminarId: infoSeminar.id,
                videoId: infoVideo.id,
              });
            
          }}
          dataHistory={dataHistory}
        />
      )}
      <div className="mt-[1.5rem] flex flex-col gap-4">
        <div className="flex justify-start gap-2">
          <div className="bg-[#FFE4E8] rounded-[6.25rem] py-1 px-3 text-[12px] text-[#C01048]">
            {infoSeminar?.id}
          </div>
          <div className="rounded-[6.25rem] py-1 px-3 text-[12px] text-[#C4320A] bg-[#FFF6ED]">
            {infoSeminar?.courseSubject}
          </div>
        </div>
        <div className="font-semibold text-[20px] text-[#101828]">
          {infoSeminar?.seminarName}
        </div>
        <div className="flex justify-start gap-1">
          <span className="text-[#667085] text-[14px]">Course Held Date:</span>
          <span className="text-[#344054] text-[14px]">
            {moment(infoSeminar?.heldDate).format("DD/MM/YYYY")}
          </span>
        </div>
      </div>
      <div className="flex justify-start gap-2 items-center">
        <span>Speaker(s):</span>
        <div className="flex justify-start gap-3 items-center">
          {infoVideo && infoVideo.speakers && infoVideo.speakers.length > 0
            ? infoVideo.speakers.map((item: any, index: number) => {
                return (
                  <span
                    key={index}
                    className="text-[#175CD3] text-[12px] py-1 px-3 rounded-[6.25rem] bg-[#EBF5FF] font-medium"
                  >
                    {item.fullName}
                  </span>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
