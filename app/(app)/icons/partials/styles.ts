import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    box: "flex justify-around flex-wrap gap-4",
    item: [
      "size-8 sm:size-14 grid cursor-pointer text-fg/80 place-content-center rounded-md",
      "data-focused:bg-primary data-focused:text-primary-fg data-focused:outline-hidden",
      "data-selected:bg-primary data-selected:text-primary-fg",
      "data-[open=true]:bg-primary data-[open=true]:text-primary-fg",
      "data-hovered:bg-secondary data-hovered:text-secondary-fg",
      "data-focus-visible:ring-4 data-focus-visible:ring-primary-fg/15",
    ],
  },
})

const { item, box } = styles()

export { item, box }
