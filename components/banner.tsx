"use client"
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
      className="block w-full bg-primary px-4 py-2 text-center text-primary-fg sm:text-sm/6"
    >
      🎉<strong className="ml-1 font-medium">Save 15% on all Justd Blocks</strong> for a limited
      time during the launch!
    </Link>
  )
}
