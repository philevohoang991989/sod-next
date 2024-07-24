import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { watchFull, watchSeek } from "@/lib/utils";
import { VideoWatchPercent } from "@/constants";

export default function VideoPlayer({ src,setDataHistory,dataHistory }: { src: string,setDataHistory?:(value : any)=>void,dataHistory: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const [logTracking, setLogTracking] = useState<Set<number>>(
    new Set<number>()
  );
  useEffect(() => {
    setLogTracking(new Set<number>());
  }, [src]);
  
  useEffect(() => {
    const video = videoRef.current;
    let hls: Hls | null | any = null;
    if (!video && !src) return;
    if (
      (src.endsWith(".m3u8") || src.endsWith(".m3u") || src.endsWith(".ts")) &&
      video
    ) {
      // HLS stream detected
      if (Hls.isSupported()) {
        if (hls) {
          hls.destroy();
        }
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.currentTime = 0;
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.currentTime = 0;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      }
    } else if (src.endsWith(".mp4") && video) {
      video.src = src;
      video.currentTime = 0;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    } else {
      console.error("Unsupported video format");
    }
    playerRef.current = video && new Plyr(video, {});
  }, [src]);
  const onTimeUpdate = () => {
    if (!videoRef.current) {
      return;
    }

   
    const timeSecond = videoRef.current.currentTime;
    if (timeSecond > 0 && !logTracking.has(timeSecond)) {
      setLogTracking((prevLogTracking) => {
        const newLogTracking = new Set(prevLogTracking);
        newLogTracking.add(timeSecond);
        return newLogTracking;
      });
    }

    const duration = videoRef.current.duration ?? 0;
    const endVideo = videoRef.current.currentTime === duration;

    if (endVideo && watchFull(logTracking, duration)) {
      console.log("full", watchFull(logTracking, duration));
      typeof setDataHistory === 'function' && setDataHistory({
        ...dataHistory,
        viewDuration: videoRef.current.currentTime * 1000
      })
    } else if(endVideo){
      console.log("watchSeek");
    }
  };

  return <video ref={videoRef} autoPlay onTimeUpdate={() => onTimeUpdate()} />;
}
