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
import { useFieldArray, useForm } from "react-hook-form";
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
import { cn, timeStringToMilliseconds } from "@/lib/utils";
import { Plus } from "lucide-react";
import TimeInput from "@/components/TimeInput";
import { useSelector } from "react-redux";
const videoSchema = z.object({
  id: z.number(),
  size: z.number(),
  duration: z.any(),
  videoName: z.string(),
  languageVideoId: z.string(),
  speakers: z.array(z.any()).optional(),
  asTrailer: z.boolean().optional(),
  timeSpanVideos: z
    .array(
      z.object({
        time: z.string({ message: "Please enter a valid time." }),
        description: z.string().optional(),
      })
    )
    .optional(),
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
  timeSpanVideos: [{ time: "0", description: "" }],
};
interface Props {
  infoVideo?: any;
  listTimeSpans?: any;
}

export default function InfoVideo({ infoVideo, listTimeSpans }: Props) {
  const { data: session } = useSession();
  console.log({ infoVideo });
  const seminar = useSelector((state: any) => state.seminar);
  const [listTimeSpan, setList] = useState([]);
  const axiosAuth = useApiAuth();
  const params = useParams();
  const [listLanguageVideos, setListLanguageVideos] = useState([]);
  const [streamUrl, setStreamUrl] = useState<string>("");
  const formInfoVideo = useForm<VideosValues>({
    resolver: zodResolver(videoSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    name: "timeSpanVideos",
    control: formInfoVideo.control,
  });

  useEffect(() => {
    console.log({ idvIdeo: seminar.idVideo });

    try {
      if (infoVideo === undefined && seminar.idVideo !== 0) {
        axiosAuth.get(`Video/${seminar.idVideo}`).then((res) => {
          setStreamUrl(res.data.streamUrl);
          console.log({
            duration: moment(res.data.duration).format("HH:mm:ss"),
          });

          formInfoVideo.reset({
            ...defaultValues,
            id: res.data ? res.data.id : 0,
            size: +((res.data ? res.data.size : 0) / 1024 / 1024).toFixed(2),
            duration: res.data
              ? moment(res.data.duration).format("HH:mm:ss")
              : 0,
            videoName: res.data ? res.data.videoName : "",
            languageVideoId: res.data ? `${res.data.languageVideoId}` : "",
            speakers: res.data ? res.data.speakers : [],
            asTrailer: res.data ? res.data.asTrailer : false,
            timeSpanVideos: listTimeSpans
              ? listTimeSpans.map((x: any) => ({
                  time: moment(x.time).format("HH:mm:ss"),
                  description: x.description, // Assuming x has a description property
                }))
              : listTimeSpan.map((x: any) => ({
                  time: moment(x.time).format("HH:mm:ss"),
                  description: x.description, // Assuming x has a description property
                })),
          });
        });
      } else {
        infoVideo && setStreamUrl(infoVideo?.streamUrl);
        formInfoVideo.reset({
          ...defaultValues,
          id: infoVideo ? infoVideo.id : 0,
          size: +((infoVideo ? infoVideo.size : 0) / 1024 / 1024).toFixed(2),
          duration: infoVideo
            ? moment(infoVideo.duration).format("HH:mm:ss")
            : 0,
          videoName: infoVideo ? infoVideo.videoName : "",
          languageVideoId: infoVideo ? `${infoVideo.languageVideoId}` : "",
          speakers: infoVideo ? infoVideo.speakers : [],
          asTrailer: infoVideo ? infoVideo.asTrailer : false,
          timeSpanVideos: listTimeSpans
            ? listTimeSpans.map((x: any) => ({
                time: moment(x.time).format("HH:mm:ss"),
                description: x.description, // Assuming x has a description property
              }))
            : [],
        });
      }
      listTimeSpans === undefined &&
        session &&
        axiosAuth.get(`video/${seminar.idVideo}/time-span`).then((res) => {
          setList(res.data);
        });
      session &&
        axiosAuth.get(ENDPOINT.GET_LIST_LANGUAGE_VIDEO).then((res) => {
          setListLanguageVideos(res.data);
        });
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Optionally handle specific error cases here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, infoVideo, seminar.idVideo]);

  async function onSubmit(data: z.infer<typeof videoSchema>) {
    console.log({ data });
    const timeSpans: any = data.timeSpanVideos && [...data?.timeSpanVideos];
    timeSpans.forEach((x: any) => (x.time = timeStringToMilliseconds(x.time)));
    console.log({ timeSpans });
    const dataSave: any = {
      ...data,
      speakers: data.speakers,
      asTrailer: data.asTrailer ?? false,
      timeSpanVideos: timeSpans,
    };
    console.log({ dataSave });
    axiosAuth.put(`video/${data.id}`, dataSave).then((res) => {
      console.log({ update: res });
    });
  }

  return (
    <div className="flex w-[100%] justify-between gap-4 flex-col md:flex-row">
      <Form {...formInfoVideo}>
        <form
          onSubmit={formInfoVideo.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mb-4 w-[100%] h-[100%]"
        >
          <div className="w-[100%] relative flex justify-center flex-col lg:flex-row items-center gap-4">
            <div className="w-[100%] h-[100%] relative flex justify-center items-center">
              {streamUrl && (
                <iframe
                  width="100%"
                  height="350px"
                  title="video"
                  src={`https://sod-antmedia-137-184-249-221.nip.io/WebRTCAppEE/play.html?id=streams/${streamUrl}.mp4&playOrder=vod`}
                ></iframe>
              )}
            </div>
            <div className="flex flex-col w-[100%]">
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
                        value={field.value}
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
                    <div className="flex gap-2 items-center mt-2">
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
            </div>
          </div>
          <FormLabel>Timestamps</FormLabel>
          <div className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <div key={index} className="flex gap-4">
                <FormField
                  control={formInfoVideo.control}
                  name={`timeSpanVideos.${index}.time`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TimeInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formInfoVideo.control}
                  name={`timeSpanVideos.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              size="sm"
              className="mt-2 bg-[#F2F4F7] text-[#344054]  flex justify-center items-center gap-2 w-[150px] font-medium hover:bg-[#F2F4F7]"
              onClick={() => append({ time: "", description: "" })}
            >
              <Plus color="#344054" className="h-[20px] w-[20px]" />
              <span className="text-[14px]">Add Timestamps</span>
            </Button>
          </div>
          <div className="flex justify-end items-center gap-3">
            <Button type="submit">Save Video</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
