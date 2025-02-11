"use client"
import { IconBrandJustdBlocks } from "@/components/icons/icon-brand-justd-blocks"
import { IconArrowRight } from "justd-icons"
import { useEffect } from "react"
import { toast } from "sonner"
import { Link } from "ui"

export function Banner() {
  useEffect(() => {
    const dismissedTime = localStorage.getItem("toastDismissedTime")
    const currentTime = Date.now()

    if (!dismissedTime || currentTime - parseInt(dismissedTime) > 86400000) {
      setTimeout(() => {
        toast("🎉 Save 15% on all Justd Blocks for a limited time during the launch!", {
          duration: Infinity,
          action: {
            label: "Let's go!",
            onClick: () => window.open("https://dub.sh/NfSXJrL", "_blank"),
          },
          cancel: {
            label: "Nah",
            onClick: () => {
              localStorage.setItem("toastDismissedTime", currentTime.toString())
              toast.dismiss()
            },
          },
        })
      }, 1000)
    }
  }, [])

  return (
    <Link
      href="https://dub.sh/c4aLqep"
      target="_blank"
      className="group block w-full border-b bg-muted/80 px-4 pt-1.5 pb-1 text-center text-sm/6 transition data-hovered:bg-muted/60 sm:py-2.5"
    >
      <div className="inline-flex items-center rounded-md sm:border sm:border-zinc-300 sm:bg-bg sm:px-2.5 sm:py-1 sm:shadow-xs sm:group-data-hovered:shadow-none sm:dark:border-zinc-800">
        <IconBrandJustdBlocks className="-ml-0.5 mr-1 inline" />
        <strong className="mr-1 ml-1 font-semibold">Save 15% on all Justd Blocks</strong>
        <span className="hidden items-center sm:inline-flex">
          for a limited time during the launch!
          <IconArrowRight className="ml-2 text-muted-fg transition-transform duration-200 group-data-hovered:translate-x-1 group-data-hovered:text-fg" />
        </span>
      </div>
    </Link>
  )
}
