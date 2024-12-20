"use client"

import { Grid } from "ui"

export default function GridGapXYDemo() {
  return (
    <Grid
      columns={{
        initial: 3,
        sm: 4,
        md: 6,
      }}
      gapX={{
        initial: 2,
        sm: 4,
      }}
      gapY={{
        initial: 4,
        sm: 6,
      }}
    >
      <Grid.Item>
        <div className="p-4 h-24 border" />
      </Grid.Item>
      <Grid.Item>
        <div className="p-4 h-24 border" />
      </Grid.Item>
      <Grid.Item>
        <div className="p-4 h-24 border" />
      </Grid.Item>
      <Grid.Item>
        <div className="p-4 h-24 border" />
      </Grid.Item>
      <Grid.Item>
        <div className="p-4 h-24 border" />
      </Grid.Item>
      <Grid.Item>
        <div className="p-4 h-24 border" />
      </Grid.Item>
    </Grid>
  )
}
