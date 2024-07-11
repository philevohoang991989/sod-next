'use client'
import PageLayout from "@/components/PageLayout";
import FormExport from "./form-export";
import FormSearch from "./form-search";
import { useEffect, useState } from "react";
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { ColumnDef } from "@tanstack/react-table";
import { AuditLog } from "./columns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTable } from "@/components/data-table";

export default function AuditLog() {
    const columns: ColumnDef<AuditLog>[] = [
        {
          accessorKey: "createDateTime",
          header: ({ column }) => {
            return (
              <div className="flex justify-start pl-1">
                <Button
                  variant="link"
                  className="p-0 hover:no-underline"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Exported Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            const loginType: string = row.getValue("id");
            return (
              <div className="flex justify-start pl-4">
                <p>{loginType}</p>
              </div>
            );
          },
        },
        
        // {
        //   id: "actions",
        //   header: ({ column }) => {
        //     return <div className="flex justify-center">Action</div>;
        //   },
        //   cell: ({ row }) => (
        //     <div className="w-full flex gap-4 justify-center items-center">
        //       <Button
        //         className="p-0 w-8 h-8"
        //         variant="link"
                
        //       >
        //         <Image width={20} height={20} src={Edit} alt="Edit" />
        //       </Button>
        //     </div>
        //   ),
        // },
      ];
    const axiosAuth = useApiAuth()
    const [filterData, setFilterData] =useState({
        page: 1,
        pageSize:10
    });
    const [page, setPage]= useState(1)
    const [pageSize, setPageSize]= useState(10)
    const [listAudit, setListAudit] = useState([])
    console.log({filterData});
    useEffect(()=>{
        axiosAuth.get('Audit/', {
            params: filterData,
          }).then((res)=>{
            console.log({res});
            
          })
    },[filterData])
    
    return(
        <PageLayout title="Audit Log">
            <FormExport page={page} pageSize={pageSize} setPage={(value: number)=>setPage(value)} setPageSize={(value: number)=>setPageSize(value)}/>
            <div className="mt-4">
                <FormSearch filterData={filterData} setFilterData={(value: any)=>setFilterData(value)}/>
                <DataTable columns={columns} data={listAudit} pageSize={pageSize} />
            </div>
        </PageLayout>
    )
}