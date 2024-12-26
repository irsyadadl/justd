"use client"

import { useMemo, useState } from "react"

import type { Key } from "react-aria-components"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"
import {
  Card,
  Chart,
  type ChartConfig,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  Select,
} from "ui"

const data = [
  { month: "january", sales: 3186, fill: "var(--color-january)" },
  { month: "february", sales: 2305, fill: "var(--color-february)" },
  { month: "march", sales: 4237, fill: "var(--color-march)" },
  { month: "april", sales: 4173, fill: "var(--color-april)" },
  { month: "may", sales: 5209, fill: "var(--color-may)" },
]

const config = {
  visitors: {
    label: "Visitors",
  },
  sales: {
    label: "Sales",
  },
  profit: {
    label: "Profit",
  },
  january: {
    label: "January",
    color: "var(--chart-1)",
  },
  february: {
    label: "February",
    color: "var(--chart-2)",
  },
  march: {
    label: "March",
    color: "var(--chart-3)",
  },
  april: {
    label: "April",
    color: "var(--chart-4)",
  },
  may: {
    label: "May",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export default function PieChartControlledDemo() {
  const id = "pie-interactive"
  const [activeMonth, setActiveMonth] = useState<Key>(data[0].month)

  const activeIndex = useMemo(
    () => data.findIndex((item) => item.month === activeMonth),
    [activeMonth],
  )
  const months = useMemo(() => data.map((item) => item.month), [])

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={config} />
      <Card.Header className="flex-row items-start space-y-0 pb-0">
        <div className="grid w-full gap-1">
          <Card.Title className="capitalize">{activeMonth}</Card.Title>
          <Card.Description>
            The total sales for the month is{" "}
            <strong className="font-semibold">{data[activeIndex].sales.toLocaleString()}</strong>
          </Card.Description>
        </div>
        <Select selectedKey={activeMonth} onSelectionChange={setActiveMonth}>
          <Select.Trigger
            className="ml-auto h-8 w-[130px] rounded-lg px-2"
            aria-label="Select a value"
          />
          <Select.List className="rounded-xl">
            {months.map((key) => {
              const _config = config[key as keyof typeof config]

              if (!_config) {
                return null
              }

              return (
                <Select.Option key={key} id={key}>
                  <div className="flex items-center gap-2 text-xs">{_config?.label}</div>
                </Select.Option>
              )
            })}
          </Select.List>
        </Select>
      </Card.Header>
      <Card.Content className="flex flex-1 justify-center pb-0">
        <Chart id={id} config={config} className="mx-auto aspect-square w-full max-w-[315px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="sales"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-fg font-semibold text-2xl"
                        >
                          {data[activeIndex].sales.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-fg">
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </Chart>
      </Card.Content>
    </Card>
  )
}
