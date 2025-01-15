"use client"

import { Modal, buttonStyles } from "ui"

export default function AlertDialogDemo() {
  return (
    <Modal>
      <Modal.Trigger className={buttonStyles({ intent: "danger" })}>Delete</Modal.Trigger>
      <Modal.Content role="alertdialog">
        <Modal.Header>
          <Modal.Title>Delete file</Modal.Title>
          <Modal.Description>
            This will permanently delete the selected file. Continue?
          </Modal.Description>
        </Modal.Header>
        <Modal.Footer>
          <Modal.Close appearance="outline">Cancel</Modal.Close>
          <Modal.Close appearance="solid" intent="danger">
            Continue
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
