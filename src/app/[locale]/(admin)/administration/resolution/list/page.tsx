"use client";
import { DataTable } from "@/components/data-table";
import PageLayout from "@/components/PageLayout";
import { Resolution } from "./columns";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { ENDPOINT } from "@/constants/endpoint";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Edit from "@/assets/icons/edit.svg";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

const editFormSchema = z.object({
  loginType: z.string(),
  resolutionVersion: z.string(),
});
type EditFormValues = z.infer<typeof editFormSchema>;
const defaultValues: Partial<EditFormValues> = {
  loginType: "",
  resolutionVersion: "",
};

export default function ResolutionControl() {
  const axiosAuth = useApiAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [listResolution, setListResolution] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const { data: session } = useSession();
  const [pageSize, setPageSize] = useState(9999999);
  const form = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues,
  });
  const columns: ColumnDef<Resolution>[] = [
    {
      accessorKey: "loginType",
      header: ({ column }) => {
        return (
         <div className="flex justify-start pl-1">
           <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Login Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
         </div>
        );
      },
      cell: ({ row }) => {
        const loginType: string = row.getValue("loginType");
        return <div className="flex justify-start pl-4">
          <p>{loginType}</p>
        </div>;
      },
    },
    {
      accessorKey: "resolutionVersion",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
            variant="link"
            className="p-0 hover:no-underline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Resolution Version
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const resolutionVersion: string = row.getValue("resolutionVersion");
        return <div className="flex justify-center">
          <p>{resolutionVersion}p</p>
        </div>;
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
              let loginType: number = row.getValue("loginType");
              const resolutionVersion: string = row.getValue("resolutionVersion");
              form.reset({
                loginType: `${loginType}`,
                resolutionVersion: resolutionVersion,
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
      axiosAuth.get(ENDPOINT.LIST_RESOLUTION).then((res) => {
        res.data.map((item: any, index: number) => {
          const result = Object.entries(res.data).map(([key, value]) => ({
            loginType: key,
            resolutionVersion: value as string,
          }));
          console.log({result});
          
          setListResolution(result);
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const onSubmit = async (data: EditFormValues) => {
    const objectFromArray = listResolution.reduce((acc: any, item: any) => {
      acc[item.loginType]  = item.resolutionVersion;
      return acc;
  }, {} as { [key: string]: string });
  console.log({objectFromArray});
    // axiosAuth
    //   .put(`RoleGroupUser/${data.userId}`, { roleGroupId: data.groupId })
    //   .then((res) => {
    //     setShowDialog(false);
    //     toast({
    //       title: "Update User permission Success",
    //     });
    //   });
  };
  return (
    <PageLayout title="Resolution Control">
      <DataTable columns={columns} data={listResolution} pageSize={pageSize} />
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
                  name="loginType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Login Type</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="Login Type" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resolutionVersion"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Resolution Version</FormLabel>
                      <FormControl>
                      <Input  placeholder="Resolution Version" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogClose type="submit" className="w-[100%] mt-2 h-[36px] rounded-lg bg-primary text-white">
                  Update
                </DialogClose>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </PageLayout>
  );
}
