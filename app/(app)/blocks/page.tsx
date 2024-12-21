import { BlockSandbox } from "@/components/code/block-sandbox"
import { Header } from "@/components/header"
import { Container } from "ui"

export const metadata = {
  title: "Blocks",
  description:
    "Blocks offers a comprehensive collection of example guides demonstrating how to effectively use components in their entirety.",
}

export default function Page() {
  return (
    <div>
      <Header>
        Blo
        <span className="text-muted-fg">cks</span>
      </Header>
      <Container className="py-6 space-y-16 sm:py-16">
        <div className="flex flex-col gap-1">
          <BlockSandbox
            {...{
              isIframe: true,
              title: "Default Sidebar",
              defaultSelected: "app-sidebar.tsx",
              fullscreen: "/blocks/sidebar/sidebar-01",
              preview: "/blocks/sidebar/sidebar-01",
              expandKeys: ["components", "app"],
              initialRegistry: "blocks/sidebar/sidebar-01/app-sidebar",
              folders: {
                components: {
                  ui: {
                    "badge.tsx": "ui/badge",
                    "link.tsx": "ui/link",
                    "avatar.tsx": "ui/avatar",
                    "menu.tsx": "ui/menu",
                    "separator.tsx": "ui/separator",
                    "sheet.tsx": "ui/sheet",
                    "tooltip.tsx": "ui/tooltip",
                    "primitive.tsx": "ui/primitive",
                    "button.tsx": "ui/button",
                    "sidebar.tsx": "ui/sidebar",
                  },

                  "app-sidebar.tsx": "blocks/sidebar/sidebar-01/app-sidebar",
                },
                app: {
                  "page.tsx": "blocks/sidebar/sidebar-01/page",
                  "layout.tsx": "blocks/sidebar/sidebar-01/layout",
                  "global.css": "blocks/main.css",
                },
              },
            }}
          />

          <BlockSandbox
            {...{
              isIframe: true,
              title: "Inset Sidebar",
              defaultSelected: "app-sidebar.tsx",
              fullscreen: "/blocks/sidebar/sidebar-03",
              preview: "/blocks/sidebar/sidebar-03",
              expandKeys: ["components", "app"],
              initialRegistry: "blocks/sidebar/app-sidebar",
              folders: {
                components: {
                  ui: {
                    "badge.tsx": "ui/badge",
                    "link.tsx": "ui/link",
                    "avatar.tsx": "ui/avatar",
                    "menu.tsx": "ui/menu",
                    "separator.tsx": "ui/separator",
                    "sheet.tsx": "ui/sheet",
                    "tooltip.tsx": "ui/tooltip",
                    "primitive.tsx": "ui/primitive",
                    "button.tsx": "ui/button",
                    "sidebar.tsx": "ui/sidebar",
                  },
                  "app-sidebar.tsx": "blocks/sidebar/app-sidebar",
                },
                app: {
                  "page.tsx": "blocks/sidebar/sidebar-03/page",
                  "layout.tsx": "blocks/sidebar/sidebar-03/layout",
                  "global.css": "blocks/main.css",
                },
              },
            }}
          />

          <BlockSandbox
            {...{
              isIframe: true,
              title: "Floating Sidebar",
              defaultSelected: "app-sidebar.tsx",
              fullscreen: "/blocks/sidebar/sidebar-04",
              preview: "/blocks/sidebar/sidebar-04",
              expandKeys: ["components", "app"],
              initialRegistry: "blocks/sidebar/app-sidebar",
              folders: {
                components: {
                  ui: {
                    "badge.tsx": "ui/badge",
                    "link.tsx": "ui/link",
                    "avatar.tsx": "ui/avatar",
                    "menu.tsx": "ui/menu",
                    "separator.tsx": "ui/separator",
                    "sheet.tsx": "ui/sheet",
                    "tooltip.tsx": "ui/tooltip",
                    "primitive.tsx": "ui/primitive",
                    "button.tsx": "ui/button",
                    "sidebar.tsx": "ui/sidebar",
                  },
                  "app-sidebar.tsx": "blocks/sidebar/app-sidebar",
                },
                app: {
                  "page.tsx": "blocks/sidebar/sidebar-04/page",
                  "layout.tsx": "blocks/sidebar/sidebar-04/layout",
                  "global.css": "blocks/main.css",
                },
              },
            }}
          />

          <BlockSandbox
            {...{
              title: "Default Navbar",
              defaultSelected: "app-navbar.tsx",
              fullscreen: "/blocks/navbar/navbar-00",
              preview: "blocks/navbar/navbar-00/app-navbar",
              expandKeys: ["components", "ui", "app"],
              initialRegistry: "blocks/navbar/navbar-00/app-navbar",
              folders: {
                components: {
                  ui: {
                    "primitive.tsx": "ui/primitive",
                    "avatar.tsx": "ui/avatar",
                    "menu.tsx": "ui/menu",
                    "button.tsx": "ui/button",
                    "sheet.tsx": "ui/sheet",
                    "separator.tsx": "ui/separator",
                    "navbar.tsx": "ui/navbar",
                  },
                  "app-navbar.tsx": "blocks/navbar/navbar-00/app-navbar",
                  "theme-switcher.tsx": "blocks/theme-switcher",
                },
                app: {
                  "global.css": "blocks/main.css",
                  "page.tsx": "blocks/navbar/navbar-00/page",
                  "layout.tsx": "blocks/navbar/navbar-00/layout",
                },
              },
            }}
          />

          <BlockSandbox
            {...{
              isIframe: true,
              title: "Inset Navbar",
              defaultSelected: "app-navbar.tsx",
              fullscreen: "/blocks/navbar/navbar-03",
              preview: "blocks/navbar/navbar-03",
              expandKeys: ["components", "ui", "app"],
              initialRegistry: "blocks/navbar/navbar-03/app-navbar",
              folders: {
                components: {
                  ui: {
                    "primitive.tsx": "ui/primitive",
                    "avatar.tsx": "ui/avatar",
                    "menu.tsx": "ui/menu",
                    "button.tsx": "ui/button",
                    "sheet.tsx": "ui/sheet",
                    "separator.tsx": "ui/separator",
                    "navbar.tsx": "ui/navbar",
                  },
                  "theme-switcher.tsx": "blocks/theme-switcher",
                  "app-navbar.tsx": "blocks/navbar/navbar-03/app-navbar",
                },
                app: {
                  "global.css": "blocks/main.css",
                  "page.tsx": "blocks/navbar/navbar-03/page",
                  "layout.tsx": "blocks/navbar/navbar-03/layout",
                },
              },
            }}
          />

          <BlockSandbox
            {...{
              title: "Floating Navbar",
              defaultSelected: "app-navbar.tsx",
              fullscreen: "/blocks/navbar/navbar-02",
              preview: "blocks/navbar/navbar-02/app-navbar",
              expandKeys: ["components", "ui", "app"],
              initialRegistry: "blocks/navbar/navbar-02/app-navbar",
              folders: {
                components: {
                  ui: {
                    "primitive.tsx": "ui/primitive",
                    "avatar.tsx": "ui/avatar",
                    "menu.tsx": "ui/menu",
                    "button.tsx": "ui/button",
                    "sheet.tsx": "ui/sheet",
                    "separator.tsx": "ui/separator",
                    "navbar.tsx": "ui/navbar",
                  },
                  "theme-switcher.tsx": "blocks/theme-switcher",
                  "app-navbar.tsx": "blocks/navbar/navbar-02/app-navbar",
                },
                app: {
                  "global.css": "blocks/main.css",
                  "page.tsx": "blocks/navbar/navbar-02/page",
                  "layout.tsx": "blocks/navbar/navbar-02/layout",
                },
              },
            }}
          />
        </div>
      </Container>
    </div>
  )
}
