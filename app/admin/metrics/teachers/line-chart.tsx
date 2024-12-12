"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", students: 86, },
  { month: "February", students: 30,  },
  { month: "March", students: 23, },
  { month: "April", students: 73  },
  { month: "May", students: 20  },
  { month: "June", students: 214 },
]

const chartConfig = {
  students: {
    label: "students",
    color: "hsl(var(--chart-1))",
  },

} satisfies ChartConfig

export function LineChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom quiz performance trends</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="students"
              type="natural"
              stroke="var(--color-students)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-students)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none"> <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
           Track trends in quiz performance trends
        </div>
      </CardFooter>
    </Card>
  )
}
