import ColorPickerCombinationDemo from "@/components/docs/colors/color-picker/color-picker-combination-demo"
import ColorPickerControlledDemo from "@/components/docs/colors/color-picker/color-picker-controlled-demo"
import ColorPickerDemo from "@/components/docs/colors/color-picker/color-picker-demo"

export default function Page() {
  return (
    <div className="flex gap-4 p-6">
      <ColorPickerDemo />
      <ColorPickerCombinationDemo />
      <ColorPickerControlledDemo />
    </div>
  )
}
