'use client'
import PageLayout from "@/components/PageLayout";
import FormExport from "./form-export";
import FormSearch from "./form-search";
import { useEffect, useState } from "react";
import useApiAuth from "@/lib/hook/useAxiosAuth";

export default function AuditLog() {
    const axiosAuth = useApiAuth()
    const [filterData, setFilterData] =useState({
        page: 1,
        pageSize:10
    });
    const [listAudit, setListAudit] = useState([])
    console.log({filterData});
    useEffect(()=>{
        axiosAuth.get('Audit', {
            params: filterData,
          }).then((res)=>{
            console.log({res});
            
          })
    },[filterData])
    
    return(
        <PageLayout title="Audit Log">
            <FormExport/>
            <div className="mt-4">
                <FormSearch setFilterData={(value: any)=>setFilterData(value)}/>
            </div>
        </PageLayout>
    )
}