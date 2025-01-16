import { Menu } from "ui"

export default function MenuAnatomy() {
  return (
    <Menu>
      <Menu.Trigger>Open</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>
          <Menu.Label>Inbox</Menu.Label>
        </Menu.Item>
        <Menu.Item>
          <Menu.Label>Sent</Menu.Label>
        </Menu.Item>
        <Menu.Item>
          <Menu.Label>New Message</Menu.Label>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
