"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CheckIcon } from "lucide-react";

const searchFormSchema = z.object({
  seminarName: z.string().optional(),
});
type SearchFormValues = z.infer<typeof searchFormSchema>;
const defaultValues: Partial<SearchFormValues> = {
  seminarName: "",
};

interface Props {
  setFilter?: (data: any) => void;
}
export default function SearchReport({ setFilter }: Props) {
  const { data: session } = useSession();
  const axiosAuth = useApiAuth();
  const [listSeminar, setListSeminar] = useState<any>([]);
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });
  const onSubmit = async (data: SearchFormValues) => {
    console.log({data});
    
    typeof setFilter === "function" && setFilter(data);
  };
  useEffect(() => {
    session &&
      axiosAuth.get(ENDPOINT.LIST_SEMINAR_PUBLISH).then((res) => {
        setListSeminar(res.data);
      });
  }, [session]);

  return (
    <div className="mb-[1.5rem]">
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
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? listSeminar.find(
                                (seminar: any) => `${seminar.id}` === field.value
                              )?.seminarName
                              : "Select seminar"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
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
                                    console.log({setValue: `${seminar.id}`});
                                    
                                    form.setValue("seminarName", `${seminar.id}`)
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
              <Button type="submit">Search</Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
