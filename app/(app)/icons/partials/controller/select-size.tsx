import { useState } from "react"

import { useQueryString } from "hooks/use-query-string"
import { IconChevronLgDown } from "justd-icons"
import { usePathname, useRouter } from "next/navigation"
import type { Selection } from "react-aria-components"
import title from "title"
import { Button, Menu } from "ui"

const sizes = [
  { id: "size-4", name: "Size 4" },
  { id: "size-5", name: "Size 5" },
  { id: "size-6", name: "Size 6" },
]

export function SelectSize() {
  const router = useRouter()
  const pathname = usePathname()
  const { createQueryString } = useQueryString()

  const [selectedSize, setSelectSize] = useState<Selection>(new Set(["size-5"]))
  const onSelectionChange = (size: Selection) => {
    router.push(`${pathname}?${createQueryString("s", [...size].join(","))}`, {
      scroll: false,
    })
    setSelectSize(size)
  }

  return (
    <Menu aria-label="Select Icon Size">
      <Button
        className="**:data-[slot=icon]:transition-transform [&[data-pressed]_[data-slot=icon]]:rotate-180"
        appearance="outline"
      >
        <span className="inline sm:hidden">
          {title([...selectedSize].join(", ").replace("size-", " ")) || "5"}
        </span>
        <span className="hidden sm:inline">
          {title([...selectedSize].join(", ").replace("-", " ")) || "Size 5"}
        </span>
        <IconChevronLgDown />
      </Button>
      <Menu.Content
        selectionMode="single"
        selectedKeys={selectedSize}
        onSelectionChange={onSelectionChange}
        placement="bottom end"
        items={sizes}
      >
        {(item) => (
          <Menu.Item textValue={item.name}>
            {item.name} /{" "}
            {item.name === "Size 4" ? "20px" : item.name === "Size 5" ? "24px" : "28px"}
          </Menu.Item>
        )}
      </Menu.Content>
    </Menu>
  )
}
