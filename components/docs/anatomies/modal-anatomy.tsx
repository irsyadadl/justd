import { Button, Modal } from "ui"

export default function ModalAnatomy() {
  return (
    <Modal>
      <Modal.Trigger />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title />
          <Modal.Description />
        </Modal.Header>
        <Modal.Body />
        <Modal.Footer>
          <Modal.Close />
          <Button />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
