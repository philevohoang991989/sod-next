"use client";
import VideoPlayer from "@/components/video-player";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface Props {
  infoSeminar: any;
  infoVideo: any;
}
export default function Info({ infoSeminar, infoVideo }: Props) {
  return (
    <div>
      <p className="text-[16px] font-medium text-[#101828]">
        {infoVideo.title}
      </p>
      {infoVideo.streamUrl && (
        <VideoPlayer
          src={`https://sod-antmedia-137-184-249-221.nip.io/WebRTCAppEE/streams/${infoVideo.streamUrl}.m3u8`}
        />
      )}
    </div>
  );
}
