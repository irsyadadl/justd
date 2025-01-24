import AppSidebar from "@/app/blocks/sidebar/app-sidebar"
import AppSidebarNav from "@/app/blocks/sidebar/app-sidebar-nav"
import { Heading, SidebarInset, SidebarProvider } from "ui"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar collapsible="dock" intent="inset" />
      <SidebarInset>
        <AppSidebarNav />
        <div className="p-4 lg:p-6">
          <Heading>Inset</Heading>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
