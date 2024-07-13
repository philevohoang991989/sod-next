"use client";
import { DataTable } from "@/components/data-table";
import PageLayout from "@/components/PageLayout";
import {
  columnsDurationByGrade,
  columnsHitRateByGrade,
  columnsVideoStatistic,
  colunsHitRateByAccumulatedDuration,
} from "./components/columns";
import { useEffect, useState } from "react";
import SearchReport from "./components/search";
import moment from "moment";
import PaginationComponent from "@/components/pagination-table";

export default function ReportPage() {
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
    console.log({ page: typeof reportType });

    switch (reportType) {
      // case 1:
      //   setColumns(columnsDurationByGrade);
      //   break;
      case "2":
        setColumns(columnsHitRateByGrade);
        break;
      case "3":
        setColumns(colunsHitRateByAccumulatedDuration);
        break;
      case "4":
        setColumns(columnsVideoStatistic);
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
  return (
    <PageLayout title="Report">
      <SearchReport
        setFilter={(value: any) => setFilter(value)}
        setListReport={(value: any) => setListReport(value)}
        setReportType={(value: any) => setReportType(value)}
        filter={filter}
        reportType={reportType}
        setPageCount={setPageCount}
      />
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
