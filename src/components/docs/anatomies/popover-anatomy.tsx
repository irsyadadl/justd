import { Popover } from "ui"

export default function PopoverAnatomy() {
  return (
    <Popover>
      <Popover.Trigger />
      <Popover.Content className="min-w-72">
        <Popover.Header>
          <Popover.Title />
          <Popover.Description />
        </Popover.Header>
        <Popover.Body />
        <Popover.Footer />
      </Popover.Content>
    </Popover>
  )
}
