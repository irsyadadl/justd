"use client"

import { Grid } from "ui"

export default function GridItemDemo() {
  return (
    <Grid debug columns={3} gap={4}>
      <Grid.Item
        colSpan={{
          initial: 1,
          sm: 2,
        }}
        className="grid h-24 w-full place-content-center"
      >
        1
      </Grid.Item>
      <Grid.Item className="grid h-24 w-full place-content-center">2</Grid.Item>
      <Grid.Item
        colSpan={{
          initial: 1,
          sm: 3,
        }}
        className="grid h-24 w-full place-content-center"
      >
        3
      </Grid.Item>
    </Grid>
  )
}
