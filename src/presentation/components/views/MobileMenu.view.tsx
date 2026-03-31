import type { FC } from "react"
import { Button } from "../ui/button"

export type MobileMenuViewProps = {
  items: {
    icon: React.ReactNode
    /** Nome acessível — botões usam apenas ícones. */
    ariaLabel: string
    onClick: () => void
  }[]
}

export const MobileMenuView: FC<MobileMenuViewProps> = ({ items }) => {
  return (
    <div className="flex items-center justify-around">
      {items.map((item, index) => (
        <Button
          key={index}
          type="button"
          variant="ghost"
          size="icon-lg"
          className="text-primary md:size-12! md:[&>svg]:size-6!"
          onClick={item.onClick}
          aria-label={item.ariaLabel}
        >
          {item.icon}
        </Button>
      ))}
    </div>
  )
}
