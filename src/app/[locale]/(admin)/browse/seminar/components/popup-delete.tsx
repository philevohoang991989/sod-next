import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import icDelete from "@/assets/icons/ic_delete.svg";
import Image from "next/image";

interface Props {
  idItem: number;
  title?: string;
  message?: string;
  handleOk?: () => void;
}
export function DeltePopup({ idItem, title, message, handleOk }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0">
          <Trash size={16} color="#667085" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] flex flex-col gap-6">
        <div className="flex justify-start items-start gap-4">
          <Image width={40} height={40} src={icDelete} alt="icDelete" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[1rem] text-[#101828]">{title}</p>
            <p className="text-[14px] text-[#667085]">{message}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="w-full text-[1rem] bg-white text-[#344054] border-[1px] shadow-none border-[#D0D5DD] hover:bg-white">
            Cancel
          </Button>
          <DialogClose
            onClick={handleOk}
            className="w-full bg-[#F04438] hover:bg-[#F04438] rounded-md text-white"
          >
            Delete
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
