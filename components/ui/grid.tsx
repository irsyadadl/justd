import { cn } from "@/utils/classes"
import { tv, type VariantProps } from "tailwind-variants"

const gridStyles = tv(
  {
    base: "grid",
    variants: {
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        7: "grid-cols-7",
        8: "grid-cols-8",
        9: "grid-cols-9",
        10: "grid-cols-10",
        11: "grid-cols-11",
        12: "grid-cols-12",
        none: "grid-cols-none",
        subgrid: "grid-cols-subgrid",
      },
      rows: {
        1: "grid-rows-1",
        2: "grid-rows-2",
        3: "grid-rows-3",
        4: "grid-rows-4",
        5: "grid-rows-5",
        6: "grid-rows-6",
        7: "grid-rows-7",
        8: "grid-rows-8",
        9: "grid-rows-9",
        10: "grid-rows-10",
        11: "grid-rows-11",
        12: "grid-rows-12",
      },
      flow: {
        row: "grid-flow-row",
        col: "grid-flow-col",
        dense: "grid-flow-dense",
        rowDense: "grid-flow-row-dense",
        colDense: "grid-flow-col-dense",
      },
      gap: {
        0: "gap-0",
        0.5: "gap-0.5",
        1: "gap-1",
        1.5: "gap-1.5",
        2: "gap-2",
        2.5: "gap-2.5",
        3: "gap-3",
        3.5: "gap-3.5",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        7: "gap-7",
        8: "gap-8",
        9: "gap-9",
        10: "gap-10",
        11: "gap-11",
        12: "gap-12",
        14: "gap-14",
        16: "gap-16",
        20: "gap-20",
        24: "gap-24",
      },
      gapX: {
        0: "gap-x-0",
        0.5: "gap-x-0.5",
        1: "gap-x-1",
        1.5: "gap-x-1.5",
        2: "gap-x-2",
        2.5: "gap-x-2.5",
        3: "gap-x-3",
        3.5: "gap-x-3.5",
        4: "gap-x-4",
        5: "gap-x-5",
        6: "gap-x-6",
        7: "gap-x-7",
        8: "gap-x-8",
        9: "gap-x-9",
        10: "gap-x-10",
        11: "gap-x-11",
        12: "gap-x-12",
        14: "gap-x-14",
        16: "gap-x-16",
        20: "gap-x-20",
        24: "gap-x-24",
      },
      gapY: {
        0: "gap-y-0",
        0.5: "gap-y-0.5",
        1: "gap-y-1",
        1.5: "gap-y-1.5",
        2: "gap-y-2",
        2.5: "gap-y-2.5",
        3: "gap-y-3",
        3.5: "gap-y-3.5",
        4: "gap-y-4",
        5: "gap-y-5",
        6: "gap-y-6",
        7: "gap-y-7",
        8: "gap-y-8",
        9: "gap-y-9",
        10: "gap-y-10",
        11: "gap-y-11",
        12: "gap-y-12",
        14: "gap-y-14",
        16: "gap-y-16",
        20: "gap-y-20",
        24: "gap-y-24",
      },
      autoRows: {
        auto: "auto-rows-auto",
        min: "auto-rows-min",
        max: "auto-rows-max",
        fr: "auto-rows-fr",
      },
      autoColumns: {
        auto: "auto-cols-auto",
        min: "auto-cols-min",
        max: "auto-cols-max",
        fr: "auto-cols-fr",
      },
    },
    defaultVariants: {
      columns: 1,
    },
  },
  {
    responsiveVariants: true,
  },
)

interface GridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridStyles> {
  className?: string
  debug?: boolean
}

