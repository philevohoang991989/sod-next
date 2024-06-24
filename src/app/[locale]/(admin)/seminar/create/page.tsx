"use client";
import PageLayout from "@/components/PageLayout";
import InfoCourse from "../components/course/info-course";
import { useState } from "react";
import ListSeminar from "../components/list-seminar";
import InfoSeminar from "../components/info-seminar";

export default function CreateSeminar() {
  const [idClass, setIdClass] = useState(0);
  const [idCourse, setIdCourse] = useState(0);
  const [idSeminar, setIdSeminar] = useState(0)
  console.log({ idClass, idCourse });

  return (
    <PageLayout title="Create Seminar">
      <div className="flex flex-col gap-[1.5rem]">
        {" "}
        <InfoCourse
          idClass={idClass}
          idCourse={idCourse}
          setIdCourse={setIdCourse}
          setIdClass={setIdClass}
        />
        <div className="flex justify-start rounded-2xl bg-white border-[1px] border-[#D0D5DD]">
          <ListSeminar idSeminar = {idSeminar} />
          <InfoSeminar/>
        </div>
      </div>
    </PageLayout>
  );
}
