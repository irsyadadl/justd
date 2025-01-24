import { Button, Sheet } from "ui"

export default function SheetAnatomy() {
  return (
    <Sheet>
      <Button>Edit Settings</Button>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Update User Settings</Sheet.Title>
          <Sheet.Description>Adjust your preferences and configurations here.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Body>...</Sheet.Body>
        <Sheet.Footer>
          <Sheet.Close>Cancel</Sheet.Close>
          <Button intent="primary" type="submit">
            Save Changes
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  )
}
