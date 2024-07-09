"use client";
import PageLayout from "@/components/PageLayout";
import { ENDPOINT } from "@/constants/endpoint";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Filter from "./filter";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { UserPermission } from "./columns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";

export default function ListUserPermission() {
  const columns: ColumnDef<UserPermission>[] = [
    {
      accessorKey: "postTitle",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Post Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const firstName: string = row.getValue("firstName");
        return <p>{firstName}</p>;
      },
    },
    {
      accessorKey: "govHrm",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            GovHRMS ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const govHrm: string = row.getValue("govHrm");
        return <p>{govHrm ? govHrm : ""} </p>;
      },
    },
    {
      accessorKey: "groupId",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Roles
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const groupId: string = row.getValue("groupId");
        console.log({ groupId: typeof `${groupId}` });

        return (
          <Select>
            <SelectTrigger className="w-80">
              <SelectValue placeholder="Not specified" />
            </SelectTrigger>
            <SelectContent>
              {listRoleGroup.map((item: any) => (
                <SelectItem key={item.id} value={`${item.id}`}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
  ];
  const axiosAuth = useApiAuth();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const [listUserPermission, setListUserPermission] = useState([]);
  const [listRoleGroup, setListRoleGroup] = useState([]);
  const [filter, setFilter] = useState<any>({
    page: page,
    pageSize: pageSize,
    userId: "",
    roleGroupId: "",
  });
  const { data: session } = useSession();
  useEffect(() => {
    session &&
      axiosAuth
        .get(ENDPOINT.LIST_USER_PERMISSION, {
          params: filter,
        })
        .then((res) => {
          console.log({ res });
          setListUserPermission(res.data.items);
          setPageCount(res.data.totalFilter);
        });
    session &&
      axiosAuth.get(ENDPOINT.LIST_ALL_ROLE_GROUP).then((res) => {
        console.log({ res });
        setListRoleGroup(res.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, filter]);
  return (
    <PageLayout title="Users Permission">
      <Filter
        setFilter={setFilter}
        setPageSize={setPageSize}
        setPage={setPage}
      />
      <DataTable
        columns={columns}
        data={listUserPermission}
        pageSize={pageSize}
      />
    </PageLayout>
  );
}
