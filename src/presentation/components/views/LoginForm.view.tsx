import { InputLabelComponent } from "@/presentation/components/shared/InputLabel.component"
import { Button } from "@/presentation/components/ui/button"
import type { FC, Ref } from "react"
import { Loader2Icon } from "lucide-react"

type InputFieldProps = {
  name: string
  ref?: Ref<HTMLInputElement>
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string
}

type LoginFormViewProps = {
  agency: InputFieldProps
  account: InputFieldProps
  password: InputFieldProps
  onSubmit: () => void
  isPending?: boolean
}

export const LoginFormView: FC<LoginFormViewProps> = ({
  agency,
  account,
  password,
  onSubmit,
  isPending,
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault()
      onSubmit()
    }}
    className="flex w-[300px] flex-col gap-4"
    aria-label="Login com agência, conta e senha"
  >
    <div className="flex gap-2">
      <InputLabelComponent
        {...agency}
        maxLength={4}
        label="Agência"
        placeholder="xxxx"
        disabled={isPending}
      />
      <InputLabelComponent
        {...account}
        maxLength={5}
        label="Conta"
        placeholder="xxxxx"
        disabled={isPending}
      />
    </div>
    <InputLabelComponent
      {...password}
      type="password"
      maxLength={6}
      label="Senha"
      placeholder="******"
      disabled={isPending}
    />
    <Button
      type="submit"
      disabled={isPending}
      aria-busy={isPending}
      aria-label={isPending ? "Entrando, aguarde" : undefined}
    >
      {isPending ? (
        <Loader2Icon className="size-4 animate-spin" aria-hidden />
      ) : (
        "Entrar"
      )}
    </Button>
  </form>
)
