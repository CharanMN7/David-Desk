"use client";

import { SetStateAction, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample chart data for different batches
type BatchData = {
  [key: string]: { branch: string; attendance_percentage: number }[];
};

const batchData: BatchData = {
  "2021-2025": [
    { branch: "CSE", attendance_percentage: 90 },
    { branch: "ECE", attendance_percentage: 85 },
    { branch: "EEE", attendance_percentage: 70 },
    { branch: "MECH", attendance_percentage: 65 },
    { branch: "CIVIL", attendance_percentage: 91 },
    { branch: "IT", attendance_percentage: 89 },
  ],
  "2022-2026": [
    { branch: "CSE", attendance_percentage: 88 },
    { branch: "ECE", attendance_percentage: 80 },
    { branch: "EEE", attendance_percentage: 75 },
    { branch: "MECH", attendance_percentage: 70 },
    { branch: "CIVIL", attendance_percentage: 92 },
    { branch: "IT", attendance_percentage: 87 },
  ],
  "2023-2027": [
    { branch: "CSE", attendance_percentage: 85 },
    { branch: "ECE", attendance_percentage: 82 },
    { branch: "EEE", attendance_percentage: 78 },
    { branch: "MECH", attendance_percentage: 72 },
    { branch: "CIVIL", attendance_percentage: 90 },
    { branch: "IT", attendance_percentage: 86 },
  ],
  "2024-2028": [
    { branch: "CSE", attendance_percentage: 83 },
    { branch: "ECE", attendance_percentage: 81 },
    { branch: "EEE", attendance_percentage: 76 },
    { branch: "MECH", attendance_percentage: 75 },
    { branch: "CIVIL", attendance_percentage: 89 },
    { branch: "IT", attendance_percentage: 84 },
  ],
};

const chartConfig = {
  attendance_percentage: {
    label: "attendance_percentage",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BranchwiseAttendance({ ...props }) {
  const [selectedBatch, setSelectedBatch] = useState<string>("2021-2025"); // Default batch

  // Function to handle batch selection change
  const handleBatchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedBatch(event.target.value);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Branch-wise Attendance</CardTitle>
        <CardDescription>
          <label htmlFor="batch-select" className="mr-2">
            Select Batch:
          </label>
          <select
            id="batch-select"
            value={selectedBatch}
            onChange={handleBatchChange}
            className="border rounded p-1"
          >
            <option value="2021-2025">2021-2025</option>
            <option value="2022-2026">2022-2026</option>
            <option value="2023-2027">2023-2027</option>
            <option value="2024-2028">2024-2028</option>
          </select>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={batchData[selectedBatch]}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="branch"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="attendance_percentage"
              fill="var(--color-attendance_percentage)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Branch-wise attendance <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground"></div>
      </CardFooter>
    </Card>
  );
}
