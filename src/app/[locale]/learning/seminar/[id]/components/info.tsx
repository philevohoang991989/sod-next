"use client";
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
        <iframe
          width="100%"
          height="350px"
          title="video"
          src={`https://sod-antmedia-137-184-249-221.nip.io/WebRTCAppEE/play.html?id=streams/${infoVideo.streamUrl}.mp4&playOrder=vod`}
        ></iframe>
      )}
    </div>
  );
}
