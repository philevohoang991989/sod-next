/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Search from "./search";
import { useSession } from "next-auth/react";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { useCookies } from "react-cookie";
import { cn, parseParams } from "@/lib/utils";
import MobileSearch from "./mobile-search";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import IcFilter from "@/assets/icons/ic_filter.svg";
import IcMenu from "@/assets/icons/ic_menu.svg";
import ItemSeminar from "./item-seminar";
import PaginationComponent from "@/components/pagination-table";

export default function TabAll() {
  const { data: session } = useSession();
  const axiosAuth = useApiAuth();
  const [page, setPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState<any>({
    page: page,
    pageSize: pageSize,
  });
  const [listSeminar, setListSeminar] = useState([]);
  const [cookie] = useCookies(["userId"]);
  const getList = () => {
   if(session){
    axiosAuth
        .get(`User/${cookie.userId}/Seminars`, {
          params: filter,
          paramsSerializer: (params) => parseParams(params),
        })
        .then((res) => {
          console.log({ res });
          setListSeminar(res.data.items);
          setPageCount(res.data.totalFilter);
        }).catch((error) => {
          console.error('Error fetching seminars:', error);
        });
   }
      
  };
  useEffect(() => {
    getList();
  }, [session, cookie, filter]);
  console.log({ filter });
  useEffect(() => {
    setFilter({
      ...filter,
      page: page,
      pageSize: pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  return (
    <div className="pb-4">
      <div className="mt-8 mb-4 flex justify-start gap-3 items-center">
        <Button
          onClick={() => setIsSearch(!isSearch)}
          className="w-[100%] hidden m md:w-[5rem] border px-[10px] bg-white hover:bg-white border-[#0D6999] rounded-[0.5rem] md:flex items-center gap-2 h-[40px]"
        >
          <div className="flex justify-center items-center gap-2 ">
            {" "}
            <Image src={IcFilter} alt="IcFilter" />
            <span className="font-semibold text-[14px] text-[#344054]">
              Filter
            </span>
          </div>
        </Button>
        <MobileSearch setFilter={setFilter} filter={filter} />
        <Button
          className="bg-white shadow-none h-[2.5rem]"
          onClick={() => setIsGrid(!isGrid)}
        >
          <Image src={IcMenu} alt="IcMenu" />
        </Button>
      </div>
      <div className="flex gap-4 ">
        {isSearch && (
          <div className="hidden md:flex bg-white rounded-lg md:flex-1">
            <Search setFilter={setFilter} filter={filter} />
          </div>
        )}
        <div
          className={cn(
            isSearch &&
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ",
            isGrid
              ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
              : "flex flex-col gap-4 w-full"
          )}
        >
          {listSeminar.map((item, index) => (
            <ItemSeminar
              key={index}
              isGrid={isGrid}
              itemSeminar={item}
              aspectRatio="portrait"
            />
          ))}
        </div>
      </div>
      <PaginationComponent
        pageSize={pageSize}
        currentPage={page}
        itemCount={pageCount}
        setPageSize={(value: string) => setPageSize(parseInt(value))}
        setCurrentPage={(value: string) => setPage(parseInt(value))}
      />
    </div>
  );
}
