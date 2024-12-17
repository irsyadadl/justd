"use client"

import { PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts"
import { Card, Chart, type ChartConfig, ChartTooltip, ChartTooltipContent } from "ui"

const chartData = [
  { month: "Jan", sales: 186, profit: 80 },
  { month: "Feb", sales: 305, profit: 200 },
  { month: "Mar", sales: 237, profit: 120 },
  { month: "Apr", sales: 73, profit: 190 },
  { month: "May", sales: 209, profit: 130 },
  { month: "Jun", sales: 214, profit: 140 },
  { month: "Jul", sales: 230, profit: 150 },
  { month: "Aug", sales: 250, profit: 160 },
  { month: "Sep", sales: 270, profit: 170 },
  { month: "Oct", sales: 290, profit: 180 },
  { month: "Nov", sales: 310, profit: 190 },
  { month: "Dec", sales: 330, profit: 200 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
  profit: {
    label: "Profit",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function RadarChartRadiusAxisDemo() {
  return (
    <Card>
      <Card.Header
        className="items-center pb-4"
        title="Annual Sales and Profit Analysis"
        description="Performance data for Jan - Dec 2024"
      />
      <Card.Content>
        <Chart config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" labelKey="month" />}
            />
            <PolarGrid />
            <Radar dataKey="sales" fill="var(--color-sales)" fillOpacity={0.6} />
            <Radar dataKey="profit" fill="var(--color-profit)" />
            <PolarRadiusAxis angle={60} stroke="var(--fg)" orientation="middle" axisLine={false} />
          </RadarChart>
        </Chart>
      </Card.Content>
    </Card>
  )
}