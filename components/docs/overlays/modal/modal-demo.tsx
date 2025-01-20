"use client"

import { Button, Form, Modal, TextField } from "ui"

export default function ModalDemo() {
  return (
    <Modal>
      <Button>Turn on 2FA</Button>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Nice! Let's beef up your account.</Modal.Title>
          <Modal.Description>
            2FA beefs up your account's defense. Pop in your password to keep going.
          </Modal.Description>
        </Modal.Header>
        <Form onSubmit={() => {}}>
          <Modal.Body className="isolate">
            <TextField
              isRequired
              autoFocus
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>
            <Button type="submit">Turn on 2FA</Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
