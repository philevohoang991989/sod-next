"use client";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ENDPOINT } from "@/constants/endpoint";
import { format } from "date-fns";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import moment from "moment";

const exportFormSchema = z.object({
  groupId: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});
type ExportFormValues = z.infer<typeof exportFormSchema>;
const defaultValues: Partial<ExportFormValues> = {
  groupId: "",
  startDate: undefined,
  endDate: undefined,
};
interface Props {
  page?: number;
  pageSize?: number;
  setPage?: (value: number) => void;
  setPageSize?: (value: number) => void;
  listRoleGroup?: any
}
export default function FormExport({
  page,
  pageSize,
  setPage,
  setPageSize,
  listRoleGroup
}: Props) {
  const { data: session } = useSession();
  const axiosAuth = useApiAuth();
  const form = useForm<ExportFormValues>({
    resolver: zodResolver(exportFormSchema),
    defaultValues,
  });
  const onSubmit = async (data: ExportFormValues) => {
    typeof setPage === "function" && setPage(1);
    typeof setPageSize === "function" && setPageSize(10);
    const filterData = {
      page: page,
      pageSize: pageSize,
      startDate: data.startDate ? moment(data.startDate).toISOString() : "",
      endDate: data.endDate ? moment(data.endDate).toISOString() : "",
      auditTypeId: data.groupId ? data.groupId : listRoleGroup[0].id,
    };
    console.log({ filterData });
    axiosAuth
      .get("Audit/Export/",{
          params: filterData,
          responseType: "arraybuffer"
        })
      .then((res) => {
        const fileURL: string = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/xlsx" })
        );
        try {
          const alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = `audit_log.xlsx`;
          alink.click();
        } catch (error) {
          // console.error('Error while creating blob and initiating download', error);
        }
      });
  };
  return (
    <div className="bg-white rounded-lg p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 items-end w-[100%]"
        >
          <FormField
            control={form.control}
            name="groupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Log Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px] rounded-lg border h-[44px] text-left px-2">
                      <SelectValue placeholder="Not specified" />
                    </SelectTrigger>
                    <SelectContent>
                      {listRoleGroup.map((item: any) => (
                        <SelectItem key={item.id} value={`${item.id}`}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Date</FormLabel>
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
            name="endDate"
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
          <Button type="submit" className="h-[44px]">
            Export
          </Button>
        </form>
      </Form>
    </div>
  );
}
