import { SidebarController } from "@/presentation/controllers/Sidebar.controller"
import { TransfersController } from "@/presentation/controllers/Transfers.controller"
import { HeaderController } from "@/presentation/controllers/Header.controller"

export const HomePage = () => {
  return (
    <SidebarController>
      <main
        className="relative z-10 flex min-h-0 w-full min-w-0 flex-1 flex-col items-center justify-center overflow-hidden p-6"
        aria-label="Área principal"
      >
        <section
          className="w-full max-w-4xl shrink-0"
          aria-label="Perfil e saldo"
        >
          <HeaderController />
        </section>

        <section
          className="flex min-h-0 w-full max-w-4xl min-w-0 flex-1 flex-col"
          aria-label="Extrato de transferências"
        >
          <TransfersController />
        </section>
      </main>
    </SidebarController>
  )
}
