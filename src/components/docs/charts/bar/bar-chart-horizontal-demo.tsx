"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, Chart, type ChartConfig, ChartTooltip, ChartTooltipContent } from "ui"

const performanceData = [
  { dataCenter: "New York", uptime: 99.9 },
  { dataCenter: "San Francisco", uptime: 97.5 },
  { dataCenter: "Singapore", uptime: 98.7 },
  { dataCenter: "London", uptime: 95.3 },
  { dataCenter: "Tokyo", uptime: 94.8 },
  { dataCenter: "Sydney", uptime: 99.9 },
  { dataCenter: "Seoul", uptime: 97.5 },
]

const chartConfig = {
  uptime: {
    label: "Uptime (%)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function BarChartHorizontalDemo() {
  return (
    <Card>
      <Card.Header
        title="Data Center Uptime"
        description="Uptime percentage by region for Q1 2024"
      />
      <Card.Content>
        <Chart config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={performanceData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="uptime" hide />
            <YAxis
              dataKey="dataCenter"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="uptime" fill="var(--color-uptime)" radius={5} />
          </BarChart>
        </Chart>
      </Card.Content>
    </Card>
  )
}
