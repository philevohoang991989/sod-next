"use client";
import PageLayout from "@/components/PageLayout";
import { useState } from "react";
import InfoCourse from "../components/course/info-course";
import ListSeminar from "../components/list-seminar";
import InfoSeminar from "../components/info-seminar";

export default function Page({ params }: { params: { id: string } }) {
  const [idClass, setIdClass] = useState(0);
  const [idCourse, setIdCourse] = useState(0);
  const [idSeminar, setIdSeminar] = useState(0);
  
  return (
    <PageLayout title="Edit Seminar">
      {" "}
      <div className="flex flex-col gap-[1.5rem]">
        {" "}
        <InfoCourse
          idClass={idClass}
          idCourse={idCourse}
          setIdCourse={setIdCourse}
          setIdClass={setIdClass}
        />
        <div className="flex justify-start rounded-2xl bg-white border-[1px] border-[#D0D5DD]">
          <ListSeminar
            idSeminar={idSeminar}
            idClass={idClass}
            idCourse={idCourse}
            setIdSeminar={setIdSeminar}
          />
          <InfoSeminar idSeminar={idSeminar} />
        </div>
      </div>
    </PageLayout>
  );
}
