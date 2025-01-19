"use client"

import { Button, Checkbox, Form, Link, Popover, TextField } from "ui"

export default function PopoverCustomClose() {
  return (
    <Popover>
      <Button>Login</Button>
      <Popover.Content className="sm:min-w-96">
        <Popover.Header>
          <Popover.Title>Login</Popover.Title>
          <Popover.Description>Enter your credentials to sign in.</Popover.Description>
        </Popover.Header>
        <Form onSubmit={() => {}}>
          <Popover.Body>
            <div className="space-y-4">
              <TextField isRequired type="email" label="Email" placeholder="Enter your email" />
              <TextField
                isRequired
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
              <div className="flex items-center justify-between">
                <Checkbox name="remember-me">Remember me</Checkbox>
                <Link intent="primary" href="#">
                  Forgot password?
                </Link>
              </div>
            </div>
          </Popover.Body>
          <Popover.Footer>
            <Popover.Close>Cancel</Popover.Close>
            <Button type="submit">Login</Button>
          </Popover.Footer>
        </Form>
      </Popover.Content>
    </Popover>
  )
}
