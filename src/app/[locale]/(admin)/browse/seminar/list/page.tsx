"use client";
import PageLayout from "@/components/PageLayout";
import Filter from "./filter";
import { useState } from "react";

export default function ListSeminar() {
  const [listSeminar, setListSeminar] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const [filter, setFilter] = useState<any>({
    page: page,
    pageSize: pageSize,
    search: "",
    divisionId: "",
    status: "",
    type: "",
    createdFrom: undefined,
    createdTo: undefined,
    updateDateFrom: undefined,
    updateDateTo: undefined,
    durationFrom: "",
    durationTo: "",
  });
  console.log({ filter });

  return (
    <PageLayout title="Seminar">
      <Filter
        setFilter={setFilter}
        setPageSize={setPageSize}
        setPage={setPage}
      />
      ListSeminar
    </PageLayout>
  );
}
