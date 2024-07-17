/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const searchFormSchema = z.object({
  courseIds: z.any().optional(),
  search: z.string().optional(),
  speakerIds: z.any().optional(),
  publishedDateFrom: z.date().optional(),
  publishedDateTo: z.date().optional(),
});
type SearchFormValues = z.infer<typeof searchFormSchema>;
const defaultValues: Partial<SearchFormValues> = {
  search: "",
  courseIds: [],
  speakerIds: [],
  publishedDateFrom: undefined,
  publishedDateTo: undefined,
};
interface Props {
  setFilter?: (data: any) => void;
  filter?: any;
}
export default function Search({ setFilter, filter }: Props) {
  const [dataSearch, setDataSearch] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSpeaker, setSearchSpeaker] = useState("");
  const { data: session } = useSession();
  const [listCourse, setListCourse] = useState([]);
  const [listSpeaker, setListSpeaker] = useState([]);
  const axiosAuth = useApiAuth();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });
  const onSubmit = async (data: SearchFormValues) => {
    console.log({ data });

    setDataSearch((prevFilter) => ({
      ...prevFilter,
      page: 1,
      pageSize: 10,
      ...data,
      publishedDateFrom:
        data.publishedDateFrom === undefined ? "" : data.publishedDateFrom,
      publishedDateTo:
        data.publishedDateTo === undefined ? "" : data.publishedDateTo,
    }));
  };
  useEffect(() => {
    typeof setFilter === "function" && setFilter(dataSearch);
  }, [dataSearch]);
  useEffect(() => {
    session &&
      axiosAuth.get("Course/Export").then((res) => {
        console.log({ res });
        setListCourse(res.data);
      });
    session &&
      axiosAuth.get("Speaker/All").then((res) => {
        console.log({ res });
        setListSpeaker(res.data);
      });
  }, [session]);
  const filteredCourses = listCourse.filter((course: any) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredSpeaker = listSpeaker.filter((course: any) =>
    course.fullName.toLowerCase().includes(searchSpeaker.toLowerCase())
  );
  return (
    <div className="w-[20rem]  p-4 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 flex-col w-[100%] "
        >
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-semibold text-[#101828]">Filter</p>
            <Button variant="link" className="p-0 text-[#F04438]">
              Clear (6)
            </Button>
          </div>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Input className="w-[100%] bg-white" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="course-subject" className="border-none ">
              <AccordionTrigger className="font-medium text-[1rem]]">
                Course Subject
              </AccordionTrigger>
              <AccordionContent>
                <Input
                  className="mb-[12px]"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="h-[15rem] w-[100%] overflow-x-hidden flex flex-col gap-1 overflow-y-auto">
                  {filteredCourses.map((item: any) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="courseIds"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked: any) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: any) => value !== `${item.id}`
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="speaker-subject" className="border-none ">
              <AccordionTrigger className="font-medium text-[1rem]]">
                Speaker(s)
              </AccordionTrigger>
              <AccordionContent>
                <Input
                  className="mb-[12px]"
                  type="text"
                  placeholder="Search"
                  value={searchSpeaker}
                  onChange={(e) => setSearchSpeaker(e.target.value)}
                />
                <div className="h-[15rem] w-[100%] overflow-x-hidden flex flex-col gap-1 overflow-y-auto">
                  {filteredSpeaker.map((item: any) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="speakerIds"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked: any) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: any) => value !== `${item.id}`
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.fullName}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="published-date" className="border-none ">
              <AccordionTrigger className="font-medium text-[1rem]]">
                Published Date
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex justify-between gap-1 relative">
                  <FormField
                    control={form.control}
                    name="publishedDateFrom"
                    render={({ field }) => (
                      <FormItem className="w-[100%]">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal h-[44px] w-[100%]",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? format(field.value, "dd/MM/yyyy")
                                  : "Not specified"}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="publishedDateTo"
                    render={({ field }) => (
                      <FormItem className="w-[100%]">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal h-[44px] w-[100%]",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? format(field.value, "dd/MM/yyyy")
                                  : "Not specified"}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button type="submit">Search</Button>
        </form>
      </Form>
    </div>
  );
}
