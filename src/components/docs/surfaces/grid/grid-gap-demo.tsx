"use client"

import { Grid } from "ui"

export default function GridGapDemo() {
  return (
    <Grid
      columns={{
        initial: 4,
        sm: 5,
        md: 6,
      }}
      gap={{
        initial: 2,
        sm: 4,
      }}
    >
      <Grid.Item>
        <div className="h-24 border p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-24 border p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-24 border p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-24 border p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-24 border p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-24 border p-4" />
      </Grid.Item>
    </Grid>
  )
}
