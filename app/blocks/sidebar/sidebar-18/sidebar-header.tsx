import {
  IconArrowDownLeft,
  IconArrowDownRight,
  IconArrowLeft,
  IconArrowRight,
  IconArrowShrink,
  IconArrowUp,
  IconArrowUpLeft,
  IconArrowUpRight,
  IconDotsVertical,
  IconFolderFill,
  IconMinus,
} from "justd-icons"
import { Button, SidebarHeader as Header, Link, Menu, SidebarLabel, useSidebar } from "ui"

export function SidebarHeader() {
  const { toggleSidebar } = useSidebar()
  return (
    <Header className="flex h-12 flex-row items-center justify-between border-b bg-gradient-to-b py-0">
      <Link
        className="flex items-center gap-x-2 group-data-[collapsible=dock]:size-10 group-data-[collapsible=dock]:justify-center"
        href="/docs/2.x/components/layouts/sidebar"
      >
        <IconFolderFill className="size-4.5" />
        <SidebarLabel className="font-medium text-sm">getjustd.com</SidebarLabel>
      </Link>
      <div className="-mr-2 flex items-center gap-x-0.5 text-muted-fg **:[button]:text-muted-fg **:[button]:*:data-[slot=icon]:size-3.5 **:[button]:data-hovered:text-fg">
        <Button className="size-7" size="square-petite" appearance="plain" aria-label="Collapse">
          <IconArrowUp />
        </Button>
        <Button className="size-7" size="square-petite" appearance="plain" aria-label="Shrink All">
          <IconArrowShrink />
        </Button>
        <Menu>
          <Button className="size-7" size="square-petite" appearance="plain" aria-label="Options">
            <IconDotsVertical />
          </Button>
          <Menu.Content className="sm:min-w-56">
            <Menu.Submenu>
              <Menu.Item>Behavior</Menu.Item>
              <Menu.Content defaultSelectedKeys={["2", "3"]}>
                <Menu.Checkbox id="0">Enable Preview Tab</Menu.Checkbox>
                <Menu.Checkbox id="1">Open Files with Single Click</Menu.Checkbox>
                <Menu.Checkbox id="2">Open Directories with Single Click</Menu.Checkbox>
                <Menu.Checkbox id="3">Show Hidden Files</Menu.Checkbox>
                <Menu.Checkbox id="4">Always Select Open Files</Menu.Checkbox>
              </Menu.Content>
            </Menu.Submenu>
            <Menu.Submenu>
              <Menu.Item>Appearance</Menu.Item>
              <Menu.Content defaultSelectedKeys={[2]}>
                <Menu.Checkbox id={1}>Members</Menu.Checkbox>
                <Menu.Checkbox id={2}>Exclude Files</Menu.Checkbox>
                <Menu.Checkbox id={3}>Scratchs and Consoles</Menu.Checkbox>
                <Menu.Checkbox id={4}>Files Details</Menu.Checkbox>
                <Menu.Separator />
                <Menu.Checkbox id={5}>File Nesting</Menu.Checkbox>
                <Menu.Separator />
                <Menu.Checkbox id={6}>Customize Tree View</Menu.Checkbox>
              </Menu.Content>
            </Menu.Submenu>
            <Menu.Submenu>
              <Menu.Item>Sort By</Menu.Item>
              <Menu.Content defaultSelectedKeys={[2]}>
                <Menu.Checkbox id={1}>Name</Menu.Checkbox>
                <Menu.Checkbox id={2}>Type</Menu.Checkbox>
                <Menu.Checkbox id={3}>Modified</Menu.Checkbox>
                <Menu.Checkbox id={4}>Folder Always On Top</Menu.Checkbox>
              </Menu.Content>
            </Menu.Submenu>
            <Menu.Item>Edit Scopes...</Menu.Item>
            <Menu.Checkbox>Group Tabs</Menu.Checkbox>
            <Menu.Submenu>
              <Menu.Item>View Mode</Menu.Item>
              <Menu.Content defaultSelectedKeys={[1]}>
                <Menu.Checkbox id={1}>Dock Pinned</Menu.Checkbox>
                <Menu.Checkbox id={2}>Dock Unpinned</Menu.Checkbox>
                <Menu.Checkbox id={3}>Undocked</Menu.Checkbox>
                <Menu.Checkbox id={4}>Float</Menu.Checkbox>
                <Menu.Checkbox id={5}>Window</Menu.Checkbox>
              </Menu.Content>
            </Menu.Submenu>
            <Menu.Submenu>
              <Menu.Item>Move to</Menu.Item>
              <Menu.Content defaultSelectedKeys={[1]}>
                <Menu.Checkbox id={1}>
                  <IconArrowRight />
                  Right
                </Menu.Checkbox>
                <Menu.Checkbox id={2}>
                  <IconArrowLeft />
                  Left
                </Menu.Checkbox>
                <Menu.Separator />
                <Menu.Checkbox id={5}>
                  <IconArrowDownLeft />
                  Bottom Left
                </Menu.Checkbox>
                <Menu.Checkbox id={6}>
                  <IconArrowDownRight />
                  Bottom Right
                </Menu.Checkbox>
                <Menu.Checkbox id={7}>
                  <IconArrowUpLeft />
                  Top Left
                </Menu.Checkbox>
                <Menu.Checkbox id={8}>
                  <IconArrowUpRight />
                  Top Right
                </Menu.Checkbox>
              </Menu.Content>
            </Menu.Submenu>
            <Menu.Submenu>
              <Menu.Item>Resize</Menu.Item>
              <Menu.Content>
                <Menu.Item id={1}>
                  Stretch to Left
                  <Menu.Keyboard keys={"⌃⌥←"} />
                </Menu.Item>
                <Menu.Item id={2}>
                  Stretch to Right
                  <Menu.Keyboard keys={"⌃⌥→"} />
                </Menu.Item>
                <Menu.Item isDisabled id={3}>
                  Stretch to Top
                  <Menu.Keyboard keys={"⌃⌥↑"} />
                </Menu.Item>
                <Menu.Item isDisabled id={4}>
                  Stretch to Bottom
                  <Menu.Keyboard keys={"⌃⌥↓"} />
                </Menu.Item>
                <Menu.Item id={5}>
                  Stretch to Fit
                  <Menu.Keyboard keys={"⌃⌥⌘→"} />
                </Menu.Item>
                <Menu.Item id={5}>
                  Maximize Tool Window
                  <Menu.Keyboard keys={"⌃⌥⌘→"} />
                </Menu.Item>
              </Menu.Content>
            </Menu.Submenu>
            <Menu.Separator />
            <Menu.Item>Remove From Sidebar</Menu.Item>
          </Menu.Content>
        </Menu>
        <Button
          onPress={toggleSidebar}
          className="size-7"
          size="square-petite"
          appearance="plain"
          aria-label="Minimize"
        >
          <IconMinus />
        </Button>
      </div>
    </Header>
  )
}
