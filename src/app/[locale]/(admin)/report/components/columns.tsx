'use client'
import { ColumnDef } from "@tanstack/react-table";
import { reportColumn } from "./interface";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react"; // Giả sử bạn dùng thư viện lucide-react cho icon

export const columns: ColumnDef<reportColumn>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]

// const columns: ColumnDef<reportColumn>[] = [
//   {
//     accessorKey: "id",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="link"
//           className="p-0 hover:no-underline"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           User ID
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       return ''; // Không hiển thị nội dung trong ô này
//     },
//   },
//   // Bạn có thể thêm các cột khác ở đây
// ];

// export default columns;