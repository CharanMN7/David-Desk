"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
import { OptionDropdown } from "./OptionDropdown";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

const academicYearData = [
  {
    value: "2018-2019",
    label: "2018-2019",
  },
  {
    value: "2019-2020",
    label: "2019-2020",
  },
  {
    value: "2020-2021",
    label: "2020-2021",
  },
  {
    value: "2021-2022",
    label: "2021-2022",
  },
  {
    value: "2022-2023",
    label: "2022-2023",
  },
  {
    value: "2023-2024",
    label: "2023-2024",
  },
];

const yearOfStudyData = [
  {
    value: "1",
    label: "1st Year",
  },
  {
    value: "2",
    label: "2nd Year",
  },
  {
    value: "3",
    label: "3rd Year",
  },
  {
    value: "4",
    label: "4th Year",
  },
];

const chartConfig = {
  attendance_percentage: {
    label: "Attendance:  ",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AttendanceBarChart() {
  const [chartData, setChartData] = useState([
    { branch: "CSE", attendance_percentage: 90 },
    { branch: "ECE", attendance_percentage: 85 },
    { branch: "EEE", attendance_percentage: 92 },
    { branch: "MECH", attendance_percentage: 88 },
    { branch: "CIVIL", attendance_percentage: 91 },
    { branch: "IT", attendance_percentage: 89 },
  ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       "https://david-backend-production.up.railway.app/attendance/branch-summary/",
  //     );
  //     const data = await response.json();
  //     setChartData(data.data);
  //     console.log(data.data);
  //   };

  //   fetchData();
  // }, []);
  return (
    <Card className="max-w-lg">
      <CardHeader className="space-y-4">
        <CardTitle>Overall Attendance Percentage by Branch</CardTitle>
        <CardDescription className="grid grid-cols-2">
          <div>
            <Label>Academic Year</Label> <br />
            <OptionDropdown data={academicYearData} />
          </div>
          <div>
            <Label>Year of Study</Label> <br />
            <OptionDropdown data={yearOfStudyData} />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="branch"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="attendance_percentage"
              fill="var(--color-attendance_percentage)"
              radius={8}
            >
              <LabelList
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
        {/* <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 branchs
        </div> */}
      </CardFooter>
    </Card>
  );
}
