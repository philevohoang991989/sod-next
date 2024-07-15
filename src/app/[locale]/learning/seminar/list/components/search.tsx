"use client";

import { Form } from "@/components/ui/form";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchFormSchema = z.object({
  courseIds: z.array(z.any()).optional(),
});
type SearchFormValues = z.infer<typeof searchFormSchema>;
const defaultValues: Partial<SearchFormValues> = {
  courseIds: [],
};
interface Props {
  setFilter?: (data: any) => void;
}
export default function Search({ setFilter }: Props) {
  const { data: session } = useSession();
  const [listCourse, setListCourse] = useState([]);
  const axiosAuth = useApiAuth();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });
  const onSubmit = async (data: SearchFormValues) => {
    typeof setFilter === "function" && setFilter(data);
  };
  useEffect(() => {
    session &&
      axiosAuth.get("Course/Export").then((res) => {
        console.log({ res });
        setListCourse(res.data);
      });
  }, [session]);
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 flex-col w-[100%]"
        >
          asdasdasd
        </form>
      </Form>
    </div>
  );
}
