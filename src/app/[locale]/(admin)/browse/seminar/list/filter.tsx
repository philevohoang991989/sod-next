/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import IcFilter from "@/assets/icons/ic_filter.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { ENDPOINT } from "@/constants/endpoint";
import TimeInput from "@/components/TimeMask";

const searchFormSchema = z.object({
  search: z.string().optional(),
  divisionId: z.string().optional(),
  status: z.string().optional(),
  createdFrom: z.date().optional(),
  createdTo: z.date().optional(),
  updateDateFrom: z.date().optional(),
  updateDateTo: z.date().optional(),
  durationFrom: z.string().optional(),
  durationTo: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const defaultValues: Partial<SearchFormValues> = {
  search: "",
  divisionId: "",
  status: "",
  createdFrom: undefined,
  createdTo: undefined,
  updateDateFrom: undefined,
  updateDateTo: undefined,
  durationFrom: "",
  durationTo: "",
};

interface Props {
  setFilter?: (data: any) => void;
  setPageSize?: (data: any) => void;
  setPage?: (data: any) => void;
}

export default function Filter({ setFilter, setPageSize, setPage }: Props) {
  const axiosAuth = useApiAuth();
  const { data: session } = useSession();
  const [listDivision, setListDivision] = useState([]);

  const formSearch = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });

  async function onSearch(data: z.infer<typeof searchFormSchema>) {
    console.log({ data });

    if (setFilter)
      setFilter({
        ...data,
        page: 1,
        pageSize: 10,
        status: data.status ? parseInt(data.status) : "",
      });
    if (setPageSize) setPageSize(10);
    if (setPage) setPage(1);
  }

  const resetForm = () => {
    formSearch.reset();
  };

  useEffect(() => {
    session &&
      axiosAuth.get(ENDPOINT.GET_ALL_DIVISION).then((res) => {
        setListDivision(res.data);
      });
  }, [session]);

  return (
    <Form {...formSearch}>
      <form
        onSubmit={formSearch.handleSubmit(onSearch)}
        className="flex flex-col gap-4 mb-4"
      >
        <div className="flex justify-start items-end gap-4 flex-col md:flex-row">
          <FormField
            control={formSearch.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full md:w-64">
                <FormControl>
                  <Input
                    placeholder="Search Seminar ID, Name, Keywords, and more"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Popover>
            <PopoverTrigger className="w-full md:w-20 border px-2.5 bg-white border-blue-700 rounded-lg flex items-center gap-2 h-11">
              <Image src={IcFilter} alt="Filter Icon" />
              <span className="font-semibold text-sm text-gray-700">
                Filter
              </span>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="border-none shadow-custom flex flex-col gap-4"
            >
              <FormField
                control={formSearch.control}
                name="divisionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-80">
                          <SelectValue placeholder="Not specified" />
                        </SelectTrigger>
                        <SelectContent>
                          {listDivision.map((item: any) => (
                            <SelectItem key={item.id} value={`${item.id}`}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={formSearch.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-80">
                          <SelectValue placeholder="Not specified" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Draft</SelectItem>
                          <SelectItem value="1">Published</SelectItem>
                          <SelectItem value="2">Unpublished</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <FormLabel>Created Date</FormLabel>
                <div className="flex items-end justify-between gap-1 relative">
                  <FormField
                    control={formSearch.control}
                    name="createdFrom"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left w-[155px] font-normal h-[44px]",
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
                    control={formSearch.control}
                    name="createdTo"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left w-[155px] font-normal h-[44px]",
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
              </div>
              <div className="flex flex-col gap-2">
                <FormLabel>Updated date</FormLabel>
                <div className="flex items-end justify-between gap-1 relative">
                  <FormField
                    control={formSearch.control}
                    name="updateDateFrom"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left w-[155px] font-normal h-[44px]",
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
                    control={formSearch.control}
                    name="updateDateTo"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left w-[155px] font-normal h-[44px]",
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
              </div>
              <div className="flex flex-col gap-2">
                <FormLabel>Duration</FormLabel>
                <div className="flex items-end justify-between gap-1 relative">
                  <FormField
                    control={formSearch.control}
                    name="durationFrom"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <Input
                            className="w-[155px]"
                            placeholder="00:00:00"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formSearch.control}
                    name="durationTo"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <Input
                            className="w-[155px]"
                            placeholder="00:00:00"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <Button
                  type="button"
                  onClick={resetForm}
                  className="w-full bg-gray-100 text-gray-800 shadow-none"
                >
                  Reset
                </Button>
                <PopoverClose asChild className="w-full">
                  <Button>Apply</Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            className="h-11 w-full md:w-20 bg-blue-100 text-blue-700 hover:bg-blue-100 shadow-none text-sm"
            type="submit"
          >
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}
