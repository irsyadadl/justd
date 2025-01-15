"use client"

import { Breadcrumbs } from "ui"

export default function BreadcrumbsCurrentDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Components</Breadcrumbs.Item>

      <Breadcrumbs.Item
        className={({ isCurrent }) => (isCurrent ? "text-sky-500" : "text-secondary")}
      >
        Navbar
      </Breadcrumbs.Item>
    </Breadcrumbs>
  )
}
