"use client";
import PageLayout from "@/components/PageLayout";
import { useEffect, useState } from "react";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { ENDPOINT } from "@/constants/endpoint";
import { ColumnDef } from "@tanstack/react-table";
import { Template } from "./columns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
import PaginationComponent from "@/components/pagination-table";
import Filter from "./filter";
import { DataTable } from "@/components/data-table";

export default function CourseList() {
  const axiosAuth = useApiAuth();

  const { data: session } = useSession();
  const [listCourse, setListCourse] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const [filter, setFilter] = useState<any>({
    page: page,
    pageSize: pageSize,
    search: "",
    status: "",
    startDate: "",
    endDay: "",
  });
  useEffect(() => {
    session &&
      axiosAuth
        .get(ENDPOINT.GET_LIST_COURSE, {
          params: filter,
        })
        .then((res) => {
          setListCourse(res.data.results);
          setPageCount(res.data.totalFilter);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, filter, pageCount]);

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
            Course ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Course Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const name: string = row.getValue("name");
        return <p>{name}</p>;
      },
    },
    {
      accessorKey: "curriculum",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Course Curriculum
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const description: string = row.getValue("curriculum");
        return <p>{description}</p>;
      },
    },
    {
      accessorKey: "subject",
      header: "Course Subject",
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return <div className="flex justify-center">Status</div>;
      },
      cell: ({ row }) => {
        const status: any = row.getValue("status");
        return (
          <div className="flex justify-center">
            {status.value === 0 ? (
              <span className="bg-[#F9FAFB] py-1 px-5 rounded-[10px] text-[#344054]">
                Inactive
              </span>
            ) : (
              <span className="bg-[#ecfdf3] py-1 px-5 rounded-[10px] text-[#027a48]">
                Active
              </span>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    setFilter({
      ...filter,
      page: page,
      pageSize: pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  return (
    <PageLayout title="Course">
      <Filter
        setFilter={setFilter}
        setPageSize={setPageSize}
        setPage={setPage}
      />
      <DataTable columns={columns} data={listCourse} pageSize={pageSize} />
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
