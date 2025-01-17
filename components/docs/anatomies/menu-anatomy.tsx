import { IconInbox, IconSettings } from "justd-icons"
import { Menu } from "ui"

export default function MenuAnatomy() {
  return (
    <Menu>
      <Menu.Trigger>Open</Menu.Trigger>
      <Menu.Content>
        <Menu.Header>
          <Menu.Label>Account</Menu.Label>
        </Menu.Header>

        <Menu.Section title="Profile">
          <Menu.Item href="#">
            <IconSettings />
            <Menu.Label>Settings</Menu.Label>
          </Menu.Item>
          <Menu.Item>
            <Menu.Label>Billing</Menu.Label>
          </Menu.Item>
          <Menu.Item>
            <Menu.Label>Team Settings</Menu.Label>
          </Menu.Item>
        </Menu.Section>

        <Menu.Separator />

        <Menu.Section>
          <Menu.Submenu>
            <Menu.Item>
              <Menu.Label>Privacy</Menu.Label>
            </Menu.Item>
            <Menu.Content>
              <Menu.Item>
                <Menu.Label>Data Sharing</Menu.Label>
              </Menu.Item>
              <Menu.Item>
                <Menu.Label>Cookies</Menu.Label>
              </Menu.Item>
              <Menu.Separator />
              <Menu.Submenu>
                <Menu.Item>
                  <Menu.Label>Advanced</Menu.Label>
                </Menu.Item>
                <Menu.Content>
                  <Menu.Item>
                    <Menu.Label>Encryption</Menu.Label>
                  </Menu.Item>
                  <Menu.Item>
                    <Menu.Label>Access Logs</Menu.Label>
                  </Menu.Item>
                  <Menu.Item>
                    <Menu.Label>API Keys</Menu.Label>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Submenu>
            </Menu.Content>
          </Menu.Submenu>
          <Menu.Item>
            <IconInbox />
            <Menu.Label>Inbox</Menu.Label>
          </Menu.Item>
          <Menu.Item>
            <Menu.Label>Sent</Menu.Label>
          </Menu.Item>
          <Menu.Item>
            <Menu.Label>New Message</Menu.Label>
          </Menu.Item>
        </Menu.Section>
      </Menu.Content>
    </Menu>
  )
}
