"use client"

import { Grid } from "ui"

export default function GridResponsiveDemo() {
  return (
    <Grid
      columns={{
        initial: 3,
        sm: 4,
        md: 5,
        xl: 6,
      }}
      gap={{
        initial: 2,
        sm: 3,
        lg: 4,
      }}
    >
      <Grid.Item>
        <div className="h-32 border p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-32 border p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-32 border p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-32 border p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-32 border p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-32 border p-4" />
      </Grid.Item>
    </Grid>
  )
}
