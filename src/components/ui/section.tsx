/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sectionVariants = cva("relative min-w-0", {
  variants: {
    spacing: {
      default: "py-section-gap",
      compact: "py-[calc(var(--section-gap)*0.66)]",
      spacious: "py-section-gap-lg",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
})

function Section({
  className,
  spacing = "default",
  ...props
}: React.ComponentPropsWithoutRef<"section"> &
  VariantProps<typeof sectionVariants>) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ spacing }), className)}
      {...props}
    />
  )
}

export { Section, sectionVariants }
