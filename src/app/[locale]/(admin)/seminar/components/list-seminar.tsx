import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { usePathname } from "next/navigation";
import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { ENDPOINT } from "@/constants/endpoint";
type Props = {
  idSeminar?: any;
};
export default function ListSeminar({ idSeminar }: Props) {
  const axiosAuth = useAxiosAuth();
  const [items, setItems] = useState([]);
  const [isDragging, setIsDragging] = useState(true);
  const pathname = usePathname();
  const handleDelete = (id: any) => {
    setItems((prevUsers) => prevUsers.filter((item) => item !== id));
  };
  const handleReorderClick = () => {
    // Implement logic to toggle reordering, e.g., showing a message or disabling/enabling the button
    setIsDragging(!isDragging);
    console.log("handleReorderClick");
  };
  useEffect(() => {
    idSeminar !== 0 &&
      axiosAuth
        .get(ENDPOINT.LIST_SIBLING.replace(":id", idSeminar))
        .then((res) => {
          console.log({ res });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-max-content border-r-[1px] border-r-[#D0D5DD]">
      <div className="px-[1.5rem] py-[1rem] border-b-[1px] border-[#D0D5DD] text-[18px] font-semibold text-[#101828]">
        List Seminar
      </div>
      <div className="px-[1.5rem] py-[1rem] ">
        <div className="flex gap-[12px] relative">
          <Button
            className="w-[100%] bg-[#EFF8FF] text-[#0D6999]"
            disabled={pathname === "/seminar/create"}
          >
            Add another Seminar
          </Button>
          <Button
            className="w-[100%]"
            disabled={pathname === "/seminar/create"}
            onClick={handleReorderClick}
          >
            Re-order List
          </Button>
        </div>
        <div className="flex flex-col gap-[12px] mt-[1rem]">
          <Reorder.Group
            values={items}
            onReorder={setItems}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            draggable={isDragging}
          >
            <RadioGroup defaultValue="card" className="flex flex-col gap-3">
              {items.map((item) => (
                <Reorder.Item value={item} key={item}>
                  <div className="item">
                    <RadioGroupItem
                      value={`${item}`}
                      id={`${item}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`${item}`}
                      className="flex items-center justify-between rounded-md border-[1px] border-[#D0D5DD] bg-white p-4 hover:bg-[#EFF8FF] hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#EFF8FF] [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="text-[14px] font-medium text-[#101828]">
                        {item}
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-[1rem]"
                        onClick={() => {
                          handleDelete(item);
                        }}
                      >
                        <Trash size={16} color="#667085" />
                      </Button>
                    </Label>
                  </div>
                </Reorder.Item>
              ))}
            </RadioGroup>
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
}
