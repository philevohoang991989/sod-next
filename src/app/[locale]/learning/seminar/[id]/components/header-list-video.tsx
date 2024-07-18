
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Arrow from "@/assets/icons/arrow.svg";
import Play from "@/assets/icons/play.svg";

interface Props {
  infoSeminar: any;
  listVideo: any;
  setIsHide:(value: boolean)=>void;
  isHide:boolean;
}
export default function HeaderListVideo({ infoSeminar, listVideo ,setIsHide, isHide}: Props) {
  
  const viewed = () => {
    return listVideo && listVideo.filter((x: any) => x.viewed === true).length;
  };
  const hideList = () => {};
  return (
    <div className="flex justify-between items-center">
      <p className="text-[#101828] text-[1rem] font-semibold">
        {infoSeminar ? infoSeminar.seminarName : ""}
      </p>
      <div className="flex justify-start gap-1 text-[#101828] text-[14px] font-medium items-center">
        <Image height={20} width={20} src={Play} alt="Play" />{" "}
        <p>
          {" "}
          {viewed()}/{listVideo && listVideo.length}
        </p>
        |
        <Timer size={20} />
        {moment.utc(+(infoSeminar?.totalDuration ?? 0)).format("HH:mm:ss")}
        <Button className="p-0" variant="link" onClick={() => setIsHide(!isHide)}>
          <Image src={Arrow} alt="Arrow" />
        </Button>
      </div>
    </div>
  );
}
