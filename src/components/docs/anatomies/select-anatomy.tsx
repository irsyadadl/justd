import { IconBrandDiscord, IconBrandGithub } from "justd-icons"
import { Select } from "ui"

export default function SelectAnatomy() {
  return (
    <Select>
      <Select.Trigger />
      <Select.List>
        <Select.Option id="discord" textValue="Discord">
          <IconBrandDiscord />
          <Select.Label>Discord</Select.Label>
        </Select.Option>
        <Select.Separator />
        <Select.Option id="github" textValue="GitHub">
          <IconBrandGithub />
          <Select.Label>GitHub</Select.Label>
        </Select.Option>
        <Select.Option id="gitlab" textValue="GitLab">
          <Select.Label>GitLab</Select.Label>
        </Select.Option>
      </Select.List>
    </Select>
  )
}
