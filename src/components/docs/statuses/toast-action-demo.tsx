"use client"

import { toast } from "sonner"
import { Button } from "ui"

export default function ToastActionDemo() {
  return (
    <div className="flex gap-3">
      <Button
        appearance="outline"
        size="small"
        onPress={() =>
          toast("New comment on your post!", {
            action: {
              label: "View",
              onClick: () => alert("Viewed"),
            },
          })
        }
      >
        Action
      </Button>
      <Button
        appearance="outline"
        size="small"
        onPress={() =>
          toast("New comment on your post!", {
            action: {
              label: "View",
              onClick: () => alert("Viewed"),
            },
            cancel: {
              label: "Cancel",
              onClick: () => alert("Cancelled"),
            },
          })
        }
      >
        Do or Not
      </Button>
      <Button
        appearance="outline"
        size="small"
        onPress={() =>
          toast("New comment on your post!", {
            cancel: {
              label: "Cancel",
              onClick: () => alert("Cancelled"),
            },
          })
        }
      >
        Cancel
      </Button>
    </div>
  )
}
