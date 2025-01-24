"use client"

import { IconGraph } from "justd-icons"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import type { ChartConfig } from "ui"
import { Card, Chart, ChartTooltip, ChartTooltipContent } from "ui"

const enrollmentData = Array.from({ length: 24 }, (_, index) => {
  const date = new Date(new Date().getFullYear() - 1, index)
  const month = date.toLocaleDateString("en-US", { month: "long" })
  return {
    month,
    newEnrollments: Math.floor(Math.random() * 20 + 40),
  }
})

const enrollmentConfig = {
  newEnrollments: {
    label: "New Enrollments",
    color: "var(--chart-1)",
    icon: IconGraph,
  },
} satisfies ChartConfig

export default function AreaChartStepDemo() {
  return (
    <Card>
      <Card.Header
        className="items-center pb-0"
        title="Enrollment Growth"
        description="Monthly student enrollments over the last 24 months"
      />
      <Card.Content>
        <Chart config={enrollmentConfig}>
          <AreaChart
            accessibilityLayer
            data={enrollmentData}
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Area
              dataKey="newEnrollments"
              type="step"
              fill="var(--color-newEnrollments)"
              fillOpacity={0.4}
              stroke="var(--color-newEnrollments)"
            />
          </AreaChart>
        </Chart>
      </Card.Content>
    </Card>
  )
}
