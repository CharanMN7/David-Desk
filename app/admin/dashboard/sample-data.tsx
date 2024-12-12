"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export type Student = {
  id: number;
  roll_no: string;
  cgpa: number;
  attendance_percentage: number;
  extracurricular_count: number;
  awards_count: number;
  total_credits: number;
  last_updated: string;
  created_at: string;
  first_name: string;
  last_name: string;
  branch: string;
  section: string;
  rank: number;
};

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => row.getValue("first_name"),
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ row }) => row.getValue("last_name"),
  },
  {
    accessorKey: "cgpa",
    header: "CGPA",
    cell: ({ row }) => row.getValue("cgpa"),
  },
  {
    accessorKey: "guardian_email",
    header: "Guardian",
    cell: ({ row, table }) => {
      const guardianEmails = (table.options.meta as any)?.guardianEmails || [];
      return (
        <Button
          variant="link"
          onClick={async () => {
            try {
              const response = await fetch(
                `https://david-backend-production.up.railway.app/send-email`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    to: guardianEmails[row.index],
                    name: "Naveen",
                    score: "23",
                  }),
                },
              );
              const result = await response.json();
              if (!response.ok) {
                console.error("Error sending email:", result);
                alert("Failed to send email. Please try again.");
              } else {
                alert("Email sent successfully!");
              }
            } catch (error) {
              console.error("Error:", error);
              alert("Failed to send email. Please try again.");
            }
          }}
        >
          {guardianEmails[row.index]}
        </Button>
      );
    },
  },
];

export function DataTableDemo() {
  const [data, setData] = React.useState<Student[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [guardian_emails, setGuardian_emails] = React.useState([
    "charanmanikantanalla@gmail.com",
    "nV9mU@example.com",
    "V9c9V@example.com",
    "1MfQF@example.com",
    "B0h9t@example.com",
    "d1Zd6@example.com",
    "nV9mU@example.com",
    "V9c9V@example.com",
    "1MfQF@example.com",
    "B0h9t@example.com",
    "d1Zd6@example.com",
    "nV9mU@example.com",
    "V9c9V@example.com",
    "1MfQF@example.com",
    "B0h9t@example.com",
    "d1Zd6@example.com",
    "nV9mU@example.com",
    "V9c9V@example.com",
    "1MfQF@example.com",
  ]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://david-backend-production.up.railway.app/students/rankings",
        );
        const result = await response.json();
        const rankings = result.data.rankings;
        setData(rankings);
        setGuardian_emails((prevEmails) =>
          prevEmails.slice(0, rankings.length),
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    meta: {
      guardianEmails: guardian_emails,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={
            (table.getColumn("first_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("first_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
