/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";

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
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

export default function InfoCourse() {
    const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const [localCourse, setLocalCourse] = useState<boolean>(false);
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
  };
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
  });
  const onSubmit = async (data: CourseFormValues) => {
    console.log({ data });
  };
  console.log(form.watch("name"));
  useEffect(() => {
    try {
        const res = session &&  axiosAuth.get(ENDPOINT.LIST_COURSE_HRMS);
        console.log({ res });
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Optionally handle specific error cases here
      }
  }, [session]);

  return (
    <div className="p-[1.5rem] rounded-2xl bg-white border-[1px] border-[#D0D5DD]">
      <div className="flex justify-between items-start">
        <p className="text-[#101828] font-semibold text-[18px]">
          HRMS Course Information
        </p>
        <Button
          variant="default"
          className="text-[14px]"
          onClick={() => setLocalCourse(true)}
        >
          Create Local Course
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="pt-0 grid gap-4"
        >
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {localCourse && (
            <div className="flex justify-end items-center gap-[12px]">
              <Button variant="outline" className="border-none text-[14px]">
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
