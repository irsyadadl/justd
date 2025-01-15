"use client"

import { useState } from "react"

import { Button, Grid, Modal } from "ui"

type Size = Pick<React.ComponentProps<typeof Modal.Content>, "size">["size"]
const sizes: Size[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"]
export default function ModalSizeDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalSize, setModalSize] = useState<Size>("md")

  const handlePress = (size: Size, open: boolean) => {
    setModalSize(size)
    setIsOpen(open)
  }
  return (
    <>
      <Grid columns={{ initial: 2, sm: 3, lg: 4 }} gap={2}>
        {sizes.map((size, idx) => (
          <Grid.Item key={idx}>
            <Button appearance="outline" onPress={() => handlePress(size, true)}>
              Open {size}
            </Button>
          </Grid.Item>
        ))}
      </Grid>

      <Modal.Content isOpen={isOpen} onOpenChange={setIsOpen} size={modalSize}>
        <Modal.Header>
          <Modal.Title>Project Update</Modal.Title>
          <Modal.Description>
            Dive deep into our project’s latest updates where we've streamlined workflow and
            improved user interfaces.
          </Modal.Description>
        </Modal.Header>
        <Modal.Footer>
          <Button appearance="outline" onPress={() => setIsOpen(false)}>
            Close
          </Button>
          <Button onPress={() => setIsOpen(false)}>Confirm</Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  )
}
