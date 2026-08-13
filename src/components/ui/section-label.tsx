/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sectionLabelVariants = cva(
  "font-montserrat text-[0.72rem] font-extrabold uppercase tracking-[0.18em] leading-none",
  {
    variants: {
      tone: {
        red: "text-marathon-action-primary",
        blue: "text-marathon-text-accent",
        gold: "text-marathon-gold",
        onDark: "text-marathon-text-on-dark",
      },
    },
    defaultVariants: {
      tone: "red",
    },
  }
)

function SectionLabel({
  className,
  tone = "red",
  ...props
}: React.ComponentPropsWithoutRef<"span"> & VariantProps<typeof sectionLabelVariants>) {
  return (
    <span
      data-slot="section-label"
      data-tone={tone}
      className={cn(sectionLabelVariants({ tone }), className)}
      {...props}
    />
  )
}

export { SectionLabel, sectionLabelVariants }
