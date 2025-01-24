import { useEffect, useMemo, useRef, useState } from "react"

import { useFilter } from "react-aria"
import {
  Button,
  ComboBox,
  Dialog,
  Input,
  ListBox,
  ListBoxItem,
  Modal,
  ModalOverlay,
  Popover,
  Text,
} from "react-aria-components"

const items = [
  { id: 1, name: "Open file..." },
  { id: 2, name: "Create folder..." },
  { id: 3, name: "Open email..." },
  { id: 4, name: "Empty trash" },
  { id: 5, name: "Switch workspace..." },
  { id: 6, name: "Add teammate..." },
  { id: 7, name: "Quit application" },
]

export function CmdK() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [filterValue, setFilterValue] = useState("")
  const { contains } = useFilter({ sensitivity: "base" })
  const filteredItems = useMemo(
    () => items.filter((i) => contains(i.name, filterValue)),
    [contains, filterValue],
  )

  useEffect(() => {
    function toggle(e: KeyboardEvent) {
      if (e.key === "k" && e.metaKey) {
        setOpen((o) => !o)
      } else if (e.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", toggle, { capture: true })

    return () => {
      window.removeEventListener("keydown", toggle, { capture: true })
    }
  }, [])

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus()
      }, 50)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [open])

  return (
    <>
      <Button
        className="flex items-center gap-1 self-center rounded px-4 py-2 text-stone-800 ring-stone-600 ring-offset-2 transition hover:bg-stone-100 focus-visible:ring-3 data-focused:outline-hidden"
        onPress={() => setOpen(true)}
      >
        <kbd className="rounded-md border border-stone-400 border-b-2 p-1">cmd+k</kbd>
        to open
      </Button>
      <ModalOverlay
        isOpen={open}
        className="entering:fade-in fixed inset-0 z-10 flex min-h-full entering:animate-in justify-center overflow-y-auto bg-black/25 p-4 pt-[33dvh] text-center backdrop-blur-sm duration-150"
      >
        <Modal>
          <Dialog className="data-focused:outline-hidden" aria-label="command bar">
            <ComboBox
              aria-label="command bar"
              items={filteredItems}
              inputValue={filterValue}
              menuTrigger="focus"
              onInputChange={setFilterValue}
              onSelectionChange={() => {
                setOpen(false)
              }}
            >
              <div className="flex flex-col items-center">
                <Input
                  ref={inputRef}
                  aria-label="Search for apps, files, anything..."
                  placeholder="Search for apps, files, anything..."
                  className="w-[66vw] rounded-t-lg bg-stone-100 p-3 text-stone-800 data-focused:outline-hidden"
                />
                {filteredItems.length === 0 ? (
                  <Text
                    className="w-[66vw] rounded-b-lg border-t-2 border-b-stone-300 bg-stone-100 p-3 text-stone-800"
                    slot="description"
                  >
                    Hmm, we couldn't find anything
                  </Text>
                ) : (
                  <></>
                )}
              </div>

              <Popover
                offset={0}
                className="entering:slide-in-from-top-2 w-[66vw] entering:animate-in rounded-b-lg border-t-2 border-b-stone-300 bg-stone-100 p-3 text-stone-800 duration-75"
              >
                <ListBox className="flex flex-col gap-2">
                  {(i: (typeof items)[number]) => (
                    <ListBoxItem
                      textValue={i.name}
                      className="flex items-center gap-4 rounded-md p-2 data-focused:bg-stone-200"
                    >
                      {i.name}
                    </ListBoxItem>
                  )}
                </ListBox>
              </Popover>
            </ComboBox>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  )
}
