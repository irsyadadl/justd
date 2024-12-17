"use client"

import { Button, Card, Checkbox, Link, TextField } from "ui"

export default function CardLoginFormDemo() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <Card.Header>
        <Card.Title>Login</Card.Title>
        <Card.Description>Don't loose the level, just keep on going.</Card.Description>
      </Card.Header>
      <Card.Content className="space-y-6">
        <TextField isRequired label="Email" placeholder="Enter your email" />
        <TextField
          isRequired
          label="Password"
          isRevealable
          type="password"
          placeholder="Enter your password"
        />
        <div className="flex justify-between items-center">
          <Checkbox>Remember me</Checkbox>
          <Link intent="primary" className="text-sm" href="#">
            Forgot password?
          </Link>
        </div>
      </Card.Content>
      <Card.Footer>
        <Button className="w-full">Login</Button>
      </Card.Footer>
    </Card>
  )
}
