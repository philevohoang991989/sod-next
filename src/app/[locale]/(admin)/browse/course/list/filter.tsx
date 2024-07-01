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

const searchFormSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  category: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const defaultValues: Partial<SearchFormValues> = {
  search: "",
  status: "",
  startDate: undefined,
  endDate: undefined,
};
interface Props{
  setFilter?: (data: any) => void;
  setPageSize?: (data: any) => void;
  setPage?: (data: any) => void;
}
export default function Filter({setFilter,setPageSize,setPage}:Props) {
  const formSearch = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });

  async function onSearch(data: z.infer<typeof searchFormSchema>) {
    typeof setFilter === 'function' &&  setFilter({...data,page: 1, pageSize: 10});
    typeof setPageSize === 'function' &&  setPageSize(10);
    typeof setPage === 'function' &&  setPage(1);
    
  }

  const resetForm = () => {
    formSearch.reset();
  };
  
  return (
    <Form {...formSearch} >
      <form
        onSubmit={formSearch.handleSubmit(onSearch)}
        className="flex flex-col gap-4 mb-4"
      >
        <div className="flex justify-start items-end gap-4 flex-col md:flex-row">
          <FormField
            control={formSearch.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-[100%] md:w-[25rem]">
                <FormControl>
                  <Input
                    placeholder="Search Course ID, Name, Keywords, and more"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Popover>
            <PopoverTrigger className="w-[100%] md:w-[5rem] border px-[10px] bg-white border-[#0D6999] rounded-[8px] flex items-center gap-2 h-[44px]">
              <div className="flex justify-center items-center gap-2 ">
                {" "}
                <Image src={IcFilter} alt="IcFilter" />
                <span className="font-semibold text-[14px] text-[#344054]">
                  Filter
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="border-none shadow-custom flex flex-col gap-4"
            >
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
                        <SelectTrigger className="w-[20rem]">
                          <SelectValue placeholder="Not specified" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Active</SelectItem>
                          <SelectItem value="0">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <FormLabel>Held Date</FormLabel>
                <div className="flex items-end justify-between gap-1 relative">
                  <FormField
                    control={formSearch.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left w-[155px] font-normal h-[44px]",
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
                    control={formSearch.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left w-[155px] font-normal h-[44px]",
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
              </div>
              <div className="flex justify-between items-center gap-3">
                <Button
                  type="button"
                  onClick={resetForm}
                  className="w-[100%] bg-[#F2F4F7] text-[#101828] shadow-none"
                >
                  Reset
                </Button>
                <PopoverClose asChild className="w-[100%]">
                  <Button type="submit">Apply</Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            className="h-[44px] w-[100%] md:w-[5rem] bg-[#DBE9F0] text-[#0D6999] hover:bg-[#DBE9F0] shadow-none text-[14px]"
            type="submit"
          >
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}
