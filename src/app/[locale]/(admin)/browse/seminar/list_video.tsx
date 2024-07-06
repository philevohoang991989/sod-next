"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DeltePopup } from "./components/popup-delete";
import { Reorder } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { updateIdVideo } from "@/redux/slices/seminarSlice";
import useApiAuth from "@/lib/hook/useAxiosAuth";

interface Props {
  listVideos?: any;
}
export default function ListVideo({ listVideos }: Props) {
  console.log({ listVideos });
  const dispatch = useDispatch();
  const axiosAuth = useApiAuth();
  const seminar = useSelector((state: any) => state.seminar);
  const [items, setItems] = useState<any>([]);
  const [isDragging, setIsDragging] = useState(true);
  const defaultVideo = {
    id: 0,
    size: 0,
    duration: 0,
    videoName: "",
    languageVideoId: "",
    speakers: [],
    asTrailer: false,
    timeSpanVideos: [],
  };
  const addVideo = () => {
    console.log("Add Video");
    const newSeminar = { ...defaultVideo };
    setItems((prevItems: any) => [...prevItems, newSeminar]);
  };
  const applyReOrder = () => {
    setIsDragging(true);
  };
  const handleReorderClick = () => {
    // Implement logic to toggle reordering, e.g., showing a message or disabling/enabling the button
    setIsDragging(!isDragging);
  };
  const handleDelete = (item: any) => {
    axiosAuth
      .delete(`Seminar/${seminar.idSeminar}/video/${item.id}`)
      .then((res) => {
        setItems((prevUsers: any) =>
          prevUsers.filter((itemVideo: any) => item.id !== itemVideo.id)
        );
      });
    listVideos.splice(listVideos.indexOf(item), 1);
  };
  useEffect(() => {
    if (listVideos && listVideos.length > 0) {
      setItems(listVideos);
      dispatch(updateIdVideo(listVideos[0].id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listVideos]);

  return (
    <div className="w-max-content border-r-none lg:border-r-[1px] border-r-[#D0D5DD]">
      <div className="px-[1.5rem] py-[1rem] ">
        <div className="flex gap-[12px] relative">
          <Button
            className="w-[100%] bg-[#EFF8FF] text-[#0D6999]"
            // disabled={pathname === "/seminar/create"}
            onClick={() => addVideo()}
          >
            Add another Seminar
          </Button>
          {!isDragging ? (
            <Button
              className="w-[120px]"
              onClick={() => {
                applyReOrder();
              }}
            >
              Apply
            </Button>
          ) : (
            <Button
              className="w-[120px]"
              //   disabled={
              //     (pathname === "/seminar/create" && disable) ||
              //     items.length === 0
              //   }
              onClick={() => handleReorderClick()}
            >
              Re-order List
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-[12px] mt-[1rem]">
          <Reorder.Group
            values={items}
            onReorder={setItems}
            draggable={isDragging}
          >
            <RadioGroup
              value={
                seminar.idVideo
                  ? `${seminar.idVideo}`
                  : seminar.idVideo === 0
                  ? "0"
                  : listVideos && listVideos.length > 0 && `${listVideos[0].id}`
              }
              className="flex flex-col gap-3"
            >
              {items.map((item: any) => (
                <Reorder.Item value={item} key={item.id}>
                  <div className="item">
                    <RadioGroupItem
                      value={`${item.id}`}
                      id={`${item.id}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`${item.id}`}
                      className="flex items-center justify-between rounded-md border-[1px] border-[#D0D5DD] bg-white p-4 hover:bg-[#EFF8FF] hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#EFF8FF] [&:has([data-state=checked])]:border-primary"
                      onClick={() => {
                        dispatch(updateIdVideo(item.id));
                      }}
                    >
                      <div className="text-[14px] font-medium text-[#101828]">
                        {item.videoName}
                      </div>
                      <DeltePopup
                        idItem={item.id}
                        title="Are you sure you want to remove this Video?"
                        message=""
                        handleOk={() => {
                          handleDelete(item);
                        }}
                      />
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
