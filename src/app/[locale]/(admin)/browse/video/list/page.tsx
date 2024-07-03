"use client";
import PageLayout from "@/components/PageLayout";
import Filter from "./filter";
import { useEffect, useState } from "react";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import { ENDPOINT } from "@/constants/endpoint";
import { DataTable } from "@/components/data-table";
import PaginationComponent from "@/components/pagination-table";
import { ColumnDef } from "@tanstack/react-table";
import { Template } from "./columns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Edit from "@/assets/icons/edit.svg";
import Delete from "@/assets/icons/trash.svg";
import Play from "@/assets/icons/play.svg";

export default function ListVideo() {
  const columns: ColumnDef<Template>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Video ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "videoName",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Video Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const name: string = row.getValue("videoName");
        return <p>{name}</p>;
      },
    },
    {
      accessorKey: "heldDate",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Held Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const heldDate: string = row.getValue("heldDate");
        return <p>{heldDate?moment(heldDate).format("DD/MM/YYYY"):""}</p>;
      },
    },
    {
      accessorKey: "uploadedDate",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Uploaded Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const description: string = row.getValue("uploadedDate");
        return <p>{moment(description).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      accessorKey: "duration",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Duration
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const description: string = row.getValue("duration");
        return (
          <p>{description ? moment(description).format("HH:mm:ss") : ""}</p>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return <div className="flex justify-center">Status</div>;
      },
      cell: ({ row }) => {
        const status: any = row.getValue("status");
        let content;

        switch (status) {
          case 1:
            content = (
              <span className="px-[12px] py-[4px] rounded-[100px] text-[12px] font-medium bg-[#ecfdf3] text-[#027a48]">
                Published
              </span>
            );
            break;
          case 2:
            content = (
              <span className="px-[12px] py-[4px] rounded-[100px] text-[12px] font-medium bg-[#FFFAEB] text-[#FB6514]">
                Unpublished
              </span>
            );
            break;
          default:
            content = (
              <span className="px-[12px] py-[4px] rounded-[100px] text-[12px] font-medium bg-[#EFF8FF] text-[#175CD3]">
                New
              </span>
            );
        }

        return <div className="flex justify-center">{content}</div>;
      },
    },
    {
      id: "actions",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">Action</div>
        );
      },
      cell: ({ row }) => (
        <div className="w-full flex gap-4 justify-center items-center">
          <Button variant="link" className="p-0 w-8 h-8">
            {/* <a href={`/browse/seminar/${row.getValue("id")}`}> */}
              {" "}
              <Image height={20} width={20} src={Edit} alt="Edit" />
            {/* </a> */}
          </Button>
          <Button
          className="p-0 w-8 h-8"
            variant="link"
          >
            <Image height={20} width={20} src={Play} alt="Play" />
          </Button>
          <Button
          className="p-0 w-8 h-8"
            variant="link"
          >
            <Image height={20} width={20} src={Delete} alt="Delete" />
          </Button>
        </div>
      ),
    },
  ];
  const axiosAuth = useApiAuth();
  const { data: session } = useSession();
  const [filter, setFilter] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [listVideo, setListVideo] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  useEffect(() => {
    session &&
      axiosAuth
        .get(ENDPOINT.GET_LIST_VIDEO, {
          params: filter,
        })
        .then((res) => {
          setListVideo(res.data.items);
          setPageCount(res.data.totalFilter);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, filter, pageCount]);
  useEffect(() => {
    setFilter({
      ...filter,
      page: page,
      pageSize: pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);
  return (
    <PageLayout title="Video">
      <Filter
        setFilter={setFilter}
        setPageSize={setPageSize}
        setPage={setPage}
      />
      <DataTable columns={columns} data={listVideo} pageSize={pageSize} />
      <PaginationComponent
        pageSize={pageSize}
        currentPage={page}
        itemCount={pageCount}
        setPageSize={(value: string) => setPageSize(parseInt(value))}
        setCurrentPage={(value: string) => setPage(parseInt(value))}
      />
    </PageLayout>
  );
}
