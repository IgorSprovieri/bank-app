import type { FC } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import type { UserEntity } from "@/domain/entities/UserEntity"
import { formatCurrency } from "@/presentation/utils"

export type HeaderViewProps = {
  user: Omit<UserEntity, "password">
  balance: number
  footerRender?: () => React.ReactNode
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase()
  }
  const single = parts[0] ?? "?"
  return single.slice(0, 2).toUpperCase()
}

export const HeaderView: FC<HeaderViewProps> = ({
  user,
  balance,
  footerRender,
}) => {
  return (
    <header className="flex w-full flex-col justify-between gap-8 pt-0 pb-8 lg:py-16 xl:py-32">
      <div className="flex w-full items-center justify-between">
        <Avatar
          className="size-10 md:size-14"
          aria-label={`Avatar de ${user.name}`}
        >
          {user?.avatarUrl && (
            <AvatarImage src={user?.avatarUrl} alt="" aria-hidden />
          )}
          {!user?.avatarUrl && (
            <AvatarFallback className="size-10 text-xl md:size-14">
              {initialsFromName(user.name)}
            </AvatarFallback>
          )}
        </Avatar>

        <p className="text-[16px] font-light md:text-[22px]">{user?.name}</p>

        <div className="w-10 md:w-14"></div>
      </div>

      <div role="group" aria-labelledby="header-balance-label">
        <p
          id="header-balance-label"
          className="text-[14px] font-light text-white/70 md:text-[18px]"
        >
          Saldo Atual
        </p>
        <p className="mt-0.5 border-white/70 text-[24px] leading-none font-medium md:text-[36px]">
          {formatCurrency(balance)}
        </p>
      </div>

      {footerRender?.()}
    </header>
  )
}
