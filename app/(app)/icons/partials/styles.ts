import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    box: "flex flex-wrap justify-around gap-4",
    item: [
      "grid size-8 cursor-pointer place-content-center rounded-md text-fg/80 sm:size-14",
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
