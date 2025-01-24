"use client"

import { Avatar, Breadcrumbs, Link, Menu, Separator, SidebarNav, SidebarTrigger } from "ui"

import {
  IconBrandApple,
  IconCommandRegular,
  IconDashboard,
  IconDeviceDesktop,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
} from "justd-icons"
import { useTheme } from "next-themes"

export default function AppSidebarNav() {
  return (
    <SidebarNav className="border-b">
      <span className="flex items-center gap-x-4">
        <SidebarTrigger className="-mx-2" />
        <Separator className="h-6" orientation="vertical" />
        <Link href="/" aria-label="Home">
          <IconBrandApple />
        </Link>
        <Breadcrumbs className="@md:flex hidden">
          <Breadcrumbs.Item href="/blocks/sidebar/sidebar-01">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item>Newsletter</Breadcrumbs.Item>
        </Breadcrumbs>
      </span>
      <UserMenu />
    </SidebarNav>
  )
}

function UserMenu() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <Menu>
      <Menu.Trigger className="ml-auto md:hidden" aria-label="Open Menu">
        <Avatar alt="kurt cobain" src="/images/avatar/cobain.jpg" />
      </Menu.Trigger>
      <Menu.Content placement="bottom" showArrow className="sm:min-w-64">
        <Menu.Section>
          <Menu.Header separator>
            <span className="block">Kurt Cobain</span>
            <span className="font-normal text-muted-fg">@cobain</span>
          </Menu.Header>
        </Menu.Section>
        <Menu.Item href="#dashboard">
          <IconDashboard />
          <Menu.Label>Dashboard</Menu.Label>
        </Menu.Item>
        <Menu.Item href="#settings">
          <IconSettings />
          <Menu.Label>Settings</Menu.Label>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item>
          <IconCommandRegular />
          <Menu.Label>Command Menu</Menu.Label>
        </Menu.Item>
        <Menu.Submenu>
          <Menu.Item>
            {resolvedTheme === "light" ? (
              <IconSun />
            ) : resolvedTheme === "dark" ? (
              <IconMoon />
            ) : (
              <IconDeviceDesktop />
            )}
            <Menu.Label>Switch theme</Menu.Label>
          </Menu.Item>
          <Menu.Content>
            <Menu.Item onAction={() => setTheme("system")}>
              <IconDeviceDesktop /> System
            </Menu.Item>
            <Menu.Item onAction={() => setTheme("dark")}>
              <IconMoon /> Dark
            </Menu.Item>
            <Menu.Item onAction={() => setTheme("light")}>
              <IconSun /> Light
            </Menu.Item>
          </Menu.Content>
        </Menu.Submenu>
        <Menu.Separator />
        <Menu.Item href="#contact-s">
          <Menu.Label>Contact Support</Menu.Label>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item href="#logout">
          <IconLogout />
          <Menu.Label>Log out</Menu.Label>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
