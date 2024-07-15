"use client";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import UploadVideo from "@/assets/icons/upload_video.svg";
import Trash from "@/assets/icons/trash.svg";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { ENDPOINT } from "@/constants/endpoint";
import Status from "@/components/StatusUpload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";
import { updateListVideoUpload } from "@/redux/slices/seminarSlice";
import { useRouter } from "next/navigation";

interface ProgressInfo {
  percent: number;
  fileName: string;
  size: number;
  status: string;
  id: number;
  file: File;
}

export default function UploadPage() {
  const axiosAuth = useApiAuth();
  const dispatch = useDispatch()
  const router = useRouter()
  const [progressInfos, setProgressInfos] = useState<ProgressInfo[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const acceptedExtensions = [".mp4"];
  const eventAllFileUpload = useRef<Set<number>>(new Set());

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length) {
      batchUpload(files);
    }
    event.target.value = "";
  };

  const batchUpload = (files: FileList) => {
    const allAccept = Array.from(files).every((file) =>
      isAcceptedExtension(file.name)
    );
    if (!allAccept) {
      toast({
        title: "File not allowed!",
      });
      return;
    }

    const data = Array.from(files).map((file) => ({
      percent: 0,
      fileName: file.name,
      size: file.size,
      status: "PENDING",
      id: 0,
      file: file,
    }));

    setProgressInfos((prevProgressInfos) => [...prevProgressInfos, ...data]);

    data.forEach((item, index) => {
      if (item.status === "PENDING") {
        upload(progressInfos.length + index, item.file);
      }
    });
  };

  const getStatusCode = (httpType: string) => {
    switch (httpType) {
      case "UPLOAD_PROGRESS":
        return "PROCESS";
      case "RESPONSE":
        return "NEW";
      case "SENT":
        return "PROCESS";
      case "-1":
        return "FAIL";
    }
  };

  const upload = (idx: number, file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    axiosAuth
      .post(ENDPOINT.UPLOAD_VIDEO, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event: any) => {
          const percentCompleted = Math.round(
            (event.loaded * 100) / event.total
          );
          setProgressInfos((prevProgressInfos) => {
            const newProgressInfos: any = [...prevProgressInfos];
            newProgressInfos[idx].percent = percentCompleted;
            newProgressInfos[idx].status = getStatusCode("UPLOAD_PROGRESS");
            return newProgressInfos;
          });
        },
      })
      .then((response) => {
        setProgressInfos((prevProgressInfos) => {
          const newProgressInfos : any = [...prevProgressInfos];
          newProgressInfos[idx].status = getStatusCode("RESPONSE");
          newProgressInfos[idx].id = response.data.id;
          eventAllFileUpload.current.add(response.data.id);
          return newProgressInfos;
        });

        // if (eventAllFileUpload.current.size === (selectedFiles?.length ?? 0)) {
        //   toast({
        //     title: "Upload successfully! Do you want to edit the video?",
        //   });
        // }
      })
      .catch((error) => {
        setProgressInfos((prevProgressInfos) => {
          const newProgressInfos: any = [...prevProgressInfos];
          newProgressInfos[idx].percent = 0;
          newProgressInfos[idx].status = getStatusCode("-1");
          return newProgressInfos;
        });
        toast({
          title: `${file.name}: Failed! ${error.response?.data?.message || ""}`,
        });
      });
  };

  const isAcceptedExtension = (fileName: string) => {
    const extension = fileName
      .substring(fileName.lastIndexOf("."))
      .toLowerCase();
    return acceptedExtensions.includes(extension);
  };

  const deleteFile = (fileDelete: ProgressInfo) => {
    setProgressInfos((prevProgressInfos) =>
      prevProgressInfos.filter((item) => item !== fileDelete)
    );
    if (fileDelete.id > 0) {
      axiosAuth.delete(`/Video/${fileDelete.id}`);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      batchUpload(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const allDone = progressInfos.every(
      (fileData) => fileData.status === "NEW"
    );
    if (allDone && progressInfos.length > 0) {
      const ids = progressInfos.map((p) => p.id).filter((id) => !!id);
      dispatch(updateListVideoUpload(ids))
      setShowDialog(true);

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressInfos]);

  return (
    <PageLayout title="Upload Video">
      <div className=" bg-white p-[32px] rounded-[0.5rem]">
        <div
          className="common-upload borer-gray"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="d-flex flex-column justify-content-between align-items-center gap-3 body-upload">
            <p className="mb-4 font-semibold text-[#101828]">Upload Video</p>
            <div className="upload-icon borer-gray p-8 border-dashed border rounded-lg">
              <label className="upload-button hover:cursor-pointer flex justify-center flex-col gap-4 items-center">
                <input
                  className="hidden"
                  type="file"
                  multiple
                  onChange={selectFiles}
                />{" "}
                <Image src={UploadVideo} alt="upload video" />
                <div className="flex flex-col gap-2 items-center">
                  <p className="font-normal text-[14px] text-[#667085]">
                    <span className="click font-semibold text-[14px] text-[#0D6999]">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-[#667085] text-[14px]">
                    Your videos will remain private until you make it visible to
                    others
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-[1.5rem] mt-[1.5rem] rounded-[0.5rem]">
        <p className="font-medium text-[#667085] mb-3">List Video Upload</p>
        <div className="flex flex-col gap-4">
          {progressInfos.map((file, index) => (
            <div
              key={index}
              className="w-[100%] flex justify-start items-center p-3 border rounded-[0.5rem] border-[#EAECF0]"
            >
              <span className="w-[50%] font-medium text-[#101828] text-[14px]">
                {file.fileName}
              </span>
              <div className="w-[20%] text-[#667085] text-[14px]">
                {(file.size / 1024 / 1024).toFixed(2)}MB
              </div>
              <div className="w-[20%]">
                <Status
                  status={file.status}
                  percent={file.percent}
                  type="StatusUpload"
                />
              </div>

              <div className="w-[10%] flex justify-end">
                {" "}
                <button onClick={() => deleteFile(file)} className="p-0">
                  <Image src={Trash} alt="Trash" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload successfully</DialogTitle>
              <DialogDescription>
                Do you want edit the video?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-between gap-4">
              <DialogClose className="w-[100%] rounded-md border-[1px] border-input text-sm">Cancel</DialogClose>
             
              <Button className="w-[100%] bg-primary h-[2.5rem] rounded-md text-white" onClick={()=>router.push('/browse/video/edit/all')}>Confirm</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PageLayout>
  );
};
