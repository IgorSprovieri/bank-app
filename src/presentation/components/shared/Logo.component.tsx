import { Landmark } from "lucide-react"
import type { FC } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/presentation/utils"

const logoVariants = cva("flex items-center gap-2", {
  variants: {
    sizeVariant: {
      small: "[&_h1]:text-[16px] [&_svg]:size-4",
      medium: "[&_h1]:text-[24px] [&_svg]:size-6",
      large: "[&_h1]:text-[32px] [&_svg]:size-8",
    },
  },
  defaultVariants: {
    sizeVariant: "small",
  },
})

type DefaultLogoComponentProps = VariantProps<typeof logoVariants>

export const DefaultLogoComponent: FC<DefaultLogoComponentProps> = ({
  sizeVariant = "small",
}) => {
  return (
    <div className={cn(logoVariants({ sizeVariant }))}>
      <Landmark className="mb-1" aria-hidden />
      <h1>Bank App</h1>
    </div>
  )
}

export type CollapsibleLogoComponentProps = {
  isOpen?: boolean
}

export const CollapsibleLogo: FC<CollapsibleLogoComponentProps> = ({
  isOpen,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Landmark size={16} aria-hidden /> {isOpen ? <h1>Bank App</h1> : ""}
    </div>
  )
}
