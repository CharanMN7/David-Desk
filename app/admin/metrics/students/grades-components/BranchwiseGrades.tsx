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
  { branch: "CSE", average_grade: 82 },
  { branch: "ECE", average_grade: 75 },
  { branch: "EEE", average_grade: 73 },
  { branch: "MECH", average_grade: 68 },
  { branch: "CIVIL", average_grade: 80 },
  { branch: "IT", average_grade: 88 },
];

const chartConfig = {
  average_grade: {
    label: "Average Grade",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BranchwiseGrades({ ...props }) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Branch-wise Average Grades</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
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
          Average grades for each branch in the first half of 2024.
        </div>
      </CardFooter>
    </Card>
  );
}
