"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ENDPOINT } from "@/constants/endpoint";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TagsInput from "./TagsInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import moment from "moment";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
const videoSchema = z.object({
  id: z.number(),
  size: z.number(),
  duration: z.any(),
  videoName: z.string(),
  languageVideoId: z.string(),
  speakers: z.array(z.any()).optional(),
  asTrailer: z.boolean().optional(),
});
type VideosValues = z.infer<typeof videoSchema>;
const defaultValues: Partial<VideosValues> = {
  id: 0,
  size: 0,
  duration: 0,
  videoName: "",
  languageVideoId: "",
  speakers: [],
  asTrailer: false,
};
interface Props{
    infoVideo?: any
}
export default function InfoVideo({infoVideo}:Props) {
  const { data: session } = useSession();
  const axiosAuth = useApiAuth();
  const params = useParams();
  const [listLanguageVideos, setListLanguageVideos] = useState([]);

  useEffect(() => {
    try {formInfoVideo.reset({
          ...defaultValues,
          id: infoVideo? infoVideo.id: 0,
          size: +((infoVideo ?infoVideo.size : 0) / 1024 / 1024).toFixed(2),
          duration: infoVideo?moment.utc(+( infoVideo.duration), "HH:mm:ss").format("HH:mm:ss"):0,
          videoName: infoVideo? infoVideo.videoName: "",
          languageVideoId:infoVideo? `${infoVideo.languageVideoId}`:"",
          speakers: infoVideo? infoVideo.speakers: [],
          asTrailer: infoVideo? infoVideo.asTrailer: false,
        });
      
      session &&
        axiosAuth.get(ENDPOINT.GET_LIST_LANGUAGE_VIDEO).then((res) => {
          setListLanguageVideos(res.data);
        });
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Optionally handle specific error cases here
    }
  }, [ session,infoVideo]);
  const formInfoVideo = useForm<VideosValues>({
    resolver: zodResolver(videoSchema),
    defaultValues,
  });
  async function onSubmit(data: z.infer<typeof videoSchema>) {
    console.log({ data });
  }
  return (
    <div className="flex justify-between gap-4 flex-col md:flex-row">
        <div className="w-[100%] relative flex justify-center items-center">
        {infoVideo?.streamUrl && <iframe
          width="100%"
          height="100%"
          title="video"
          src={`https://sod-antmedia-137-184-249-221.nip.io/WebRTCAppEE/play.html?id=streams/${infoVideo?.streamUrl}.mp4&playOrder=vod`}
        ></iframe>}
        </div>
     
      <Form {...formInfoVideo}>
        <form
          onSubmit={formInfoVideo.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mb-4 w-[100%] h-[100%]"
        >
          <div className="flex justify-center gap-4">
            <FormField
              control={formInfoVideo.control}
              name="size"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>File Size (MB)*</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="File Size" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={formInfoVideo.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>Duration*</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="File Size" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={formInfoVideo.control}
            name="videoName"
            render={({ field }) => (
              <FormItem className="w-[100%]">
                <FormLabel>Video Title</FormLabel>
                <FormControl>
                  <Input placeholder="Video Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={formInfoVideo.control}
            name="languageVideoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Broadcast Language</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Not specified" />
                    </SelectTrigger>
                    <SelectContent>
                      {listLanguageVideos.map((item: any) => {
                        return (
                          <SelectItem key={item.id} value={`${item.id}`}>
                            {item.language}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Speaker(s)</FormLabel>
            <TagsInput
              control={formInfoVideo.control}
              listSpeakers={infoVideo?.speakers}
              name="speakers"
            />
          </div>
          <FormField
            control={formInfoVideo.control}
            name="asTrailer"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 items-center">
                  {" "}
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="airplane-mode" className="text-[#101828]">
                    Mark this as trailer
                  </Label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center gap-3">
            <Button type="submit">Apply</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
