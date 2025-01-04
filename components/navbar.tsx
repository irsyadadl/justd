"use client"
import React, { useState } from "react"

import { ResponsiveAside } from "@/components/responsive-aside"
import { siteConfig } from "@/resources/config/site"
import {
  IconBrandAdobe,
  IconBrandGithub,
  IconBrandJustd,
  IconBrandTailwindcss,
  IconBrandX,
  IconChevronLgDown,
  IconColorPalette,
  IconColors,
  IconCube,
  IconDeviceDesktop,
  IconDuplicateFill,
  IconHome,
  IconMoon,
  IconNotepad,
  IconPackage,
  IconSearch,
  IconSun,
  IconWindowVisit,
  IconWindowVisitFill,
} from "justd-icons"
import { LayoutGroup } from "motion/react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { Collection } from "react-aria-components"
import { Badge, Button, buttonStyles, Link, Menu, Separator } from "ui"

import { cn } from "@/utils/classes"
import { useMediaQuery } from "@/utils/use-media-query"
import { CommandPalette } from "./command-palette"
import { NavLink } from "./nav-item"
import { TakeCurrentUrl } from "./take-current-url"
import { ThemeSwitcher } from "./theme-switcher"

const menuItems = [
  { id: 1, label: "Home", url: "/" },
  { id: 4, label: "Components", url: "/docs/2.x/getting-started/introduction" },
]

export function Navbar() {
  const id = React.useId()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  return (
    <>
      <CommandPalette setOpen={setOpen} openCmd={open} />
      <LayoutGroup id={`navigation-${id}`}>
        <div className="xnw2 sticky top-0 z-30 hidden overflow-hidden pb-0 lg:block">
          <nav className="border-current/10 border-b bg-bg py-2 dark:supports-backdrop-filter:bg-bg/60 dark:supports-backdrop-filter:backdrop-blur-3xl">
            <div className="mx-auto max-w-(--breakpoint-2xl) px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-6">
                  <NavbarDropdown />
                  <Separator orientation="vertical" className="h-6" />
                  <Collection items={menuItems}>
                    <NavLink isNextLink isActive={pathname === "/"} href="/">
                      Home
                    </NavLink>
                    <NavLink
                      isNextLink
                      isActive={
                        pathname?.startsWith("/docs/2.x") &&
                        !pathname?.includes("/docs/2.x/components")
                      }
                      href="/docs/2.x/getting-started/introduction"
                    >
                      Docs
                    </NavLink>
                    <NavLink
                      isNextLink
                      isActive={
                        pathname?.startsWith("/docs/2.x/components") || pathname === "/components"
                      }
                      href="/components"
                    >
                      Components
                    </NavLink>

                    <NavLink isNextLink isActive={pathname === "/themes"} href="/themes">
                      Themes
                    </NavLink>
                    <Menu>
                      <Menu.Trigger
                        className={cn(
                          "group flex cursor-pointer items-center gap-x-2 py-3 text-muted-fg text-sm",
                        )}
                      >
                        Ecosystem
                        <IconChevronLgDown className="size-3 duration-200 group-data-pressed:rotate-180" />
                      </Menu.Trigger>
                      <Menu.Content
                        className="sm:min-w-xs sm:max-w-min"
                        placement="bottom"
                        items={ecosystemItems}
                      >
                        {(item) => (
                          <Menu.Item
                            href={item.href}
                            className="group items-start gap-x-3 **:data-[slot=icon]:size-4"
                          >
                            <div className="grid size-8 shrink-0 place-content-center rounded-md bg-secondary/40 ring-1 ring-fg/10">
                              {item.icon}
                            </div>
                            <Menu.ItemDetails>
                              <span className="font-medium sm:text-sm">
                                {item.label} {item.badge && <Badge>{item.badge}</Badge>}
                              </span>
                              <span className="-mt-1 block text-muted-fg text-xs">
                                {item.description}
                              </span>
                            </Menu.ItemDetails>
                          </Menu.Item>
                        )}
                      </Menu.Content>
                    </Menu>
                  </Collection>
                </div>
                <div className="flex items-center gap-x-1">
                  <>
                    <Button
                      onPress={() => setOpen((open: boolean) => !open)}
                      size="small"
                      appearance="outline"
                      className="h-9"
                    >
                      <IconSearch />

                      <span className="text-muted-fg">Search...</span>

                      <Menu.Keyboard className="-mr-2" keys="⌘K" />
                    </Button>
                    <TakeCurrentUrl />
                    <ThemeSwitcher />

                    <Menu>
                      <Button
                        size="small"
                        appearance="outline"
                        className="group justify-between text-left"
                      >
                        {pathname.includes("/docs/")
                          ? pathname.split("/")[2]
                          : siteConfig.currentVersion}
                        <IconChevronLgDown className="size-3 duration-200 group-pressed:rotate-180" />
                      </Button>
                      <Menu.Content placement="bottom right" className="sm:min-w-10">
                        <Menu.Item href="/docs/1.x/getting-started/introduction">1.x</Menu.Item>
                        <Menu.Item href="/docs/2.x/getting-started/introduction">2.x</Menu.Item>
                      </Menu.Content>
                    </Menu>
                    <Link
                      aria-label="Github Repository"
                      className={buttonStyles({
                        appearance: "outline",
                        size: "square-petite",
                        className: "**:data-[slot=icon]:text-fg",
                      })}
                      target="_blank"
                      href={siteConfig.repo}
                    >
                      <IconBrandGithub />
                    </Link>
                    <Link
                      aria-label="Follow Update on X"
                      className={buttonStyles({
                        appearance: "outline",
                        size: "square-petite",
                        className: "**:data-[slot=icon]:text-fg",
                      })}
                      target="_blank"
                      href="https://x.com/intent/follow?screen_name=irsyadadl"
                    >
                      <IconBrandX />
                    </Link>
                  </>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </LayoutGroup>
      {!isDesktop && <ResponsiveAside openCmd={open} setOpenCmd={setOpen} />}
    </>
  )
}

