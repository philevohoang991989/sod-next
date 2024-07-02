"use client";
import PageLayout from "@/components/PageLayout";
import Filter from "./filter";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { ENDPOINT } from "@/constants/endpoint";
import { ColumnDef } from "@tanstack/react-table";
import { Template } from "./columns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Edit from "@/assets/icons/edit.svg";
import Delete from "@/assets/icons/trash.svg";
import PaginationComponent from "@/components/pagination-table";
import { DataTable } from "@/components/data-table";

export default function ListSeminar() {
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
            Seminar ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "seminarName",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Seminar Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const name: string = row.getValue("seminarName");
        return <p>{name}</p>;
      },
    },
    {
      accessorKey: "courseSubject",
      header: "Course Subject",
      cell: ({ row }) => {
        const description: string = row.getValue("courseSubject");
        return <p>{description}</p>;
      },
    },
    {
      accessorKey: "createDateTime",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const description: string = row.getValue("createDateTime");
        return <p>{moment(description).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      accessorKey: "totalDuration",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Duration
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const description: string = row.getValue("totalDuration");
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
              <span className="px-[12px] py-[4px] rounded-[100px] text-[12px] font-medium bg-[#ecfdf3] text-[#4caf50]">
                Published
              </span>
            );
            break;
          case 2:
            content = (
              <span className="px-[12px] py-[4px] rounded-[100px] text-[12px] font-medium bg-[#fffaeb] text-[#fb6514]">
                Unpublished
              </span>
            );
            break;
          default:
            content = (
              <span className="px-[12px] py-[4px] rounded-[100px] text-[12px] font-medium bg-[#f2f4f7] text-[#344054]">
                Draft
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
          <Button className="p-0 w-8 h-8" variant="link">
            <a href={`/browse/seminar/${row.getValue("id")}`} >
              {" "}
              <Image width={20} height={20} src={Edit} alt="Edit" />
            </a>
          </Button>

          <Button
            className="p-0 w-8 h-8"
            variant="link"
          >
            <Image src={Delete} alt="Delete" />
          </Button>
        </div>
      ),
    },
  ];
  const axiosAuth = useApiAuth();
  const { data: session } = useSession();
  const [listSeminar, setListSeminar] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const [filter, setFilter] = useState<any>({
    page: page,
    pageSize: pageSize,
    search: "",
    divisionId: "",
    status: "",
    type: "",
    createdFrom: undefined,
    createdTo: undefined,
    updateDateFrom: undefined,
    updateDateTo: undefined,
    durationFrom: "",
    durationTo: "",
  });
  console.log({ filter });
  useEffect(() => {
    session &&
      axiosAuth
        .get(ENDPOINT.CREATE_SEMINAR, {
          params: filter,
        })
        .then((res) => {
          setListSeminar(res.data.items);
          setPageCount(res.data.totalFilter);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, filter, page, pageSize, pageCount]);
  useEffect(() => {
    setFilter({
      ...filter,
      page: page,
      pageSize: pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  return (
    <PageLayout title="Seminar">
      <Filter
        setFilter={setFilter}
        setPageSize={setPageSize}
        setPage={setPage}
      />
      <DataTable columns={columns} data={listSeminar} pageSize={pageSize} />
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
