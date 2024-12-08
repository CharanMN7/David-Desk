"use client";

import { ColumnDef } from "@tanstack/react-table";

export type StudentSideAssignment = {
  id: number;
  title: string;
  deadline: string;
  status: "Not Started" | "In Progress" | "Completed";
};

export const studentSideAssignmentColumns: ColumnDef<StudentSideAssignment>[] =
  [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "actions",
      header: "Actions",
    },
  ];
