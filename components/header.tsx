"use client"

import type React from "react"

import { Container, Heading } from "ui"

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b pt-12 pb-4 lg:py-16">
      <Container>
        <Heading level={1} className="text-2xl sm:text-3xl">
          {children}
        </Heading>
      </Container>
    </div>
  )
}
