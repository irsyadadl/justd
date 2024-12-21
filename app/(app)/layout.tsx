import type React from "react"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Toast } from "ui"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex relative flex-col min-h-svh bg-bg">
      <Navbar />
      <main className="flex-1">{children}</main>

      <Footer />
      <Toast />
    </div>
  )
}