const Grid = ({
  className,
  gap,
  gapX,
  gapY,
  flow,
  columns,
  rows,
  autoRows,
  autoColumns,
  ...props
}: GridProps) => {
  return (
    <div
      aria-label={props["aria-label"] || "grid"}
      className={gridStyles({
        gap: gap ?? gapX ?? gapY,
        gapX: gapX ?? gap,
        gapY: gapY ?? gap,
        flow: flow ?? "row",
        autoRows: autoRows,
        autoColumns: autoColumns,
        columns: columns ?? 1,
        rows: rows ?? 1,
        className:
          "debug" in props
            ? cn("*:data-[slot=grid-cell]:border *:data-[slot=grid-cell]:border-warning", className)
            : className,
      })}
      {...props}
    >
      {props.children}
    </div>
  )
}

const gridItemStyles = tv(
  {
    base: "grid-cell data-focused:outline-hidden",
    variants: {
      colSpan: {
        auto: "col-auto",
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        5: "col-span-5",
        6: "col-span-6",
        7: "col-span-7",
        8: "col-span-8",
        9: "col-span-9",
        10: "col-span-10",
        11: "col-span-11",
        12: "col-span-12",
        full: "col-span-full",
      },
      colStart: {
        1: "col-start-1",
        2: "col-start-2",
        3: "col-start-3",
        4: "col-start-4",
        5: "col-start-5",
        6: "col-start-6",
        7: "col-start-7",
        8: "col-start-8",
        9: "col-start-9",
        10: "col-start-10",
        11: "col-start-11",
        12: "col-start-12",
        13: "col-start-13",
        auto: "col-start-auto",
      },
      colEnd: {
        1: "col-end-1",
        2: "col-end-2",
        3: "col-end-3",
        4: "col-end-4",
        5: "col-end-5",
        6: "col-end-6",
        7: "col-end-7",
        8: "col-end-8",
        9: "col-end-9",
        10: "col-end-10",
        11: "col-end-11",
        12: "col-end-12",
        13: "col-end-13",
        auto: "col-end-auto",
      },
      rowSpan: {
        auto: "row-auto",
        1: "row-span-1",
        2: "row-span-2",
        3: "row-span-3",
        4: "row-span-4",
        5: "row-span-5",
        6: "row-span-6",
        7: "row-span-7",
        8: "row-span-8",
        9: "row-span-9",
        10: "row-span-10",
        11: "row-span-11",
        12: "row-span-12",
        full: "row-span-full",
      },
      rowStart: {
        1: "row-start-1",
        2: "row-start-2",
        3: "row-start-3",
        4: "row-start-4",
        5: "row-start-5",
        6: "row-start-6",
        7: "row-start-7",
        8: "row-start-8",
        9: "row-start-9",
        10: "row-start-10",
        11: "row-start-11",
        12: "row-start-12",
        13: "row-start-13",
        auto: "row-start-auto",
      },
      rowEnd: {
        1: "row-end-1",
        2: "row-end-2",
        3: "row-end-3",
        4: "row-end-4",
        5: "row-end-5",
        6: "row-end-6",
        7: "row-end-7",
        8: "row-end-8",
        9: "row-end-9",
        10: "row-end-10",
        11: "row-end-11",
        12: "row-end-12",
        13: "row-end-13",
        auto: "row-end-auto",
      },
      order: {
        first: "order-first",
        last: "order-last",
        none: "order-none",
        1: "order-1",
        2: "order-2",
        3: "order-3",
        4: "order-4",
        5: "order-5",
        6: "order-6",
        7: "order-7",
        8: "order-8",
        9: "order-9",
        10: "order-10",
        11: "order-11",
        12: "order-12",
      },
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg", "xl", "2xl"],
  },
)

interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemStyles> {
  className?: string
}

const GridItem = ({
  children,
  className,
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  order,
  ...props
}: GridItemProps) => {
  return (
    <div
      data-slot="grid-cell"
      className={gridItemStyles({
        colSpan,
        rowSpan,
        colStart,
        colEnd,
        rowStart,
        rowEnd,
        order,
        className,
      })}
      {...props}
    >
      {children}
    </div>
  )
}

Grid.Item = GridItem

export { Grid, gridStyles, gridItemStyles }
