import { SidebarController } from "@/presentation/controllers/Sidebar.controller"
import { HeaderController } from "@/presentation/controllers/Header.controller"
import { CreateTransferFormController } from "@/presentation/controllers/CreateTransferForm.controller"

export const CreateTransferPage = () => {
  return (
    <SidebarController>
      <main
        className="relative z-10 flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden p-6"
        aria-label="Nova transferência"
      >
        <section className="w-full shrink-0" aria-label="Perfil e saldo">
          <HeaderController />
        </section>

        <section
          className="flex min-h-0 w-full min-w-0 flex-1 flex-col"
          aria-label="Formulário de transferência"
        >
          <CreateTransferFormController />
        </section>
      </main>
    </SidebarController>
  )
}
