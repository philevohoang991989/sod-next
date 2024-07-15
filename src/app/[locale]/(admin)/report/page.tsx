"use client";
import { DataTable } from "@/components/data-table";
import PageLayout from "@/components/PageLayout";
import {
  columnsDurationByGrade,
  columnsHitRateByGrade,
  columnsRecommendedList,
  columnsScoringReport,
  columnsSODAdmin,
  columnsSODUser,
  columnsVideoStatistic,
  colunsHitRateByAccumulatedDuration,
} from "./components/columns";
import { useEffect, useState } from "react";
import SearchReport from "./components/search";
import moment from "moment";
import PaginationComponent from "@/components/pagination-table";
import { Button } from "@/components/ui/button";
import useApiAuth from "@/lib/hook/useAxiosAuth";

export default function ReportPage() {
  const axiosAuth = useApiAuth()
  const [reportType, setReportType] = useState<any>();
  const [columns, setColumns] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: 10,
    addedDateFrom: moment().subtract(1, "year").format("MM-DD-YYYY"),
    addedDateTo: moment().format("MM-DD-YYYY"),
  });
  useEffect(() => {

    switch (reportType) {
      case "2":
        setColumns(columnsHitRateByGrade);
        break;
      case "3":
        setColumns(colunsHitRateByAccumulatedDuration);
        break;
      case "4":
        setColumns(columnsVideoStatistic);
        break;
      case "5":
        setColumns(columnsSODUser);
        break;
      case "6":
        setColumns(columnsScoringReport);
        break;
      case "7":
        setColumns(columnsRecommendedList);
        break;
      case "8":
        setColumns(columnsSODAdmin);
        break;
      default:
        setColumns(columnsDurationByGrade);
        break;
    }
  }, [reportType]);
  useEffect(() => {
    setFilter({
      ...filter,
      page: page,
      pageSize: pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);
  const [listReport, setListReport] = useState([]);
  const downloadReport =()=>{
    console.log('downloadReport');
    axiosAuth
      .get(`Report/${reportType}/export`, {
        params: filter,
        responseType: "arraybuffer",
      })
      .then((res) => {
        const fileURL: string = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/xlsx" })
        );
        try {
          const alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = `report_${moment().format('DD-MM-YYYY')}.xlsx`;
          alink.click();
        } catch (error) {
          // console.error('Error while creating blob and initiating download', error);
        }
      });
  }
  return (
    <PageLayout title="Report">
     <div className="flex justify-between items-start">
     <SearchReport
        setFilter={(value: any) => setFilter(value)}
        setListReport={(value: any) => setListReport(value)}
        setReportType={(value: any) => setReportType(value)}
        filter={filter}
        reportType={reportType}
        setPageCount={setPageCount}
      />
      <Button className="h-[44px]" onClick={()=> downloadReport()}>Download Report</Button>
     </div>
      <DataTable columns={columns} data={listReport} pageSize={10} />
      <PaginationComponent
        pageSize={pageSize}
        currentPage={page}
        itemCount={pageCount}
        setPageSize={(value: string) => setPageSize(parseInt(value))}
        setCurrentPage={(value: string) => setPage(parseInt(value))}
      />
    </PageLayout>
  );
}
