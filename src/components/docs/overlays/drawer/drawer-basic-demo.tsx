"use client"

import { Drawer, TextField, buttonStyles } from "ui"

export default function DrawerBasicDemo() {
  return (
    <Drawer>
      <Drawer.Trigger className={buttonStyles({ appearance: "outline" })}>Login</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Login</Drawer.Title>
          <Drawer.Description>
            Please enter your credentials to access your account.
          </Drawer.Description>
        </Drawer.Header>
        <Drawer.Body className="space-y-4">
          <TextField label="Email" type="email" placeholder="john.doe@example.com" />
          <TextField label="Password" type="password" placeholder="••••••••••••" isRevealable />
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close className="w-full">Login</Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}