export function NavbarDropdown() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  return (
    <div className="flex items-center gap-x-1">
      <Menu>
        <Button aria-label={siteConfig.name} appearance="plain" className="-ml-1 group">
          <span className="flex items-center gap-x-2">
            <IconBrandJustd className="-ml-1 size-5" />
            <span className="font-mono text-base tracking-tight sm:text-sm">{siteConfig.name}</span>
            <IconChevronLgDown className="-mr-1 ml-3 size-3.5 text-muted-fg transition duration-300 group-hover:text-fg group-data-pressed:rotate-180 group-data-pressed:text-fg" />
          </span>
        </Button>
        <Menu.Content placement="bottom" className="sm:min-w-64">
          <Menu.Section title="Pages">
            <Menu.Item href="/">
              <IconHome />
              Home
            </Menu.Item>
            <Menu.Item href="/components">
              <IconCube />
              Components
            </Menu.Item>
            <Menu.Item href="/colors">
              <IconColors />
              Colors
            </Menu.Item>
            <Menu.Item href="/themes">
              <IconColorPalette />
              Themes
            </Menu.Item>
            <Menu.Item href="/blocks">
              <IconWindowVisit />
              Blocks
            </Menu.Item>
            <Menu.Item href="/icons">
              <IconBrandJustd />
              Icons
            </Menu.Item>
            <Menu.Item href="/blog">
              <IconNotepad />
              Blog
            </Menu.Item>
          </Menu.Section>
          <Menu.Section title="Refs">
            <Menu.Item href="https://x.com/intent/follow?screen_name=irsyadadl" target="_blank">
              <IconBrandX />X / Twitter
            </Menu.Item>
            <Menu.Item href="https://github.com/justdlabs" target="_blank">
              <IconBrandGithub />
              Github
            </Menu.Item>
            <Menu.Item
              href="https://react-spectrum.adobe.com/react-aria/components.html"
              target="_blank"
            >
              <IconBrandAdobe />
              RAC
            </Menu.Item>
            <Menu.Item href="https://tailwindcss.com" target="_blank">
              <IconBrandTailwindcss />
              Tailwind CSS
            </Menu.Item>
          </Menu.Section>
          <Menu.Section title="Preferences">
            <Menu.Submenu>
              <Menu.Item>
                {theme === "system" ? (
                  <IconDeviceDesktop />
                ) : theme === "dark" ? (
                  <IconMoon />
                ) : (
                  <IconSun />
                )}
                <span>Switch Theme</span>
              </Menu.Item>
              <Menu.Content>
                <Menu.Item onAction={() => setTheme("system")}>
                  <IconDeviceDesktop />
                  <span>System</span>
                </Menu.Item>
                <Menu.Item onAction={() => setTheme("dark")}>
                  <IconMoon />
                  <span>Dark</span>
                </Menu.Item>
                <Menu.Item onAction={() => setTheme("light")}>
                  <IconSun />
                  <span>Light</span>
                </Menu.Item>
              </Menu.Content>
            </Menu.Submenu>
          </Menu.Section>
        </Menu.Content>
      </Menu>
      <Menu>
        <Button appearance="plain" className="group justify-between text-left sm:hidden">
          {pathname.includes("/docs/") ? pathname.split("/")[2] : siteConfig.currentVersion}
          <IconChevronLgDown className="size-3 duration-200 group-pressed:rotate-180" />
        </Button>
        <Menu.Content placement="bottom right" className="sm:min-w-10">
          <Menu.Item href="/docs/1.x/getting-started/introduction">1.x</Menu.Item>
          <Menu.Item href="/docs/2.x/getting-started/introduction">2.x</Menu.Item>
        </Menu.Content>
      </Menu>
    </div>
  )
}
const ecosystemItems = [
  {
    id: 1,
    label: "Premium Starter Kit",
    href: "#",
    icon: <IconWindowVisitFill />,
    description:
      "Get started quickly with a complete React project setup, including authentication.",
    badge: "Coming soon",
  },
  {
    id: 2,
    label: "Premium Blocks",
    href: "#",
    icon: <IconPackage />,
    description: "Pre-designed, ready-to-use React components for seamless integration.",
    badge: "Coming soon",
  },
  {
    id: 3,
    label: "Icons",
    href: "/icons",
    icon: <IconDuplicateFill />,
    description: "Explore 1,191+ open-source SVG icons with frequent updates for your projects.",
  },
  {
    id: 4,
    label: "Themes",
    href: "/themes",
    icon: <IconColorPalette />,
    description: "Curated themes to easily create polished designs for your apps.",
  },
  {
    id: 5,
    label: "Colors",
    href: "/colors",
    icon: <IconColors />,
    description: "Over 154 colors blending TailwindCSS vibes with HTML color names.",
  },
  {
    id: 6,
    label: "Basic Blocks",
    href: "/blocks",
    icon: <IconWindowVisit />,
    description:
      "Example guides demonstrating how to effectively use components in their entirety.",
  },
]
