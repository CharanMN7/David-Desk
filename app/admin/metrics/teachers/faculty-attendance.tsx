"use client";

import { useState } from "react";
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

// Example data with branches
const initialChartData = [
  { faculty: "Anil", attendance: 75, branch: "CSE" },
  { faculty: "Sarah", attendance: 85, branch: "ECE" },
  { faculty: "Swati", attendance: 90, branch: "CSE" },
  { faculty: "Sushmita", attendance: 80, branch: "CSM" },
  { faculty: "Rajesh", attendance: 88, branch: "EEE" },
  { faculty: "Verma", attendance: 95, branch: "ECE" },
];

const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarComponent() {
  const [selectedBranch, setSelectedBranch] = useState<string>("All"); // Default to show all branches

  // Filtered data based on selected branch
  const filteredChartData = initialChartData.filter((faculty) => {
    return selectedBranch === "All" || faculty.branch === selectedBranch;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance by Faculty</CardTitle>
        <CardDescription>Faculty-wise Attendance Data</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Branch Filter */}
        <div className="mb-4">
          <label htmlFor="branch-select" className="mr-2">Select Branch:</label>
          <select
            id="branch-select"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="border rounded p-1"
          >
            <option value="All">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="CSM">CSM</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
          </select>
        </div>

        <ChartContainer config={chartConfig}>
          <BarChart
            data={filteredChartData}
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