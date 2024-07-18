"use client";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { updateIdVideo } from "@/redux/slices/learningSlice";
import { Timer, User } from "lucide-react";
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
        value={itemVideo}
        id={`${itemVideo.id}`}
        className="peer sr-only"
      />
      <Label
        htmlFor={`${itemVideo.id}`}
        className="flex items-center justify-between rounded-md border-[1px] border-[#D0D5DD] bg-white p-4 hover:bg-[#EFF8FF] hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#EFF8FF] [&:has([data-state=checked])]:border-primary"
        onClick={() => {
          dispatch(updateIdVideo(itemVideo.id));
        }}
      >
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-medium text-[#101828]">
            {itemVideo.videoName}
          </p>
          <div className="flex items-center gap-[6px]">
            <Timer size={18} color="#667085" />{" "}
            <p className="text-[12px] font-medium leading-4 mt-1 text-[#101828]">
              {moment.utc(+(itemVideo.duration ?? 0)).format("HH:mm:ss")}
            </p>
          </div>
          <div className="flex items-center gap-[6px]">
            <User size={18} color="#667085"/>
            <div className="mt-1">{itemVideo.speakers.map((item: any, index: number) => {
              return (
                <p key={index} className="text-[12px] font-medium">
                  {item.fullName}
                  {itemVideo.speakers.length === index + 1 ? "" : ","}{" "}
                </p>
              );
            })}</div>
          </div>
        </div>
      </Label>
    </div>
  );
}
