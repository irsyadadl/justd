"use client"

import { Grid } from "ui"

export default function GridBasicDemo() {
  return (
    <Grid columns={6}>
      <Grid.Item>
        <div className="h-32 border-y border-l p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-32 border-y border-l p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-32 border-y border-l p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-32 border-y border-l p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-32 border-y border-l p-4" />
      </Grid.Item>
      <Grid.Item>
        <div className="h-32 border-y border-r border-l p-4" />
      </Grid.Item>
    </Grid>
  )
}
