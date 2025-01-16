import { SidebarInset, SidebarProvider } from "ui"

import AppSidebarNav from "../app-sidebar-nav"
import AppSidebar from "./app-sidebar"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider shortcut="1">
      <AppSidebar />
      <SidebarInset>
        <AppSidebarNav />
        <div className="p-4 lg:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
