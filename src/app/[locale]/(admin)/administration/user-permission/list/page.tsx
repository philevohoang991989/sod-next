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
import Edit from "@/assets/icons/edit.svg";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { toast } from "@/components/ui/use-toast";
import PaginationComponent from "@/components/pagination-table";

const editFormSchema = z.object({
  userId: z.number(),
  groupId: z.string(),
  name: z.string(),
});
type EditFormValues = z.infer<typeof editFormSchema>;
const defaultValues: Partial<EditFormValues> = {
  userId: 0,
  groupId: "",
  name: "",
};

export default function ListUserPermission() {
  const [showDialog, setShowDialog] = useState(false);
  const axiosAuth = useApiAuth();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const [listUserPermission, setListUserPermission] = useState([]);
  const [listRoleGroup, setListRoleGroup] = useState<any>([]);
  const [filter, setFilter] = useState<any>({
    page: page,
    pageSize: pageSize,
    userId: "",
    roleGroupId: "",
  });
  const { data: session } = useSession();
  const form = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues,
  });
  const displayRoleGroup = (idRoleGroup: number) => {
    const roleGroup = listRoleGroup.find((x: any) => x.id == idRoleGroup);
    return roleGroup?.name ?? "";
  };
  const onSubmit = async (data: EditFormValues) => {
    axiosAuth
      .put(`RoleGroupUser/${data.userId}`, { roleGroupId: data.groupId })
      .then((res) => {
        setShowDialog(false);
        toast({
          title: "Update User permission Success",
        });
      });
  };
  const columns: ColumnDef<UserPermission>[] = [
    {
      accessorKey: "userId",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
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
            First Name
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
      accessorKey: "lastName",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const lastName: string = row.getValue("lastName");
        return <p>{lastName}</p>;
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
        const groupId: number = row.getValue("groupId");
        return <p>{displayRoleGroup(groupId)}</p>;
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
              setShowDialog(true);
              let groupId: number = row.getValue("groupId");
              const lastName: string = row.getValue("lastName");
              const userId: number = row.getValue("userId");
              const firstName: string = row.getValue("firstName");
              form.reset({
                groupId: `${groupId}`,
                name: `${firstName} ${lastName}`,
                userId: userId,
              });
            }}
          >
            <Image width={20} height={20} src={Edit} alt="Edit" />
          </Button>
        </div>
      ),
    },
  ];

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
        setListRoleGroup(res.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, filter]);
  useEffect(() => {
    setFilter({
      ...filter,
      page: page,
      pageSize: pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);
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
      <PaginationComponent
        pageSize={pageSize}
        currentPage={page}
        itemCount={pageCount}
        setPageSize={(value: string) => setPageSize(parseInt(value))}
        setCurrentPage={(value: string) => setPage(parseInt(value))}
      />
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User Permission</DialogTitle>
              <DialogDescription>Do you want edit the video?</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="Your name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="groupId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Roles</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[100%] rounded-lg border h-[44px] text-left px-2">
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
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-[100%] mt-2">
                  Update
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </PageLayout>
  );
}
