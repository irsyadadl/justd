"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import type { ChartConfig } from "ui"
import { Card, Chart, ChartTooltip, ChartTooltipContent } from "ui"

const chartData = [{ month: "January", sales: 1260, profit: 570 }]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)"
  },
  profit: {
    label: "Profit",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

export default function SalesPerformanceOverview() {
  const totalRevenue = chartData[0].sales + chartData[0].profit

  return (
    <Card>
      <Card.Header
        className="items-center text-center pb-0"
        title="Monthly Revenue Distribution"
        description="Visualizing sales and profit for Jan - Dec 2024"
      />
      <Card.Content className="flex flex-1 items-center pb-0">
        <Chart config={chartConfig} className="mx-auto aspect-square w-full max-w-[250px]">
          <RadialBarChart data={chartData} endAngle={180} innerRadius={80} outerRadius={130}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 16} className="fill-fg text-2xl font-bold">
                          {totalRevenue.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-fg">
                          Total Revenue
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="sales"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-sales)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="profit"
              fill="var(--color-profit)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </Chart>
      </Card.Content>
    </Card>
  )
}