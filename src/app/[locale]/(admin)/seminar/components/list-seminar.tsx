import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Trash } from "lucide-react";

export default function ListSeminar() {
  return (
    <div className="w-max-content border-r-[1px] border-r-[#D0D5DD]">
      <div className="px-[1.5rem] py-[1rem] border-b-[1px] border-[#D0D5DD] text-[18px] font-semibold text-[#101828]">
        List Seminar
      </div>
      <div className="px-[1.5rem] py-[1rem] ">
        <div className="flex gap-[12px] relative">
          <Button className="w-[100%] bg-[#EFF8FF] text-[#0D6999]">
            Add another Seminar
          </Button>
          <Button className="w-[100%]">Re-order List</Button>
        </div>
        <div className="flex flex-col gap-[12px] mt-[1rem]">
          <RadioGroup defaultValue="card" className="flex flex-col gap-3">
            <div className="item">
              <RadioGroupItem
                value="paypal"
                id="paypal"
                className="peer sr-only"
              />
              <Label
                htmlFor="paypal"
                className="flex items-center justify-between rounded-md border-[1px] border-[#D0D5DD] bg-white p-4 hover:bg-[#EFF8FF] hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#EFF8FF] [&:has([data-state=checked])]:border-primary"
              >
                <div className="text-[14px] font-medium text-[#101828]">
                  Semianr 1
                </div>
                <Button variant="link" className="p-0 h-[1rem]">
                  <Trash size={16} color="#667085" />
                </Button>
              </Label>
            </div>
            <div className="item">
              <RadioGroupItem
                value="apple"
                id="apple"
                className="peer sr-only"
              />
              <Label
                htmlFor="apple"
                className="flex items-center justify-between rounded-md border-[1px] border-[#D0D5DD] bg-white p-4 hover:bg-[#EFF8FF] hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-[#EFF8FF]"
              >
                <div className="text-[14px] font-medium text-[#101828]">
                  Semianr 2
                </div>
                <Button variant="link" className="p-0 h-[1rem]">
                  <Trash size={16} color="#667085" />
                </Button>
              </Label>
            </div>
          </RadioGroup>
          
        </div>
      </div>
    </div>
  );
}
