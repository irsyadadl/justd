import { Radio, RadioGroup } from "ui"

export default function RadioGroupAnatomy() {
  return (
    <RadioGroup label="Features">
      <Radio value="fs">Font size: Small, Medium, Large</Radio>
      <Radio value="ks">Keyboard shortcuts: Enabled, Disabled</Radio>
    </RadioGroup>
  )
}
