"use client";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import { headers } from "next/headers";

interface StudentSideAssignmentsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function StudentSideAssignmentsTable<TData, TValue>({
  columns,
  data,
}: StudentSideAssignmentsTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="container rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {/* {headerGroup.headers.map((header) => {
                return(
                  <TableHead key
                )
              })} */}
            </TableRow>
          ))}
        </TableHeader>
      </Table>
    </div>
  );
}
