import { ThumbAreaChart } from "@/app/(app)/components/(partials)/(svg)/thumb-area-chart"
import { ThumbBarChart } from "@/app/(app)/components/(partials)/(svg)/thumb-bar-chart"
import { ThumbButton } from "@/app/(app)/components/(partials)/(svg)/thumb-button"
import { ThumbFileTrigger } from "@/app/(app)/components/(partials)/(svg)/thumb-file-trigger"
import { ThumbLineChart } from "@/app/(app)/components/(partials)/(svg)/thumb-line-chart"
import { ThumbPieChart } from "@/app/(app)/components/(partials)/(svg)/thumb-pie-chart"
import { ThumbToggle } from "@/app/(app)/components/(partials)/(svg)/thumb-toggle"
import { ThumbToggleGroup } from "@/app/(app)/components/(partials)/(svg)/thumb-toggle-group"
import { ThumbCheckbox } from "@/app/(app)/components/(partials)/(svg)/thumb-checkbox";
import { ThumbCheckboxGroup } from "@/app/(app)/components/(partials)/(svg)/thumb-checkbox-group";
import { ThumbTree } from "@/app/(app)/components/(partials)/(svg)/thumb-tree";
import { ThumbCalendar } from "@/app/(app)/components/(partials)/(svg)/thumb-calendar";

export function Thumbnail({ name }: { name: string }) {
  const svgMap = {
    button: <ThumbButton />,
    "file-trigger": <ThumbFileTrigger />,
    "toggle-group": <ThumbToggleGroup />,
    toggle: <ThumbToggle />,
    "checkbox": <ThumbCheckbox />,
    "checkbox-group": <ThumbCheckboxGroup />,
    "area-chart": <ThumbAreaChart />,
    "pie-chart": <ThumbPieChart />,
    "line-chart": <ThumbLineChart />,
    "bar-chart": <ThumbBarChart />,
    "tree": <ThumbTree />,
    "calendar": <ThumbCalendar />,
  }

  // @ts-ignore
  const svg = svgMap[name] || null

  return (
    <div className="relative flex aspect-video items-center justify-center bg-bg">
      <div className="absolute bottom-0 h-28 w-full bg-linear-to-t from-bg to-transparent" />
      {svg}
    </div>
  )
}
