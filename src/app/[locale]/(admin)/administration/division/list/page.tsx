"use client";
import PageLayout from "@/components/PageLayout";
import { ENDPOINT } from "@/constants/endpoint";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Division } from "./columns";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { Switch } from "@/components/ui/switch";
import Edit from "@/assets/icons/edit.svg";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const editFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.boolean(),
});
type EditFormValues = z.infer<typeof editFormSchema>;
const defaultValues: Partial<EditFormValues> = {
  id: 0,
  name: "",
  status: false,
};
export default function DivisionControl() {
  const [showDialog, setShowDialog] = useState(false);
  const form = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues,
  });
  const columns: ColumnDef<Division>[] = [
    {
      accessorKey: "id",
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
              No.
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const loginType: string = row.getValue("id");
        return (
          <div className="flex justify-start pl-4">
            <p>{loginType}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
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
              Division Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const name: string = row.getValue("name");
        return (
          <div className="flex justify-start pl-4">
            <p>{name}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
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
              Active
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const name: boolean = row.getValue("status");
        return (
          <div className="flex justify-start pl-4">
            <Switch checked={name} />
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
              setShowDialog(true);
              const id: number = row.getValue("id");
              const name: string = row.getValue("name");
              const status: boolean = row.getValue("status");
              row.getValue("resolutionVersion");
              form.reset({
                id: id,
                name: name,
                status: status,
              });
            }}
          >
            <Image width={20} height={20} src={Edit} alt="Edit" />
          </Button>
        </div>
      ),
    },
  ];
  const [listDivision, setListDivision] = useState<any>([]);
  const axiosAuth = useApiAuth();
  const { data: session } = useSession();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const [filter, setFilter] = useState<any>({
    page: page,
    pageSize: pageSize,
  });
  useEffect(() => {
    session &&
      axiosAuth.get(ENDPOINT.LIST_DIVISION).then((res) => {
        console.log({ res });
        setListDivision(res.data.items);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, filter]);
  const onSubmit = async (data: EditFormValues) => {
    console.log({ data });
    const datapost = {
      id: 0,
      name: data.name,
      status: data.status,
    };
    axiosAuth.put(`Division/${data.id}`, datapost).then((res) => {
      setShowDialog(false);
      toast({
        title: "Update Division Success",
      });
    });
  };
  return (
    <PageLayout title="Division Control">
      <DataTable columns={columns} data={listDivision} pageSize={pageSize} />
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Division</DialogTitle>
              <DialogDescription>
                Do you want edit the Division?
              </DialogDescription>
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
                        <Input disabled placeholder="Login Type" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-[100%] mt-2 h-[36px] rounded-lg bg-primary text-white"
                >
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
