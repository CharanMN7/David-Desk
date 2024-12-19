"use client";

import { useState } from "react";
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

// Sample data for different batches
const chartDataMap: {
  [key: string]: { branch: string; average_grade: number }[];
} = {
  "2021-2025": [
    { branch: "CSE", average_grade: 82 },
    { branch: "ECE", average_grade: 75 },
    { branch: "EEE", average_grade: 73 },
    { branch: "MECH", average_grade: 68 },
    { branch: "CIVIL", average_grade: 80 },
    { branch: "IT", average_grade: 88 },
  ],
  "2022-2026": [
    { branch: "CSE", average_grade: 78 },
    { branch: "ECE", average_grade: 70 },
    { branch: "EEE", average_grade: 76 },
    { branch: "MECH", average_grade: 65 },
    { branch: "CIVIL", average_grade: 82 },
    { branch: "IT", average_grade: 85 },
  ],
  "2023-2027": [
    { branch: "CSE", average_grade: 80 },
    { branch: "ECE", average_grade: 72 },
    { branch: "EEE", average_grade: 74 },
    { branch: "MECH", average_grade: 70 },
    { branch: "CIVIL", average_grade: 78 },
    { branch: "IT", average_grade: 90 },
  ],
  "2024-2028": [
    { branch: "CSE", average_grade: 85 },
    { branch: "ECE", average_grade: 77 },
    { branch: "EEE", average_grade: 71 },
    { branch: "MECH", average_grade: 69 },
    { branch: "CIVIL", average_grade: 81 },
    { branch: "IT", average_grade: 89 },
  ],
};

const chartConfig = {
  average_grade: {
    label: "Average Grade",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BranchwiseGrades({ ...props }) {
  const [selectedBatch, setSelectedBatch] =
    useState<keyof typeof chartDataMap>("2021-2025");

  const handleBatchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBatch(event.target.value);
  };

  const chartData = chartDataMap[selectedBatch];

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Branch-wise Average Grades</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label
            htmlFor="batch"
            className="block text-sm font-medium text-gray-700"
          >
            Select Batch
          </label>
          <select
            id="batch"
            value={selectedBatch}
            onChange={handleBatchChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
          >
            <option value="2021-2025">2021-2025</option>
            <option value="2022-2026">2022-2026</option>
            <option value="2023-2027">2023-2027</option>
            <option value="2024-2028">2024-2028</option>
          </select>
        </div>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 16, right: 16, top: 20, bottom: 20 }}
            width={600}
            height={300}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="branch"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="average_grade"
              fill="var(--color-average_grade)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Branch-wise Grades <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Average grades for each branch in the first half of the selected
          batch.
        </div>
      </CardFooter>
    </Card>
  );
}
