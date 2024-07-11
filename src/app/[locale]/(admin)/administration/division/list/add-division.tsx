import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  setShowDialogAdd?: (value: boolean) => void;
  showDialogAdd?: boolean;
}
const addFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.boolean(),
});
type AddFormValues = z.infer<typeof addFormSchema>;
const defaultValues: Partial<AddFormValues> = {
  id: 0,
  name: "",
  status: false,
};
export default function AddDivision({
  setShowDialogAdd,
  showDialogAdd,
}: Props) {
  const axiosAuth = useApiAuth();
  const form = useForm<AddFormValues>({
    resolver: zodResolver(addFormSchema),
    defaultValues,
  });
  const onSubmit = async (data: AddFormValues) => {
    console.log({ data });
    const datapost = {
      id: 0,
      name: data.name,
      status: data.status,
    };
    axiosAuth.post(`Division`, datapost).then((res) => {
      typeof setShowDialogAdd === "function" && setShowDialogAdd(false);
      toast({
        title: "Add Division Success",
      });
    });
  };
  return (
    <Dialog
      open={showDialogAdd}
      onOpenChange={() =>
        typeof setShowDialogAdd === "function" &&
        setShowDialogAdd(!showDialogAdd)
      }
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
          <DialogDescription>Do you want add the Division?</DialogDescription>
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
                    <Input placeholder="Name Division" {...field} />
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
  );
}
