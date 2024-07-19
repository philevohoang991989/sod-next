import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    let hls: Hls | null | any = null;
    if (!video && !src) return;
    if ((src.endsWith(".m3u8") || src.endsWith(".m3u") || src.endsWith(".ts"))&& video) {
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

  return (
    <video ref={videoRef} autoPlay />
  );
}
