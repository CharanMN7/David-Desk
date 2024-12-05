"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

const chartData = [
  { year: "2021", CSE: 95, ECE: 65, EEE: 70, MECH: 50, CIVIL: 85, IT: 40 },
  { year: "2022", CSE: 80, ECE: 55, EEE: 60, MECH: 70, CIVIL: 90, IT: 45 },
  { year: "2023", CSE: 60, ECE: 75, EEE: 80, MECH: 60, CIVIL: 70, IT: 50 },
  { year: "2024", CSE: 85, ECE: 90, EEE: 75, MECH: 55, CIVIL: 60, IT: 65 },
];

const chartConfig = {
  CSE: {
    label: "CSE",
    color: "hsl(var(--chart-1))",
  },
  ECE: {
    label: "ECE",
    color: "hsl(var(--chart-2))",
  },
  EEE: {
    label: "EEE",
    color: "hsl(var(--chart-3))",
  },
  MECH: {
    label: "MECH",
    color: "hsl(var(--chart-4))",
  },
  CIVIL: {
    label: "CIVIL",
    color: "hsl(var(--chart-5))",
  },
  IT: {
    label: "IT",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function YoyBranchwiseAttendance({ ...props }) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Branch-wise Attendance Chart</CardTitle>
        <CardDescription>Year-over-Year Comparison (2021-2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
              bottom: 20,
            }}
            width={700} // Increased width for better display
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={0} // Ensure all years are displayed
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="CSE"
              type="monotone"
              stroke="var(--color-CSE)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="ECE"
              type="monotone"
              stroke="var(--color-ECE)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="EEE"
              type="monotone"
              stroke="var(--color-EEE)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="MECH"
              type="monotone"
              stroke="var(--color-MECH)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="CIVIL"
              type="monotone"
              stroke="var(--color-CIVIL)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="IT"
              type="monotone"
              stroke="var(--color-IT)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Year-over-Year Branch-wise Attendance <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
