"use client";

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

const chartData = [
  { branch: "CSE", attendance_percentage: 90 },
  { branch: "ECE", attendance_percentage: 85 },
  { branch: "EEE", attendance_percentage: 70 },
  { branch: "MECH", attendance_percentage: 65 },
  { branch: "CIVIL", attendance_percentage: 91 },
  { branch: "IT", attendance_percentage: 89 },
];

const chartConfig = {
  attendance_percentage: {
    label: "attendance_percentage",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BranchwiseAttendance({ ...props }) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
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
