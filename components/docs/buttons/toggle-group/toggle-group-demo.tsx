import { IconBulletList, IconGrid4 } from "justd-icons"
import { Toggle, ToggleGroup } from "ui"

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup>
      <Toggle>
        <IconGrid4 />
        Grid
      </Toggle>
      <Toggle>
        <IconBulletList />
        List
      </Toggle>
    </ToggleGroup>
  )
}
