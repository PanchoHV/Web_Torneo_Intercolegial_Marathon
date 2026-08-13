/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const surfaceVariants = cva("min-w-0 border", {
  variants: {
    variant: {
      paper:
        "border-marathon-border-subtle bg-marathon-surface-paper text-marathon-text-primary",
      stadium:
        "border-white/10 bg-marathon-surface-stadium text-marathon-text-on-dark",
      scoreboard:
        "border-marathon-border-strong/40 bg-marathon-surface-scoreboard text-marathon-text-on-dark",
      transparent:
        "border-transparent bg-transparent text-marathon-text-primary",
    },
  },
  defaultVariants: {
    variant: "paper",
  },
})

function Surface({
  className,
  variant = "paper",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof surfaceVariants>) {
  return (
    <div
      data-slot="surface"
      data-variant={variant}
      className={cn(surfaceVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Surface, surfaceVariants }
