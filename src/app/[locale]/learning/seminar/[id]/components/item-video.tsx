"use client";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { updateIdVideo } from "@/redux/slices/learningSlice";
import { Check, Timer, User } from "lucide-react";
import moment from "moment";
import { useDispatch } from "react-redux";

interface Props {
  itemVideo: any;
}
export default function ItemVideo({ itemVideo }: Props) {
  const dispatch = useDispatch();
  return (
    <div className="item">
      <RadioGroupItem
        value={`${itemVideo.id}`}
        id={`${itemVideo.id}`}
        className="peer sr-only"
      />
      <Label
        htmlFor={`${itemVideo.id}`}
        className="flex flex-col items-center relative justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        onClick={() => {
          dispatch(updateIdVideo(itemVideo.id));
        }}
      >
        <div className="flex flex-col gap-2 w-[100%]">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[14px] font-medium text-[#101828] pr-2 w-[70%] break-words">
              {itemVideo.videoName}
            </p>
            {itemVideo.viewed && <Check color="#12B76A" size={20} />}
          </div>

          <div className="flex items-center gap-[6px]">
            <Timer size={18} color="#667085" />{" "}
            <p className="text-[12px] font-medium leading-4 mt-1 text-[#101828]">
              {moment.utc(+(itemVideo.duration ?? 0)).format("HH:mm:ss")}
            </p>
          </div>
          <div className="flex items-center gap-[6px]">
            <User size={18} color="#667085" />
            <div className="mt-1 w-[100%]">
              {itemVideo.speakers.map((item: any, index: number) => {
                return (
                  <span key={index} className="text-[12px] font-medium">
                    {item.fullName}
                    {itemVideo.speakers.length === index + 1 ? "" : ","}{" "}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Label>
    </div>
  );
}
