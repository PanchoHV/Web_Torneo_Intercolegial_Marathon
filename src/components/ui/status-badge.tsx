/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center justify-center w-fit whitespace-nowrap border px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] leading-none",
  {
    variants: {
      variant: {
        neutral:
          "border-marathon-border-subtle bg-marathon-surface-paper text-marathon-text-primary",
        live:
          "border-transparent bg-marathon-action-primary text-white",
        success:
          "border-transparent bg-marathon-green text-white",
        closed:
          "border-transparent bg-marathon-navy text-white",
        upcoming:
          "border-marathon-border-subtle bg-marathon-surface-paper-muted text-marathon-text-accent",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

function StatusBadge({
  className,
  variant = "neutral",
  ...props
}: React.ComponentPropsWithoutRef<"span"> & VariantProps<typeof statusBadgeVariants>) {
  return (
    <span
      data-slot="status-badge"
      data-variant={variant}
      className={cn(statusBadgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { StatusBadge, statusBadgeVariants }
