"use client";
import PageLayout from "@/components/PageLayout";
import InfoCourse from "../components/course/info-course";
import ListSeminar from "../components/list-seminar";
import InfoSeminar from "../components/info-seminar";

export default function Page({ params }: { params: { id: string } }) {
  
  return (
    <PageLayout title="Edit Seminar">
      {" "}
      <div className="flex flex-col gap-[1.5rem]">
        {" "}
        <InfoCourse
        />
        <div className="flex flex-col lg:flex-row justify-start rounded-2xl bg-white border-[1px] border-[#D0D5DD]">
          <ListSeminar
          />
          <InfoSeminar />
        </div>
      </div>
    </PageLayout>
  );
}
