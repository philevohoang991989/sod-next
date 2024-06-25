"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";

type Props = {
  idSeminar?: any;
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
  divisionId: z.string(),
  remark: z.string(),
  thumbnailId: z.number().optional(),
});

type SeminarCourseFormValues = z.infer<typeof seminarFormSchema>;

export default function InfoSeminar({ idSeminar }: Props) {
  const { data: session } = useSession();
  const params: any = useParams();
  const axiosAuth = useAxiosAuth();
  const [listDivision, setListDivision] = useState([]);
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
  };
  const form = useForm<SeminarCourseFormValues>({
    resolver: zodResolver(seminarFormSchema),
    defaultValues,
  });
  const onSubmit = async (data: SeminarCourseFormValues) => {
    console.log({ data });
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
    try {
      const res =
        session &&
        params.id &&
        axiosAuth.get(
          ENDPOINT.SEMINAR_DETAIL.replace(
            ":id",
            idSeminar ? idSeminar : params.id
          )
        );
      res?.then((res) => {
        const defaultValues = {
          id: res.data.id,
          seminarName: res.data.seminarName,
          isPublishNow: res.data.isPublishNow,
          isActive: res.data.isActive,
          isRightToICU: res.data.isRightToICU,
          isBelongHRMS: res.data.isBelongHRMS,
          courseId: res.data.courseId,
          publishStart: res.data.publishStart?new Date(res.data.publishStart):undefined,
          publishEnd: res.data.publishEnd? new Date(res.data.publishEnd): undefined,
          divisionId: (res.data.divisionId).toString(),
          remark: res.data.remark,
          thumbnailId: res.data.thumbnailId,
        };
        form.reset(defaultValues);
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Optionally handle specific error cases here
    }
  }, [session, idSeminar]);
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
          <div className="grid grid-cols-3 grid-flow-row gap-4">
            <FormField
              control={form.control}
              name="divisionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
          <div className="grid grid-cols-3 grid-flow-row gap-4">
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
