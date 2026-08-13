import * as React from "react"

import { cn } from "@/lib/utils"

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn("mx-auto w-full max-w-main min-w-0 px-gutter", className)}
      {...props}
    />
  )
}

export { Container }
