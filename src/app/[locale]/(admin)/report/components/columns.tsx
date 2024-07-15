"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  itemAccumulatedViewDuration,
  reportColumn,
  reportColumnSODUser,
  reportHitRateByAccumulatedDuration,
  reportHitRateByGrade,
  reportRecommendedList,
  reportScoringReport,
  reportSODAdmin,
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
export const columnsScoringReport: ColumnDef<reportScoringReport>[] = [
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
    accessorKey: "totalScoredCount",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating Population
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const totalScoredCount: number = row.getValue("totalScoredCount");
      return (
        <div className="flex justify-center">
          <p>{totalScoredCount ? totalScoredCount : "0"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "score1Count",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating of 1
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const score1Count: number = row.getValue("score1Count");
      return (
        <div className="flex justify-center">
          <p>{score1Count ? score1Count : "0"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "score2Count",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating of 2
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const score2Count: number = row.getValue("score2Count");
      return (
        <div className="flex justify-center">
          <p>{score2Count ? score2Count : "0"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "score3Count",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating of 3
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const score3Count: number = row.getValue("score3Count");
      return (
        <div className="flex justify-center">
          <p>{score3Count ? score3Count : "0"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "score4Count",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating of 4
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const scoreCount: number = row.getValue("score4Count");
      return (
        <div className="flex justify-center">
          <p>{scoreCount ? scoreCount : "0"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "score5Count",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating of 5
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const scoreCount: number = row.getValue("score5Count");
      return (
        <div className="flex justify-center">
          <p>{scoreCount ? scoreCount : "0"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "score6Count",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating of 6
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const scoreCount: number = row.getValue("score6Count");
      return (
        <div className="flex justify-center">
          <p>{scoreCount ? scoreCount : "0"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "score7Count",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating of 7
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const scoreCount: number = row.getValue("score7Count");
      return (
        <div className="flex justify-center">
          <p>{scoreCount ? scoreCount : "0"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "score8Count",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating of 8
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const scoreCount: number = row.getValue("score8Count");
      return (
        <div className="flex justify-center">
          <p>{scoreCount ? scoreCount : "0"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "score9Count",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating of 9
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const scoreCount: number = row.getValue("score9Count");
      return (
        <div className="flex justify-center">
          <p>{scoreCount ? scoreCount : "0"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "score10Count",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating of 10
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const scoreCount: number = row.getValue("score10Count");
      return (
        <div className="flex justify-center">
          <p>{scoreCount ? scoreCount : "0"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "averageScore",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Average Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const scoreCount: number = row.getValue("averageScore");
      return (
        <div className="flex justify-center">
          <p>{scoreCount ? scoreCount : "0"}</p>
        </div>
      );
    },
  },
];
export const columnsRecommendedList: ColumnDef<reportRecommendedList>[] = [
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
    accessorKey: "addedDate",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Added Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let addedDate: string = row.getValue("addedDate");
      return (
        <div className="flex justify-start">
          {" "}
          <p>{addedDate ? moment(addedDate).format("DD/MM/YYYY") : ""}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "removedDate",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Removed Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let removedDate: string = row.getValue("removedDate");
      return (
        <div className="flex justify-start">
          {" "}
          <p>{removedDate ? moment(removedDate).format("DD/MM/YYYY") : ""}</p>
        </div>
      );
    },
  },
];
export const columnsSODAdmin: ColumnDef<reportSODAdmin>[] = [
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
      return <div className="flex justify-center">Status</div>;
    },
    cell: ({ row }) => {
      const status: any = row.getValue("status");
      let content;

      switch (status) {
        case "Published":
          content = (
            <span className="px-[12px] py-[4px] rounded-[100px] text-[12px] font-medium bg-[#ecfdf3] text-[#4caf50]">
              Published
            </span>
          );
          break;
        case "Unpublished":
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
    accessorKey: "courseCurriculum",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Course Curriculum
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const courseCurriculum: number = row.getValue("courseCurriculum");
      return (
        <div className="flex justify-start">
          <p>{courseCurriculum}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "courseSubject",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Course Subject
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const courseSubject: string = row.getValue("courseSubject");
      return (
        <div className="flex justify-start">
          <p>{courseSubject}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "division",
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
      const division: string = row.getValue("division");
      return (
        <div className="flex justify-start">
          <p>{division}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "publishedDate",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Published Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let publishedDate: string = row.getValue("publishedDate");
      return (
        <div className="flex justify-start">
          {" "}
          <p>
            {publishedDate ? moment(publishedDate).format("DD/MM/YYYY") : ""}
          </p>
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
          <p>
            {heldDate ? moment(heldDate).format("DD/MM/YYYY") : ""}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "totalDuration",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
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
        <div className="flex justify-center">
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
    accessorKey: "totalVideoSize",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
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
      let totalVideoSize: number = row.getValue("totalVideoSize");
      return (
        <div className="flex justify-center">
          {" "}
          <p>{totalVideoSize ? +((totalVideoSize ?? 0) / 1024 / 1024).toFixed(2) : ""}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "totalPart",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Part
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let totalPart: number = row.getValue("totalPart");
      return (
        <div className="flex justify-center">
          {" "}
          <p>{totalPart ? totalPart : 0}</p>
        </div>
      );
    },
  },
];
