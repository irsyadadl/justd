"use client"

import { Button, Modal } from "ui"

export default function ModalCustomClassnamesDemo() {
  return (
    <Modal>
      <Button>Open</Button>
      <Modal.Content
        classNames={{
          overlay: "bg-white/40 dark:bg-black/40 backdrop-blur",
          content: "bg-bg",
        }}
      >
        <Modal.Header title="Custom Classnames" description="This modal has custom class names." />
        <Modal.Footer>
          <Modal.Close>Close</Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
