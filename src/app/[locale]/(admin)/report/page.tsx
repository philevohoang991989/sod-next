"use client";
import { DataTable } from "@/components/data-table";
import PageLayout from "@/components/PageLayout";
import { columns } from "./components/columns";
import { useState } from "react";
import SearchReport from "./components/search";

export default function ReportPage() {
  const [columnTable, setColumn] = useState([]);
  const [reportType, setReportType] = useState();
  const [filter, setFilter] = useState();
  return (
    <PageLayout title="Report">
      <SearchReport setFilter={(value: any) => setFilter(value)} />
      <DataTable columns={columns} data={[]} pageSize={10} />
    </PageLayout>
  );
}
