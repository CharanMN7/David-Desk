"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

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

// Example data
const chartData = [
  { faculty: "Dr. Anil Kumar", attendance: 75 },
  { faculty: "Dr. Sarah Johnson", attendance: 85 },
  { faculty: "Prof. Swati Desai", attendance: 90 },
  { faculty: "Dr. Sushmita Rao", attendance: 80 },
  { faculty: "Dr. Rajesh Khanna", attendance: 88 },
  { faculty: "Dr. Pooja Verma", attendance: 95 },
];

const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance by Faculty</CardTitle>
        <CardDescription>Faculty-wise Attendance Data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="faculty"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="attendance" fill="var(--color-attendance)" radius={8}>
              <LabelList
                dataKey="attendance"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Attendance trend overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Displaying attendance percentage per faculty member
        </div>
      </CardFooter>
    </Card>
  );
}
