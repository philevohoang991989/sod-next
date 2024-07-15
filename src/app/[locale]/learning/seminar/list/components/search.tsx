"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/subnav-accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchFormSchema = z.object({
  courseIds: z.any().optional(),
});
type SearchFormValues = z.infer<typeof searchFormSchema>;
const defaultValues: Partial<SearchFormValues> = {
  courseIds: [],
};
interface Props {
  setFilter?: (data: any) => void;
  filter?: any;
}
export default function Search({ setFilter, filter }: Props) {
  const [dataSearch, setDataSearch]=useState({})
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();
  const [listCourse, setListCourse] = useState([]);
  const axiosAuth = useApiAuth();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });
  const onSubmit = async (data: SearchFormValues) => {
    console.log({ data });

     setDataSearch(prevFilter => ({
      ...prevFilter,
      ...data
    }));
  };
  useEffect(()=>{
    typeof setFilter === "function" && setFilter(dataSearch)
  },[dataSearch])
  useEffect(() => {
    session &&
      axiosAuth.get("Course/Export").then((res) => {
        console.log({ res });
        setListCourse(res.data);
      });
  }, [session]);
  const filteredCourses = listCourse.filter((course: any) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="w-[250px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 flex-col w-[100%] "
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-none ">
              <AccordionTrigger>Course Subject</AccordionTrigger>
              <AccordionContent>
                <Input
                  className="mb-[12px]"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="h-[15rem] w-[100%] overflow-x-hidden flex flex-col gap-1 overflow-y-auto">
                  {filteredCourses.map((item: any) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="courseIds"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked: any) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: any) => value !== `${item.id}`
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button type="submit">Search</Button>
        </form>
      </Form>
    </div>
  );
}
