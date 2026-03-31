import { SidebarView } from "@/presentation/components/views/Sidebar.view"
import { useAuthStore } from "../hooks/store/useAuthStore"

import {
  Barcode,
  CreditCard,
  LogOutIcon,
  PlusCircle,
  ScrollText,
  Wallet,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export const SidebarController = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  return (
    <SidebarView
      contentItems={[
        {
          icon: <ScrollText />,
          label: "Extrato",
          onClick: () => navigate("/"),
        },
        {
          icon: <CreditCard />,
          label: "Cartões",
          onClick: () => {},
        },
        {
          icon: <Barcode />,
          label: "Contas a Pagar",
          onClick: () => {},
        },
        {
          icon: <Wallet />,
          label: "Investimentos",
          onClick: () => {},
        },
        {
          icon: <PlusCircle />,
          label: "Nova Transferência",
          onClick: () => navigate("/criar-transferencia"),
        },
      ]}
      footerItems={[
        {
          icon: <LogOutIcon />,
          label: "Logout",
          onClick: () => logout(),
        },
      ]}
    >
      {children}
    </SidebarView>
  )
}
