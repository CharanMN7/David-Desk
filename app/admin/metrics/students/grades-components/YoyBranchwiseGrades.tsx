"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

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
  // ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { year: "2021", cse: 65, ece: 58, eee: 70, mech: 62, civil: 60, it: 55 },
  { year: "2022", cse: 70, ece: 65, eee: 72, mech: 66, civil: 68, it: 60 },
  { year: "2023", cse: 80, ece: 72, eee: 75, mech: 69, civil: 72, it: 68 },
  { year: "2024", cse: 85, ece: 78, eee: 78, mech: 71, civil: 75, it: 85 },
];

const chartConfig = {
  cse: {
    label: "CSE",
    color: "#34D399",
  },
  ece: {
    label: "ECE",
    color: "#3B82F6",
  },
  eee: {
    label: "EEE",
    color: "#FBBF24",
  },
  mech: {
    label: "MECH",
    color: "#EF4444",
  },
  civil: {
    label: "CIVIL",
    color: "#6366F1",
  },
  it: {
    label: "IT",
    color: "#10B981",
  },
} satisfies ChartConfig;

export function YoyBranchwiseGrades({ ...props }) {
  // const calculateTrend = (current: number, previous: number) => {
  //   if (current > previous) return "up";
  //   if (current < previous) return "down";
  //   return "stable";
  // };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Department-Wise Grade Distribution</CardTitle>
        <CardDescription>2021 - 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 12,
              left: 12,
              bottom: 8,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            {Object.keys(chartConfig).map((key) => {
              const department = chartConfig[key as keyof typeof chartConfig];
              // const trend = calculateTrend(
              //   chartData[3][key],
              //   chartData[2][key],
              // );

              return (
                <Line
                  key={key}
                  dataKey={key}
                  type="monotone"
                  stroke={department.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
              );
            })}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Year-over-year branch-wise grades{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing department-wise grade distribution for the years 2021-2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
