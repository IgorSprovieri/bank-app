import { userBalanceService } from "@/domain/services/userBalance.service"
import { HeaderView } from "../components/views/Header.view"
import { useUserStore } from "../hooks/store/useUserStore"
import { useQuery } from "@tanstack/react-query"
import {
  Barcode,
  CreditCard,
  LogOutIcon,
  PlusCircle,
  ScrollText,
  Wallet,
} from "lucide-react"
import { MobileMenuView } from "../components/views/MobileMenu.view"
import { useAuthStore } from "../hooks/store/useAuthStore"
import { useNavigate } from "react-router-dom"
import { useIsMobile } from "../hooks/use-mobile"

export const HeaderController = () => {
  const user = useUserStore((state) => state.user)
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const { data: balance } = useQuery({
    queryKey: ["user-balance", user?.id],
    queryFn: () => userBalanceService.getUserBalance(user?.id ?? 1),
  })

  return (
    <HeaderView
      user={user!}
      balance={balance?.balance ?? 0}
      footerRender={
        isMobile
          ? () => (
              <MobileMenuView
                items={[
                  {
                    icon: <ScrollText />,
                    ariaLabel: "Extrato",
                    onClick: () => navigate("/"),
                  },
                  {
                    icon: <CreditCard />,
                    ariaLabel: "Cartões",
                    onClick: () => {},
                  },
                  {
                    icon: <Barcode />,
                    ariaLabel: "Contas a pagar",
                    onClick: () => {},
                  },
                  {
                    icon: <Wallet />,
                    ariaLabel: "Investimentos",
                    onClick: () => {},
                  },
                  {
                    icon: <PlusCircle />,
                    ariaLabel: "Nova transferência",
                    onClick: () => navigate("/criar-transferencia"),
                  },
                  {
                    icon: <LogOutIcon />,
                    ariaLabel: "Sair da conta",
                    onClick: () => logout(),
                  },
                ]}
              />
            )
          : undefined
      }
    />
  )
}
