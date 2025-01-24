import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Chart, ChartTooltip, ChartTooltipContent } from "ui"

export default function ChartAnatomy() {
  return (
    <Chart
      config={{
        first: {
          label: "...",
          color: "var(--chart-1)",
        },
      }}
      className="min-h-[250px]"
    >
      <AreaChart
        accessibilityLayer
        data={[
          { month: "January", revenue: 12000 },
          //...
        ]}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid />
        <XAxis />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Area dataKey="revenue" />
      </AreaChart>
    </Chart>
  )
}
