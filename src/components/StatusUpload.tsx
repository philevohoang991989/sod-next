"use client";
import React, { useState, useEffect } from "react";
// import styles from './StatusComponent.module.css';
import { StatusUpload, StatusVideo } from "@/constants";
import ProgressCircle from "./ProgressCircle";

interface StatusComponentProps {
  status?: any;
  percent?: number;
  type?: string;
}

const Status: React.FC<StatusComponentProps> = ({
  status = 0,
  percent = 0,
  type = "",
}) => {
  const [Type, setType] = useState<any>(StatusUpload);
  console.log({ status });

  useEffect(() => {
    switch (type) {
      case "StatusUpload":
        setType(StatusUpload);
        break;
      default:
        setType(StatusVideo);
    }
  }, [type]);

  const getClass = (status: number): string => {
    return `${Type[status]}`;
  };

  const getLabel = (status: string): React.ReactNode => {
    switch (status) {
      case 'PENDING':
        return <span className="text-[14px] px-4 py-1 rounded-[100px] font-medium bg-[#EFF8FF] text-[#175CD3]">PENDING</span>;
      case 'NEW':
        return <span className="text-[12px] px-4 py-1 rounded-[100px] font-medium bg-[#EFF8FF] text-[#175CD3]">NEW</span>;
      case 'FAIL':
        return <span className="text-[12px] px-4 py-1 rounded-[100px] font-medium bg-[#FEF3F2] text-[#b42318]">FAIL</span>;
      default:
        return 'Unknown';
    }
  };

  return (
    <div>
      {status !== "PROCESS" ? (
        <span>{getLabel(status)}</span>
      ) : (
        <div
          className={`d-flex flex-row justify-content-between align-items-center`}
        >
          {/* <span >{percent}</span> */}
          <ProgressCircle progress={percent} color="#0D6999" />
        </div>
      )}
    </div>
  );
};

export default Status;
