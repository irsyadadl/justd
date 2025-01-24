"use client"

import { Grid } from "ui"

export default function GridDebugDemo() {
  return (
    <Grid debug columns={3} gap={4}>
      <Grid.Item className="h-24 w-full" />
      <Grid.Item className="h-24 w-full" />
      <Grid.Item className="h-24 w-full" />
      <Grid.Item className="h-24 w-full" />
      <Grid.Item className="h-24 w-full" />
      <Grid.Item className="h-24 w-full" />
      <Grid.Item className="h-24 w-full" />
      <Grid.Item className="h-24 w-full" />
      <Grid.Item className="h-24 w-full" />
    </Grid>
  )
}
