/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { Notebook } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import TabAll from "./components/tab-all";
import { parseParams } from "@/lib/utils";

export default function SeminarList() {
  const { data: session } = useSession();
  const axiosAuth = useApiAuth();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState<any>({
    page: page,
    pageSize: pageSize,
  });
  const [listSeminar, setListSeminar] = useState([]);
  const [cookie] = useCookies(["userId"]);
  useEffect(() => {
    session &&
      axiosAuth
        .get(`User/${cookie.userId}/Seminars`, {
          params: filter,
          paramsSerializer: params => parseParams(params) 
        })
        .then((res) => {
          console.log({ res });
          setListSeminar(res.data.items);
          setPageCount(res.data.totalFilter);
        });
  }, [session, cookie,filter]);
  console.log({filter});
  
  return (
    <div className="w-full">
      <Tabs defaultValue="1">
        <div className="bg-white w-[100%] h-[100%]">
          {" "}
          <div className="container m-w-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="pt-[1.5rem] text-[#101828] font-semibold text-[1.5rem]">
                Seminars
              </p>
              <Button className="mt-[1.5rem] flex gap-2 items-center bg-[#F9FAFB] shadow-none text-[#344054] border-[1px] border-[#D0D5DD]">
                <Notebook size={18} /> Disclaimer
              </Button>
            </div>
            <TabsList className="container m-w-2xl flex justify-start items-center gap-1">
              <TabsTrigger value="1">All</TabsTrigger>
              <TabsTrigger value="2">Recommended</TabsTrigger>
              <TabsTrigger value="3">New Releases</TabsTrigger>
              <TabsTrigger value="4">Most-Viewed</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <div className="container m-w-2xl">
          <TabsContent value="1">
            <TabAll listSeminar={listSeminar} setFilter={(value: any)=>setFilter(value)} filter={filter}/>
          </TabsContent>
          <TabsContent value="2">content 2</TabsContent>
          <TabsContent value="3">content 3</TabsContent>
          <TabsContent value="4">content 4</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
