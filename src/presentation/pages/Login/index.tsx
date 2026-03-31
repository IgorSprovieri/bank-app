import { DefaultLogoComponent } from "@/presentation/components/shared/Logo.component"
import { LoginFormController } from "@/presentation/controllers/LoginForm.controller"

export const LoginPage = () => {
  return (
    <div>
      <main
        className="relative z-10 flex h-screen w-full flex-col items-center justify-start gap-16 pt-32 lg:pt-64"
        aria-label="Página de login"
      >
        <DefaultLogoComponent sizeVariant="medium" />

        <LoginFormController />
      </main>
    </div>
  )
}
