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
}

const TimeInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, "");

    if (val.length >= 2) val = val.slice(0, 2) + ":" + val.slice(2);
    if (val.length >= 5) val = val.slice(0, 5) + ":" + val.slice(5, 7);
    console.log({ val });

    setInputValue(val);
    onChange(val);
  };

  return (
    <Input
      value={inputValue}
      onChange={handleInputChange}
      placeholder="HH:mm:ss"
    />
  );
};
export default function InfoVideo({ infoVideo }: Props) {
  const { data: session } = useSession();
  const axiosAuth = useApiAuth();
  const params = useParams();
  const [listLanguageVideos, setListLanguageVideos] = useState([]);
  const [listTimeSpans, setlistTimeSpans] = useState([]);
  const formInfoVideo = useForm<VideosValues>({
    resolver: zodResolver(videoSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    name: "timeSpanVideos",
    control: formInfoVideo.control,
  });

  useEffect(() => {
    try {
      session &&
        infoVideo &&
        infoVideo.id &&
        axiosAuth.get(`video/${infoVideo.id}/time-span`).then((res) => {
          console.log(res);
          setlistTimeSpans(res.data);
        });
      formInfoVideo.reset({
        ...defaultValues,
        id: infoVideo ? infoVideo.id : 0,
        size: +((infoVideo ? infoVideo.size : 0) / 1024 / 1024).toFixed(2),
        duration: infoVideo
          ? moment.utc(+infoVideo.duration, "HH:mm:ss").format("HH:mm:ss")
          : 0,
        videoName: infoVideo ? infoVideo.videoName : "",
        languageVideoId: infoVideo ? `${infoVideo.languageVideoId}` : "",
        speakers: infoVideo ? infoVideo.speakers : [],
        asTrailer: infoVideo ? infoVideo.asTrailer : false,
        timeSpanVideos: listTimeSpans
        ? listTimeSpans.map((x: any) => ({
            time: moment(x.time).format("HH:mm:ss"),
            description: x.description // Assuming x has a description property
          }))
        : []
      });

      session &&
        axiosAuth.get(ENDPOINT.GET_LIST_LANGUAGE_VIDEO).then((res) => {
          setListLanguageVideos(res.data);
        });
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Optionally handle specific error cases here
    }
  }, [session, infoVideo]);

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
  console.log('watchtimeSpanVideos',formInfoVideo.watch('timeSpanVideos'));
  
  return (
    <div className="flex justify-between gap-4 flex-col md:flex-row">
      <Form {...formInfoVideo}>
        <form
          onSubmit={formInfoVideo.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mb-4 w-[100%] h-[100%]"
        >
          <div className="w-[100%] relative flex justify-center items-center gap-4">
            <div className="w-[100%] h-[100%] relative flex justify-center items-center">
              {infoVideo?.streamUrl && (
                <iframe
                  width="100%"
                  height="auto"
                  title="video"
                  src={`https://sod-antmedia-137-184-249-221.nip.io/WebRTCAppEE/play.html?id=streams/${infoVideo?.streamUrl}.mp4&playOrder=vod`}
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
