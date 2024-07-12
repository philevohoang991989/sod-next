"use client";
import PageLayout from "@/components/PageLayout";
import FormExport from "./form-export";
import FormSearch from "./form-search";
import { useEffect, useState } from "react";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { ColumnDef } from "@tanstack/react-table";
import { AuditLogType } from "./columns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Download } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { useSession } from "next-auth/react";
import { ENDPOINT } from "@/constants/endpoint";
import moment from "moment";
import PaginationComponent from "@/components/pagination-table";

export default function AuditLog() {
  const [listRoleGroup, setListRoleGroup] = useState<any>([]);
  const axiosAuth = useApiAuth();
 
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [listAudit, setListAudit] = useState([]);
  const [pageCount, setPageCount] = useState<number>(1); 
  const [filterData, setFilterData] = useState({
    page: page,
    pageSize: pageSize,
  });
  const { data: session } = useSession();
  
  useEffect(() => {
    axiosAuth
      .get("Audit/", {
        params: filterData,
      })
      .then((res) => {
        setListAudit(res.data.items);
        setPageCount(res.data.totalFilter)
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);
  useEffect(() => {
    session &&
      axiosAuth.get(ENDPOINT.LIST_ALL_ROLE_GROUP).then((res) => {
        setListRoleGroup(res.data);
        
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  useEffect(() => {
    setFilterData({
      ...filterData,
      page: page,
      pageSize: pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);
  const downloadFile = (row: any) => {
    const id = row.getValue('id')
    axiosAuth
      .get(`Audit/Download/${id}`, {
        params: filterData,
        responseType: "arraybuffer",
      })
      .then((res) => {
        const fileURL: string = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/xlsx" })
        );
        try {
          const alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = `audit_log.xlsx`;
          alink.click();
        } catch (error) {
          // console.error('Error while creating blob and initiating download', error);
        }
      });
  };
  const columns: ColumnDef<AuditLogType>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return ''
      },
      cell: ({ row }) => {
        return '';
      },
    },
    {
      accessorKey: "createDateTime",
      header: ({ column }) => {
        return (
          <div className="flex justify-start pl-1">
            <Button
              variant="link"
              className="p-0 hover:no-underline"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Exported Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const ExportedDate: string = row.getValue("createDateTime");
        return (
          <div className="flex justify-start pl-4">
            <p>{moment(ExportedDate).format("DD/MM/YYYY")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "user",
      header: ({ column }) => {
        return (
          <div className="flex justify-start pl-1">
            <Button
              variant="link"
              className="p-0 hover:no-underline"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const name: any = row.getValue("user");

        return (
          <div className="flex justify-start pl-4">
            <p>
              {name.firstName} {name.lastName}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "fileName",
      header: ({ column }) => {
        return (
          <div className="flex justify-center pl-1">
            <Button
              variant="link"
              className="p-0 hover:no-underline"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              File Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const fileName: string = row.getValue("fileName");

        return (
          <div className="flex justify-center pl-4">
            <p>{fileName}</p>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: ({ column }) => {
        return <div className="flex justify-center">Action</div>;
      },
      cell: ({ row }) => (
        <div className="w-full flex gap-4 justify-center items-center">
          <Button
            className="p-0 w-8 h-8"
            variant="link"
            onClick={() => {
              downloadFile(row);
            }}
          >
            <Download />
          </Button>
        </div>
      ),
    },
  ];
  
  return (
    <PageLayout title="Audit Log">
      <FormExport
        listRoleGroup={listRoleGroup}
        page={page}
        pageSize={pageSize}
        setPage={(value: number) => setPage(value)}
        setPageSize={(value: number) => setPageSize(value)}
      />
      <div className="mt-4">
        <FormSearch
          listRoleGroup={listRoleGroup}
          filterData={filterData}
          setFilterData={(value: any) => setFilterData(value)}
        />
        <DataTable columns={columns} data={listAudit} pageSize={pageSize} />
        <PaginationComponent
        pageSize={pageSize}
        currentPage={page}
        itemCount={pageCount}
        setPageSize={(value: string) => setPageSize(parseInt(value))}
        setCurrentPage={(value: string) => setPage(parseInt(value))}
      />
      </div>
    </PageLayout>
  );
}
