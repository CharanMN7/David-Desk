"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Recent Attendance Stats";

const chartData = [
  { date: "2024-11-01", presentees: 50, absentees: 22 },
  { date: "2024-11-02", presentees: 45, absentees: 27 },
  { date: "2024-11-03", presentees: 60, absentees: 12 },
  { date: "2024-11-04", presentees: 30, absentees: 42 },
  { date: "2024-11-05", presentees: 55, absentees: 17 },
  { date: "2024-11-06", presentees: 40, absentees: 32 },
  { date: "2024-11-07", presentees: 62, absentees: 10 },
  { date: "2024-11-08", presentees: 35, absentees: 37 },
  { date: "2024-11-09", presentees: 48, absentees: 24 },
  { date: "2024-11-10", presentees: 59, absentees: 13 },
  { date: "2024-11-11", presentees: 28, absentees: 44 },
  { date: "2024-11-12", presentees: 39, absentees: 33 },
  { date: "2024-11-13", presentees: 66, absentees: 6 },
  { date: "2024-11-14", presentees: 22, absentees: 50 },
  { date: "2024-11-15", presentees: 33, absentees: 39 },
  { date: "2024-11-16", presentees: 47, absentees: 25 },
  { date: "2024-11-17", presentees: 36, absentees: 36 },
  { date: "2024-11-18", presentees: 42, absentees: 30 },
  { date: "2024-11-19", presentees: 61, absentees: 11 },
  { date: "2024-11-20", presentees: 54, absentees: 18 },
  { date: "2024-11-21", presentees: 38, absentees: 34 },
  { date: "2024-11-22", presentees: 43, absentees: 29 },
  { date: "2024-11-23", presentees: 49, absentees: 23 },
  { date: "2024-11-24", presentees: 57, absentees: 15 },
  { date: "2024-11-25", presentees: 39, absentees: 33 },
  { date: "2024-11-26", presentees: 26, absentees: 46 },
  { date: "2024-11-27", presentees: 68, absentees: 4 },
  { date: "2024-11-28", presentees: 44, absentees: 28 },
  { date: "2024-11-29", presentees: 50, absentees: 22 },
  { date: "2024-11-30", presentees: 58, absentees: 14 },
];

const chartConfig = {
  views: {
    label: "Students",
  },
  presentees: {
    label: "Avg % Presentees",
    color: "hsl(var(--chart-1))",
  },
  absentees: {
    label: "Avg % Absentees",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function SmapleChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("presentees");

  const average = React.useMemo(
    () => ({
      presentees:
        (chartData.reduce((acc, curr) => acc + curr.presentees, 0) /
          (72 * 30)) *
        100,
      absentees:
        (chartData.reduce((acc, curr) => acc + curr.absentees, 0) / (72 * 30)) *
        100,
    }),
    [],
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Attendance</CardTitle>
          <CardDescription>
            Showing attendance for the month of November
          </CardDescription>
        </div>
        <div className="flex">
          {["presentees", "absentees"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {average[key as keyof typeof average].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="students"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
