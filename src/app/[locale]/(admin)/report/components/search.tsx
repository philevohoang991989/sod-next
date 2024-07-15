/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ENDPOINT } from "@/constants/endpoint";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import IcFilter from "@/assets/icons/ic_filter.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const searchFormSchema = z.object({
  seminarName: z.string().optional(),
  heldDateFrom: z.date().optional(),
  heldDateTo: z.date().optional(),
});
type SearchFormValues = z.infer<typeof searchFormSchema>;
const defaultValues: Partial<SearchFormValues> = {
  seminarName: "",
  heldDateFrom: undefined,
  heldDateTo: undefined,
};

interface Props {
  setFilter?: (data: any) => void;
  filter?: any;
  setListReport?: (data: any) => void;
  setReportType?: (data: any) => void;
  setPageCount?: (data: any) => void;
  reportType: any;
}
export default function SearchReport({
  setFilter,
  setListReport,
  setReportType,
  filter,
  reportType,
  setPageCount,
}: Props) {
  const { data: session } = useSession();
  const axiosAuth = useApiAuth();
  const [listSeminar, setListSeminar] = useState<any>([]);
  const [listReportType, setListReportType] = useState<any>([]);
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });
  const onSubmit = async (data: SearchFormValues) => {
    typeof setFilter === "function" && setFilter(data);
  };
  useEffect(() => {
    session &&
      axiosAuth.get(ENDPOINT.LIST_SEMINAR_PUBLISH).then((res) => {
        setListSeminar(res.data);
      });
    session &&
      axiosAuth.get(ENDPOINT.REPORT_TYPE).then((res) => {
        setListReportType(res.data);
        typeof setReportType === "function" && setReportType(res.data[0].id);
      });
  }, [session]);
  useEffect(() => {
    session &&
      reportType &&
      axiosAuth.get(`Report/${reportType}`, { params: filter }).then((res) => {
        typeof setListReport === "function" && setListReport(res.data.results);
        typeof setPageCount === "function" && setPageCount(res.data.rowCount);
      });
  }, [session, reportType, filter]);

  return (
    <div className="mb-[1.5rem] flex gap-2">
      <Select
        onValueChange={(value) => {
          typeof setReportType === "function" && setReportType(value);
        }}
        value={`${reportType}`}
      >
        <SelectTrigger className="w-70">
          <SelectValue placeholder="Not specified" />
        </SelectTrigger>
        <SelectContent>
          {listReportType.map((item: any) => {
            return (
              <SelectItem key={item.id} value={`${item.id}`}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger className="w-full md:w-20 border px-2.5 bg-white border-blue-700 rounded-lg flex items-center gap-2 h-11">
          <Image src={IcFilter} alt="Filter Icon" />
          <span className="font-semibold text-sm text-gray-700">Filter</span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="border-none shadow-custom flex flex-col gap-4"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-2 flex-col w-[100%]"
            >
              <FormField
                control={form.control}
                name="seminarName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Seminar title</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[100%] h-[44px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? listSeminar.find(
                                  (seminar: any) =>
                                    `${seminar.id}` === field.value
                                )?.seminarName
                              : "Select seminar"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[100%] p-0">
                        <Command>
                          <CommandInput placeholder="Search seminar..." />
                          <CommandEmpty>No seminar found.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {listSeminar.map((seminar: any) => (
                                <CommandItem
                                  value={seminar.seminarName}
                                  key={seminar.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "seminarName",
                                      `${seminar.id}`
                                    );
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      `${seminar.id}` === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {seminar.seminarName}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name="heldDateFrom"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel>Held Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left w-[200px] font-normal h-[44px]",
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
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heldDateTo"
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left w-[200px] font-normal h-[44px]",
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
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
