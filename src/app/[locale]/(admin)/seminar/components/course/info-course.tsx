/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import moment from "moment";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ENDPOINT } from "@/constants/endpoint";
import { format } from "date-fns";
import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import { CreateClass, TypeCourse } from "@/types";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const courseFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  curriculum: z.string(),
  category: z.string(),
  modelOfTraining: z.string(),
  subject: z.string(),
  targetParticipant: z.string(),
  isLocal: z.boolean(),
  courseCode: z.string(),
  heldDate: z.date().optional(),
  referenceClass: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

type Props = {
  idCourse: number;
  idClass: number;
  setIdCourse?: (value: any) => void;
  setIdClass?: (value: any) => void;
};

export default function InfoCourse({
  idCourse,
  idClass,
  setIdCourse,
  setIdClass,
}: Props) {

  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const [listCourseHRMS, setlistCourseHRMS] = useState<any>([]);
  const [localCourse, setLocalCourse] = useState<boolean>(false);
  const [itemCourse, setItemCourse] = useState({});
  const [actionCourse, setActionCourse] = useState<boolean>(false);
  const defaultValues: Partial<CourseFormValues> = {
    id: 0,
    name: "",
    curriculum: "",
    category: "",
    modelOfTraining: "",
    subject: "",
    targetParticipant: "",
    isLocal: false,
    courseCode: "",
    heldDate: undefined,
    referenceClass: "",
  };
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
  });
  const UpdateCourse = (data: TypeCourse) => {
    console.log("UpdateCourse", data);
  };
  const CreateCourse = (data: TypeCourse) => {
    console.log("CreateCourse", data);
    const newClassCourse: CreateClass = {
      name: data.referenceClass,
      heldDate: data.heldDate,
      courseDetail: {
        id: 0,
        name: data.name,
        curriculum: data.curriculum,
        category: data.category,
        modelOfTraining: data.modelOfTraining,
        subject: data.subject,
        targetParticipant: data.targetParticipant,
        isLocal: localCourse,
      }
    }
    axiosAuth.post(ENDPOINT.CREATE_CLASS, newClassCourse).then((res) => {
      console.log({ res });

      // const defaultValues = {
      //   name: res.data.name,
      //   curriculum: res.data.curriculum,
      //   category: res.data.category,
      //   modelOfTraining: res.data.modelOfTraining,
      //   subject: res.data.subject,
      //   targetParticipant: res.data.targetParticipant,
      //   heldDate: res.data.heldDate,
      // };
      form.reset(data);
      typeof setIdCourse === "function" && setIdCourse(res.data.courseId);
      typeof setIdClass === "function" && setIdClass(res.data.id);
      setActionCourse(false);
    });
  };
  const onSubmit = async (data: CourseFormValues) => {
    console.log({ data });
    if (idCourse && idCourse > 0) {
      UpdateCourse(data);
    } else {
      CreateCourse(data);
    }
  };
  useEffect(() => {
    try {
      const res = session && axiosAuth.get(ENDPOINT.LIST_COURSE_HRMS);
      res?.then((res) => {
        setlistCourseHRMS(res.data);
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Optionally handle specific error cases here
    }
  }, [session]);
  useEffect(() => {
    localCourse && form.reset(defaultValues);
  }, [localCourse]);
  const getDetailCourse = (value: any) => {
    typeof setIdCourse === "function" && setIdCourse(value.courseDetail?.id);
    typeof setIdClass === "function" && setIdClass(value.id);
    axiosAuth
      .get(`/Course/${value.courseDetail.id}/classes/${value.id}`)
      .then((res) => {
        const defaultValues = {
          name: res.data.name,
          curriculum: res.data.curriculum,
          category: res.data.category,
          modelOfTraining: res.data.modelOfTraining,
          subject: res.data.subject,
          targetParticipant: res.data.targetParticipant,
          heldDate: res.data.heldDate,
        };
        form.reset(defaultValues);
      });
  };

  return (
    <div className="p-[1.5rem] rounded-2xl bg-white border-[1px] border-[#D0D5DD]">
      <div className="flex justify-between items-start">
        <p className="text-[#101828] font-semibold text-[18px]">
          HRMS Course Information
        </p>
        {!localCourse && (
          <Button
            variant="default"
            className="text-[14px]"
            onClick={() => {
              setLocalCourse(true);
              setActionCourse(true);
            }}
          >
            Create Local Course
          </Button>
        )}
      </div>
      {!localCourse && (
        <>
          <Label>Course</Label>{" "}
          <Select
            onValueChange={(value) => {
              setItemCourse(value);
              getDetailCourse(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
            <SelectContent>
              {listCourseHRMS.map((item: any) => {
                return (
                  <SelectItem key={item.id} value={item}>
                    {`[${item.id} - ${item.name}] ${item.courseDetail.id} - `}
                    <strong>{item.courseDetail.name}</strong>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="pt-0 grid gap-4 mt-[1rem]"
        >
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <Input placeholder="Not specified" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-5 grid-flow-row gap-4">
            <FormField
              control={form.control}
              name="curriculum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Curriculum</FormLabel>
                  <Input placeholder="Not specified" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Catgory</FormLabel>
                  <Input placeholder="Not specified" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelOfTraining"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode of Training</FormLabel>
                  <Input placeholder="Not specified" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode of Training</FormLabel>
                  <Input placeholder="Not specified" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetParticipant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Participant</FormLabel>
                  <Input placeholder="Not specified" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-5 grid-flow-row gap-4">
            <FormField
              control={form.control}
              name="heldDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Held Date</FormLabel>
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
                            moment(field.value).format("DD/MM/YYYY")
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
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        // initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {localCourse && (
              <FormField
                control={form.control}
                name="referenceClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference Class</FormLabel>
                    <Input placeholder="Not specified" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          {actionCourse && (
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
          )}
        </form>
      </Form>
    </div>
  );
}
