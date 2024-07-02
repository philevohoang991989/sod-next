"use client";
import PageLayout from "@/components/PageLayout";
import Filter from "./filter";
import { useEffect, useState } from "react";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import { ENDPOINT } from "@/constants/endpoint";

export default function ListVideo() {
  const axiosAuth = useApiAuth();
  const { data: session } = useSession();
  const [filter, setFilter] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [listVideo, setListVideo] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  useEffect(() => {
    session &&
      axiosAuth
        .get(ENDPOINT.GET_LIST_VIDEO, {
          params: filter,
        })
        .then((res) => {
          setListVideo(res.data.items);
          setPageCount(res.data.totalFilter);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, filter, page, pageSize, pageCount]);
  useEffect(() => {
    setFilter({
      ...filter,
      page: page,
      pageSize: pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);
  return (
    <PageLayout title="Video">
      <Filter
        setFilter={setFilter}
        setPageSize={setPageSize}
        setPage={setPage}
      />
    </PageLayout>
  );
}
