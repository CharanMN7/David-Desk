"use client";

import * as React from "react";
import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Label } from "recharts";
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

const chartDataMap = {
  overall: [
    { status: "Pass", percentage: 72, fill: "#28a745" },
    { status: "Fail", percentage: 28, fill: "#dc3545" },
  ],
  csm: [
    { status: "Pass", percentage: 80, fill: "#28a745" },
    { status: "Fail", percentage: 20, fill: "#dc3545" },
  ],
  cse: [
    { status: "Pass", percentage: 65, fill: "#28a745" },
    { status: "Fail", percentage: 35, fill: "#dc3545" },
  ],
  ece: [
    { status: "Pass", percentage: 75, fill: "#28a745" },
    { status: "Fail", percentage: 25, fill: "#dc3545" },
  ],
  eee: [
    { status: "Pass", percentage: 70, fill: "#28a745" },
    { status: "Fail", percentage: 30, fill: "#dc3545" },
  ],
};

const chartConfig = {
  pass: {
    label: "Pass",
    color: "#28a745",
  },
  fail: {
    label: "Fail",
    color: "#dc3545",
  },
} satisfies ChartConfig;

export function PassFailPercentage({ ...props }) {
  const [selectedFilter, setSelectedFilter] = useState("overall");
  
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const chartData = chartDataMap[selectedFilter];

  return (
    <Card className="flex flex-col" {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Pass/Fail Percentage</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mb-4">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
            Filter by Category
          </label>
          <select
            id="filter"
            value={selectedFilter}
            onChange={handleFilterChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
          >
            <option value="overall">Overall Percentage</option>
            <option value="csm">CSM</option>
            <option value="cse">CSE</option>
            <option value="ece">ECE</option>
            <option value="eee">EEE</option>
          </select>
        </div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="status"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const passData = chartData.find((d: { status: string; }) => d.status === "Pass");
                    const failData = chartData.find((d: { status: string; }) => d.status === "Fail");

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          className="fill-foreground text-xl font-bold"
                        >
                          {passData?.percentage}% Pass
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-base"
                        >
                          {failData?.percentage}% Fail
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Pass rate trending upward <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing pass/fail percentages for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
