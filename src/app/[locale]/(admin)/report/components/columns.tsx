"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  itemAccumulatedViewDuration,
  reportColumn,
  reportColumnSODUser,
  reportHitRateByAccumulatedDuration,
  reportHitRateByGrade,
  reportVideoStatistic,
} from "./interface";
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
      return <div className="flex justify-center">{row.index + 1}</div>;
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
      return postTitle ? postTitle : "";
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
            Browsing Rate
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const browsingRateSec: any = row.getValue("browsingRateSec");
      return (
        <p>
          {browsingRateSec
            ? moment.utc(+(browsingRateSec ?? 0)).format("HH:mm:ss")
            : ""}
        </p>
      );
    },
  },
];
export const columnsHitRateByGrade: ColumnDef<reportHitRateByGrade>[] = [
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
      return <div className="flex justify-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "seminarId",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let seminarId: any = row.getValue("seminarId");
      return (
        <div className="flex justify-center">
          <p>{seminarId}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "seminarName",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Seminar Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let seminarName: string = row.getValue("seminarName");
      return (
        <div className="flex justify-start">
          <p>{seminarName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "viewGroupByGrade",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Grade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="flex justify-start">All</div>;
    },
  },
  {
    accessorKey: "totalViewDuration",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total View Duration
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let totalViewDuration: string = row.getValue("totalViewDuration");
      return (
        <div className="flex justify-start">
          {" "}
          <p>
            {totalViewDuration
              ? moment.utc(+(totalViewDuration ?? 0)).format("HH:mm:ss")
              : ""}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "totalStaffCount",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total View Count
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let totalStaffCount: string = row.getValue("totalStaffCount");
      return (
        <div className="flex justify-center">
          {" "}
          <p>{totalStaffCount}</p>
        </div>
      );
    },
  },
];
export const colunsHitRateByAccumulatedDuration: ColumnDef<reportHitRateByAccumulatedDuration>[] =
  [
    {
      id: "index",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              No.
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        return <div className="flex justify-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "seminarId",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        let seminarId: any = row.getValue("seminarId");
        return (
          <div className="flex justify-center">
            <p>{seminarId}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "seminarName",
      header: ({ column }) => {
        return (
          <div className="flex justify-start">
            <Button
              className="p-0"
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Seminar Title
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        let seminarName: string = row.getValue("seminarName");
        return (
          <div className="flex justify-start">
            <p>{seminarName}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "accumulatedViewDuration",
      header: ({ column }) => {
        return (
          <div className="flex justify-start">
            <Button
              className="p-0"
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Total View Duration
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        let accumulatedViewDuration: itemAccumulatedViewDuration[] =
          row.getValue("accumulatedViewDuration");

        let viewDuration = 0;

        if (accumulatedViewDuration && accumulatedViewDuration.length > 0) {
          viewDuration = accumulatedViewDuration
            .map((x: any) => x.totalViewDuration ?? 0)
            .reduce((acc: number, curr: number) => acc + curr, 0);
        }

        return (
          <div className="flex justify-center">
            {viewDuration > 0
              ? moment.utc(viewDuration).format("HH:mm:ss")
              : "00:00:00"}
          </div>
        );
      },
    },
    {
      id: "totalViewCount",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              className="p-0"
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Total View Count
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        let accumulatedViewDuration: itemAccumulatedViewDuration[] =
          row.getValue("accumulatedViewDuration");

        let viewCount = 0;

        if (accumulatedViewDuration && accumulatedViewDuration.length > 0) {
          viewCount = accumulatedViewDuration
            .map((x: any) => x.staffWatchedCount ?? 0)
            .reduce((acc: number, curr: number) => acc + curr, 0);
        }

        return (
          <div className="flex justify-center">
            {viewCount > 0 ? viewCount : "0"}
          </div>
        );
      },
    },
  ];
export const columnsVideoStatistic: ColumnDef<reportVideoStatistic>[] = [
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
      return <div className="flex justify-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "staffId",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Staff ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const staffId: number = row.getValue("staffId");
      return (
        <div className="flex justify-center">
          <p>{staffId}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "rank",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rank
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const rank: number = row.getValue("rank");
      return (
        <div className="flex justify-center">
          <p>{rank}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "post",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Post Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const post: string = row.getValue("post");
      return (
        <div className="flex justify-center">
          <p>{post ? post : ""}</p>
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
            Staff Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const staffName: string = row.getValue("staffName");
      return (
        <div className="flex justify-start">
          <p>{staffName ? staffName : ""}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "classId",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Class ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const classId: number = row.getValue("classId");
      return (
        <div className="flex justify-center">
          <p>{classId ? classId : ""}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "classDuration",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Class Duration
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const classDuration: string = row.getValue("classDuration");
      return (
        <div className="flex justify-center">
          <p>{classDuration ? classDuration : ""}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "sodcId",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Seminar ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const sodcId: string = row.getValue("sodcId");
      return (
        <div className="flex justify-center">
          <p>{sodcId ? sodcId : ""}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "sodcDesc",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Seminar Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const sodcDesc: string = row.getValue("sodcDesc");
      return (
        <div className="flex justify-start">
          <p>{sodcDesc ? sodcDesc : ""}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "sodsId",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Video ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const sodsId: number = row.getValue("sodsId");
      return (
        <div className="flex justify-start">
          <p>{sodsId ? sodsId : ""}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "sodsDesc",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Video Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const sodsDesc: string = row.getValue("sodsDesc");
      return (
        <div className="flex justify-start">
          <p>{sodsDesc ? sodsDesc : ""}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "sodsLength",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Duration
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const sodsLength: string = row.getValue("sodsLength");
      return (
        <div className="flex justify-start">
          <p>
            {sodsLength
              ? moment.utc(sodsLength).format("HH:mm:ss")
              : "00:00:00"}
          </p>
        </div>
      );
    },
  },
];
export const columnsSODUser: ColumnDef<reportColumnSODUser>[] = [
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
      return <div className="flex justify-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "seminarId",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Seminar ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const seminarId: number = row.getValue("seminarId");
      return (
        <div className="flex justify-center">
          <p>{seminarId}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "seminarName",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Seminar Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const seminarName: string = row.getValue("seminarName");
      return (
        <div className="flex justify-start">
          <p>{seminarName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const status: any = row.getValue("status");
      let content;
      switch (status) {
        case 1:
          content = (
            <span className="px-[12px] py-[4px] rounded-[100px] text-[12px] font-medium bg-[#ecfdf3] text-[#4caf50]">
              Published
            </span>
          );
          break;
        case 2:
          content = (
            <span className="px-[12px] py-[4px] rounded-[100px] text-[12px] font-medium bg-[#fffaeb] text-[#fb6514]">
              Unpublished
            </span>
          );
          break;
        default:
          content = (
            <span className="px-[12px] py-[4px] rounded-[100px] text-[12px] font-medium bg-[#f2f4f7] text-[#344054]">
              Draft
            </span>
          );
      }

      return <div className="flex justify-center">{content}</div>;
    },
  },
  {
    accessorKey: "divisions",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Division
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const divisions: string = row.getValue("divisions");
      return (
        <div className="flex justify-start">
          <p>{divisions}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "heldDate",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Held Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let heldDate: string = row.getValue("heldDate");
      return (
        <div className="flex justify-start">
          {" "}
          <p>{heldDate ? moment(heldDate).format("DD/MM/YYYY") : ""}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "totalDuration",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Duration
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let totalDuration: string = row.getValue("totalDuration");
      return (
        <div className="flex justify-start">
          {" "}
          <p>
            {totalDuration
              ? moment.utc(+(totalDuration ?? 0)).format("HH:mm:ss")
              : ""}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "videoSize",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Video Size
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let videoSize: number = row.getValue("videoSize");
      return (
        <div className="flex justify-start">
          {" "}
          <p>{videoSize ? +((videoSize ?? 0) / 1024 / 1024).toFixed(2) : ""}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "TargetParticipant",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Target Participant
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let TargetParticipant: number = row.getValue("TargetParticipant");
      return (
        <div className="flex justify-start">
          <p>Target Participant</p>
        </div>
      );
    },
  },
];
