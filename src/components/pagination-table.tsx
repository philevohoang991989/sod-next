"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  setPageSize: (page: string) => void;
  setCurrentPage: (current: string) => void;
};

const PaginationComponent = ({
  itemCount,
  pageSize,
  currentPage,
  setPageSize,
  setCurrentPage,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const displayPageCount = 3;
  const generatePaginationLinks = () => {
    const paginationLinks = [];
    const leftEllipsis = currentPage > 2;
    const rightEllipsis = currentPage < pageCount - 1;

    for (let i = 1; i <= pageCount; i++) {
      if (
        i === 1 ||
        i === pageCount ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        paginationLinks.push(
          <PaginationLink
            key={i}
            onClick={() => changePage(i)}
            isActive={currentPage === i}
            className=" h-[2.5rem] w-[2.5rem] border border-[#DBDCE2] text-[14px]"
          >
            {i}
          </PaginationLink>
        );
      }
    }

    if (leftEllipsis) {
      paginationLinks.splice(1, 0, <PaginationEllipsis key="left" />);
    }
    if (rightEllipsis) {
      paginationLinks.splice(
        paginationLinks.length - 1,
        0,
        <PaginationEllipsis key="right" />
      );
    }

    return paginationLinks;
  };

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount < 1) return null;

  const changePage = (page: number) => {

    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    // router.push("?" + params.toString());
    setCurrentPage(page.toString());
  };
  return (
    <Pagination className="flex gap-[1.2.5rem] mt-4">
      <PaginationContent className="w-full flex justify-between *:cursor-pointer">
        <div className="flex justify-start items-center gap-4">
         <div className="flex justify-start items-center">
         <Select
            onValueChange={(value) => {
              setPageSize(value);
              setCurrentPage('1')
            }}
            defaultValue={pageSize.toString()}
          >
            <SelectTrigger className="w-[70px] h-[44px] bg-[#b4c2cb33] rounded-[0.8rem] border border-[#DBDCE2]">
              <SelectValue placeholder="Selete Page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="border-1">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50 </SelectItem>
                <SelectItem value="100">100 </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-[#667085] text-[14px] pl-1">/Page</p>
         </div>
          <span className="text-[14px] text-[#0B2C4A]">
            Show 1-{pageSize} of {itemCount} items
          </span>
        </div>
        <div className="flex justify-end">
        <Button
          variant="ghost"
          disabled={currentPage <= 1}
          onClick={() => changePage(currentPage - 1)}
          className="border rounded-l-lg rounded-r-none h-[2.5rem] w-[2.5rem] p-0"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-all duration-300 delay-150" />{" "}
        </Button>
        {generatePaginationLinks()}
        <Button
          variant="ghost"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
          className="border rounded-r-lg rounded-l-none h-[2.5rem] w-[2.5rem] p-0"
        >
          <ChevronRight className="group-hover:translate-x-1 transition-all duration-300 delay-150" />
        </Button>
        </div>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
