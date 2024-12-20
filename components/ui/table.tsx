"use client"

import React from "react"

import { IconChevronLgDown, IconHamburger } from "justd-icons"
import type {
  CellProps,
  ColumnProps,
  ColumnResizerProps,
  TableHeaderProps as HeaderProps,
  RowProps,
  TableBodyProps,
  TableProps as TablePrimitiveProps,
} from "react-aria-components"
import {
  Button,
  Cell,
  Collection,
  Column,
  ColumnResizer as ColumnResizerPrimitive,
  ResizableTableContainer,
  Row,
  TableBody,
  TableHeader,
  Table as TablePrimitive,
  composeRenderProps,
  useTableOptions,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn } from "@/utils/classes"
import { Checkbox } from "./checkbox"

const table = tv({
  slots: {
    root: "min-w-full table **:data-drop-target:border **:data-drop-target:border-primary w-full caption-bottom border-spacing-0 text-sm outline-hidden",
    header: "border-b x32",
    row: "tr group relative cursor-default border-b text-fg/70 outline-hidden ring-primary data-focused:ring-0 data-focus-visible:ring-1 data-selected:bg-subtle data-selected:data-hovered:bg-subtle/50 dark:data-selected:data-hovered:bg-subtle/60",
    cellIcon:
      "flex-none rounded bg-secondary text-fg *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:size-3.5 *:data-[slot=icon]:transition-transform *:data-[slot=icon]:duration-200 size-[1.15rem] grid place-content-center shrink-0",
    columnResizer: [
      "touch-none absolute [&[data-resizing]>div]:bg-primary right-0 top-0 bottom-0 w-px px-1 grid place-content-center",
      "data-[resizable-direction=both]:cursor-ew-resize &[data-resizable-direction=left]:cursor-e-resize &[data-resizable-direction=right]:cursor-w-resize",
    ],
  },
})

const { root, header, row, cellIcon, columnResizer } = table()

interface TableProps extends TablePrimitiveProps {
  className?: string
  allowResize?: boolean
}

const TableContext = React.createContext<TableProps>({
  allowResize: false,
})

const useTableContext = () => React.useContext(TableContext)

const Table = ({ children, className, ...props }: TableProps) => (
  <TableContext.Provider value={props}>
    <div className="overflow-auto relative w-full">
      {props.allowResize ? (
        <ResizableTableContainer className="overflow-auto">
          <TablePrimitive {...props} className={root({ className })}>
            {children}
          </TablePrimitive>
        </ResizableTableContainer>
      ) : (
        <TablePrimitive {...props} className={root({ className })}>
          {children}
        </TablePrimitive>
      )}
    </div>
  </TableContext.Provider>
)

const ColumnResizer = ({ className, ...props }: ColumnResizerProps) => (
  <ColumnResizerPrimitive
    {...props}
    className={composeRenderProps(className, (className, renderProps) =>
      columnResizer({
        ...renderProps,
        className,
      }),
    )}
  >
    <div className="py-3 w-px h-full bg-border" />
  </ColumnResizerPrimitive>
)

const Body = <T extends object>(props: TableBodyProps<T>) => (
  <TableBody data-slot="table-body" {...props} className={cn("[&_.tr:last-child]:border-0")} />
)

interface TableCellProps extends CellProps {
  className?: string
}

const cellStyles = tv({
  base: "whitespace-nowrap group px-3 py-3 outline-hidden",
  variants: {
    allowResize: {
      true: "overflow-hidden truncate",
    },
  },
})
const TableCell = ({ children, className, ...props }: TableCellProps) => {
  const { allowResize } = useTableContext()
  return (
    <Cell data-slot="table-cell" {...props} className={cellStyles({ allowResize, className })}>
      {children}
    </Cell>
  )
}

const columnStyles = tv({
  base: "whitespace-nowrap relative allows-sorting:cursor-pointer px-3 py-3 text-left data-dragging:cursor-grabbing font-medium outline-hidden [&:has([slot=selection])]:pr-0",
  variants: {
    isResizable: {
      true: "overflow-hidden truncate",
    },
  },
})

interface TableColumnProps extends ColumnProps {
  className?: string
  isResizable?: boolean
}

const TableColumn = ({ isResizable = false, className, ...props }: TableColumnProps) => {
  return (
    <Column
      data-slot="table-column"
      {...props}
      className={columnStyles({
        isResizable,
        className,
      })}
    >
      {({ allowsSorting, sortDirection, isHovered }) => (
        <div className="flex items-center gap-2 **:data-[slot=icon]:shrink-0">
          <>
            {props.children as React.ReactNode}
            {allowsSorting && (
              <span className={cellIcon({ className: isHovered ? "bg-secondary-fg/10" : "" })}>
                <IconChevronLgDown className={sortDirection === "ascending" ? "rotate-180" : ""} />
              </span>
            )}
            {isResizable && <ColumnResizer />}
          </>
        </div>
      )}
    </Column>
  )
}

interface TableHeaderProps<T extends object> extends HeaderProps<T> {
  className?: string
  ref?: React.Ref<HTMLTableSectionElement>
}

const Header = <T extends object>({
  children,
  ref,
  className,
  columns,
  ...props
}: TableHeaderProps<T>) => {
  const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions()
  return (
    <TableHeader data-slot="table-header" ref={ref} className={header({ className })} {...props}>
      {allowsDragging && <Column className="w-0" />}
      {selectionBehavior === "toggle" && (
        <Column className="pl-4 w-0">
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{children}</Collection>
    </TableHeader>
  )
}

interface TableRowProps<T extends object> extends RowProps<T> {
  className?: string
  ref?: React.Ref<HTMLTableRowElement>
}

const TableRow = <T extends object>({
  children,
  className,
  columns,
  id,
  ref,
  ...props
}: TableRowProps<T>) => {
  const { selectionBehavior, allowsDragging } = useTableOptions()
  return (
    <Row
      ref={ref}
      data-slot="table-row"
      id={id}
      {...props}
      className={row({
        className:
          "href" in props
            ? cn(
                "cursor-pointer data-hovered:bg-secondary/50 data-hovered:text-secondary-fg",
                className,
              )
            : "",
      })}
    >
      {allowsDragging && (
        <Cell className="pr-0 group cursor-grab ring-primary data-dragging:cursor-grabbing">
          <Button
            className="relative py-1.5 pl-3.5 bg-transparent text-muted-fg data-pressed:text-fg"
            slot="drag"
          >
            <IconHamburger />
          </Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell className="pl-4">
          <span
            aria-hidden
            className="hidden absolute inset-y-0 left-0 w-0.5 h-full bg-primary group-data-selected:block"
          />
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </Row>
  )
}

Table.Body = Body
Table.Cell = TableCell
Table.Column = TableColumn
Table.Header = Header
Table.Row = TableRow

export type { TableProps, TableBodyProps, TableCellProps, TableColumnProps, TableRowProps }
export { Table }
