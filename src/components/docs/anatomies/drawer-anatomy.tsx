import { Button, Drawer } from "ui"

export default function DrawerAnatomy() {
  return (
    <Drawer>
      <Drawer.Trigger />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title />
          <Drawer.Description />
        </Drawer.Header>
        <Drawer.Body />
        <Drawer.Footer>
          <Drawer.Close />
          <Button />
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}
