/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Observable, Subscriber } from "rxjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Upload from "@/assets/icons/upload.svg";
import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { ENDPOINT } from "@/constants/endpoint";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment";
import { cn, convertToBase64 } from "@/lib/utils";
import { ArrowUpDown, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";

type Props = {
  idSeminar?: any;
  idCourse?: any;
  idClass?: any;
  defaultSeminar?: any;
};

const seminarFormSchema = z.object({
  id: z.number(),
  seminarName: z.string().min(1, {
    message: "This is required field!",
  }),
  isPublishNow: z.boolean(),
  isActive: z.boolean(),
  isRightToICU: z.boolean(),
  isBelongHRMS: z.boolean(),
  courseId: z.number(),
  publishStart: z.date().optional(),
  publishEnd: z.date().optional(),
  divisionId: z.string().min(1, {
    message: "This is required field!",
  }),
  remark: z.string(),
  thumbnailId: z.number().optional(),
  images: z.string().url().optional(),
});

type SeminarCourseFormValues = z.infer<typeof seminarFormSchema>;

export default function InfoSeminar() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const seminar = useSelector((state: any) => state.seminar);
  const [file, setFile] = useState<File | null>(null);
  const { data: session } = useSession();
  const params: any = useParams();
  const axiosAuth = useAxiosAuth();
  const [listDivision, setListDivision] = useState([]);
  const [datathumnail, setDatathumnail] = useState<string>("");
  const [imageSeminar, setImageSeminar] = useState<any>();
  const [listVideo, setListVideo] = useState<any>([]);

  interface ItemVideo {
    email?: string;
    fullName?: string;
    id?: number;
    title?: string;
  }
  interface VideoType {
    title?: string;
    speakers: ItemVideo[];
  }

  const defaultValues: Partial<SeminarCourseFormValues> = {
    id: 0,
    seminarName: "",
    isPublishNow: false,
    isActive: false,
    isRightToICU: false,
    isBelongHRMS: false,
    courseId: 0,
    publishStart: undefined,
    publishEnd: undefined,
    divisionId: "",
    remark: "",
    thumbnailId: 0,
    images: "",
  };
  const form = useForm<SeminarCourseFormValues>({
    resolver: zodResolver(seminarFormSchema),
    defaultValues,
  });
  // const image = form.watch("thumbnailId");
  const getSeminarData = (data: any) => {
    const value = form.getValues;

    return {
      id: 0,
      courseId: seminar.idCourse,
      classId: seminar.idClass,
      seminarName: data.seminarName ?? "",
      isActive: data.isActive ?? false,
      isPublishNow: data.isPublishNow ?? false,
      isRightToICU: data.isRightToICU ?? false,
      isBelongHRMS: data.isBelongHRMS ?? false,
      divisionId: parseInt(data.divisionId),
      publishStart: data.publishStart
        ? moment(data.publishStart).toISOString()
        : null,
      publishEnd: data.publishEnd
        ? moment(data.publishEnd).toISOString()
        : null,
      thumbnailId: null,
    };
  };
  const updateSeminarData = (data: any) => {
    const value = form.getValues;

    return {
      id: data.id,
      courseId: seminar.idCourse,
      classId: seminar.idClass,
      seminarName: data.seminarName ?? "",
      isActive: data.isActive ?? false,
      isPublishNow: data.isPublishNow ?? false,
      isRightToICU: data.isRightToICU ?? false,
      isBelongHRMS: data.isBelongHRMS ?? false,
      divisionId: parseInt(data.divisionId),
      publishStart: data.publishStart
        ? moment(data.publishStart).toISOString()
        : null,
      publishEnd: data.publishEnd
        ? moment(data.publishEnd).toISOString()
        : null,
      thumbnailId: null,
    };
  };

  const onSubmit = async (data: SeminarCourseFormValues) => {
    const seminarData = getSeminarData(data);

    if (seminar.idSeminar === 0) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(seminarData));
      formData.append("thumbnail", (file as File) || "");
      axiosAuth.post(ENDPOINT.CREATE_SEMINAR, formData).then((res) => {});
    } else {
      const seminarData = updateSeminarData(data);
      const formData = new FormData();
      formData.append("data", JSON.stringify(seminarData));
      formData.append("thumbnail", (file as File) || "");
      axiosAuth
        .put(`${ENDPOINT.CREATE_SEMINAR}/${params.id}`, formData)
        .then((res) => {});
    }
  };

  useEffect(() => {
    try {
      const res = session && axiosAuth.get(ENDPOINT.DIVISION_ALL);
      res?.then((res) => {
        setListDivision(res.data);
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Optionally handle specific error cases here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (seminar.idSeminar === 0) {
          form.reset(defaultValues);
          setListVideo([]);
        } else {
          if (session && params.id) {
            const seminarDetailResponse = await axiosAuth.get(
              ENDPOINT.SEMINAR_DETAIL.replace(
                ":id",
                seminar.idSeminar && seminar.idSeminar !== 0
                  ? seminar.idSeminar
                  : params.id
              )
            );

            const res = seminarDetailResponse.data;
            const defaultValues = {
              id: res.id,
              seminarName: res.seminarName,
              isPublishNow: res.isPublishNow,
              isActive: res.isActive,
              isRightToICU: res.isRightToICU,
              isBelongHRMS: res.isBelongHRMS,
              courseId: res.courseId,
              publishStart: res.publishStart
                ? new Date(res.publishStart)
                : undefined,
              publishEnd: res.publishEnd ? new Date(res.publishEnd) : undefined,
              divisionId: `${res.divisionId}`,
              remark: res.remark !== null ? res.remark : "",
              thumbnailId: res.thumbnailId,
            };
            setDatathumnail(res.thumbnailId);

            form.reset(defaultValues);

            const videosResponse = await axiosAuth.get(
              `seminar/${seminar.idSeminar}/videos`
            );
            setListVideo(videosResponse.data);
          }
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Optionally handle specific error cases here
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, seminar.idSeminar]);
  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        await axiosAuth
          .get(ENDPOINT.GET_THUMBNAIL.replace(":id", datathumnail))
          .then((res) => {
            setImageSeminar(res.data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    if (datathumnail !== null) {
      fetchThumbnail();
    } else {
      setImageSeminar("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datathumnail]);

  return (
    <div className="flex grow p-[1.5rem]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="pt-0 grid gap-4 mt-[1rem] w-[100%]"
        >
          <div className=" flex justify-between items-center">
            {" "}
            <span className=" text-[18px] font-semibold text-[#101828]">
              Information
            </span>
            <FormField
              control={form.control}
              name="isPublishNow"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    {" "}
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="airplane-mode" className="text-[#101828]">
                      Publish now
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="seminarName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seminar Title*</FormLabel>
                <Input placeholder="Not specified" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 xl:grid-cols-3 grid-flow-row gap-4">
            <FormField
              control={form.control}
              name="divisionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Not specified" />
                    </SelectTrigger>
                    <SelectContent>
                      {listDivision.map((item: any) => {
                        return (
                          <SelectItem key={item.id} value={`${item.id}`}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule to publish</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal w-[100%] h-[44px]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Not specified</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publishing End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal w-[100%] h-[44px]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Not specified</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) => {
                          const publishStartDate: any =
                            form.getValues("publishStart");
                          const publishStart = new Date(publishStartDate);
                          const earliestDate = new Date("1900-01-01");
                          return date < publishStart || date < earliestDate;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 grid-flow-row gap-4">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="remark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <Input placeholder="Not specified" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormLabel>CLC Plus Status</FormLabel>
              <div className="mt-[1rem] flex items-center justify-start gap-4">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-start gap-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span className="text-[1rem] text-[#101828] font-medium">
                          Active
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isRightToICU"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-start gap-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span className="text-[1rem] text-[#101828] font-medium">
                          Right to ICU
                        </span>{" "}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1.4rem]">
                    <span className="text-[18px] font-semibold text-[#344054]">
                      Thumbnail
                    </span>
                    <br />{" "}
                    <div
                      className="flex justify-center items-center gap-2 bg-white text-[#B4D1DF] text-[14px] px-[1rem] cursor-pointer py-[10px] rounded-[0.8rem] border-[1px] border-[#D0D5DD]"
                      style={{ width: "max-content" }}
                    >
                      <Image src={Upload} alt="Upload" /> Browse
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFile(file);
                          field.onChange("http://localhost:3000/" + file.name);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {(file || imageSeminar) && (
              <div className="mt-[1rem]">
                <Image
                  src={
                    file ? URL.createObjectURL(file) : imageSeminar ?? undefined
                  }
                  width={128}
                  height={128}
                  alt="preview"
                  className="w-[50%] object-cover rounded-[0.5rem]"
                />
              </div>
            )}
          </div>
          <p className="text-[18px] font-semibold text-[#344054]">Video</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="h-[44px] bg-[#E7F0F5] rounded-b-none">
                  <th className="text-muted-foreground font-medium text-left px-2 rounded-bl-none">
                    Video Title
                  </th>
                  <th className="text-muted-foreground font-medium text-left px-2">
                    Speaker(s)
                  </th>
                </tr>
              </thead>
              <tbody className="rounded-[8px]">
                {listVideo?.map((video: any, index: number) => (
                  <tr key={video.id} className="h-[44px] rounded-[8px] border border-[#EAECF0]">
                    <td className="px-2 rounded-[8px]">{video.videoName}</td>
                    <td className="px-2">
                      <div className="flex justify-center items-center gap-2">
                        {video.speakers.map(
                          (itemSpeaker: any, speakerIndex: number) => (
                            <p
                              key={speakerIndex}
                              className="bg-[#ebf5ff] px-3 py-[4px] rounded-2xl text-[#175cd3] font-medium"
                              style={{ width: "max-content" }}
                            >
                              {itemSpeaker.fullName}
                            </p>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center gap-[12px]">
            <Button
              type="button"
              variant="outline"
              className="border-none text-[14px]"
              onClick={() => {
                form.reset(defaultValues);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="text-[14px]">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
