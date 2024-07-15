/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { ENDPOINT } from "@/constants/endpoint";

const searchFormSchema = z.object({
  userId: z.string().optional(),
  roleGroupId: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const defaultValues: Partial<SearchFormValues> = {
  userId: "",
  roleGroupId: "",
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
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
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
                name="roleGroupId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roles</FormLabel>
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
