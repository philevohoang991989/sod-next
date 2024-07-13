"use client";
import { ColumnDef } from "@tanstack/react-table";
import { reportColumn } from "./interface";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react"; // Giả sử bạn dùng thư viện lucide-react cho icon
import moment from "moment";

export const columnsDurationByGrade: ColumnDef<reportColumn>[] = [
  {
    id: "index",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No.
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="flex justify-center">{row.index + 1}</div>; // Bắt đầu từ 1
    },
  },
  {
    accessorKey: "gradeName",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Grade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "staffName",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "postTitle",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Post Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const postTitle = row.getValue("postTitle");
      return postTitle ? postTitle : ""; // Không hiển thị nội dung trong ô này
    },
  },
  {
    accessorKey: "browsingRateSec",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Post Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const browsingRateSec: any = row.getValue("browsingRateSec");
      return (
        <p>
          {browsingRateSec ? moment.utc(+(browsingRateSec ?? 0)).format('HH:mm:ss') : ""}
        </p>
      );
    },
  },
];

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
