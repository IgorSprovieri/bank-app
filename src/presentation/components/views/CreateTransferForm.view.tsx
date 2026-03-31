import { InputLabelComponent } from "@/presentation/components/shared/InputLabel.component"
import { Button } from "@/presentation/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card"
import { Loader2Icon } from "lucide-react"
import type { FC, Ref } from "react"

type InputFieldProps = {
  name: string
  ref?: Ref<HTMLInputElement>
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string
}

type AmountFieldProps = InputFieldProps & {
  value: string
}

type CreateTransferFormViewProps = {
  agency: InputFieldProps
  account: InputFieldProps
  beneficiaryName: InputFieldProps
  amount: AmountFieldProps
  onSubmit: () => void
  isPending?: boolean
}

export const CreateTransferFormView: FC<CreateTransferFormViewProps> = ({
  agency,
  account,
  beneficiaryName,
  amount,
  onSubmit,
  isPending,
}) => (
  <Card className="flex h-full min-h-0 w-full flex-1 flex-col gap-0 border-none bg-white py-0 text-slate-800">
    <CardHeader className="flex shrink-0 items-center justify-between px-4 pt-3 lg:px-6 lg:pt-6">
      <CardTitle className="text-[22px] font-bold text-slate-800 lg:text-[32px]">
        Nova transferência
      </CardTitle>
    </CardHeader>

    <CardContent className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pt-2 pb-8 lg:px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="flex w-full flex-col gap-4"
        aria-label="Nova transferência entre contas"
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
          {...beneficiaryName}
          label="Nome do favorecido"
          placeholder="Nome completo"
          disabled={isPending}
        />
        <InputLabelComponent
          {...amount}
          inputMode="numeric"
          autoComplete="off"
          label="Valor"
          placeholder="R$ 0,00"
          disabled={isPending}
        />
        <Button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          aria-label={isPending ? "Enviando transferência" : undefined}
        >
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" aria-hidden />
          ) : (
            "Transferir"
          )}
        </Button>
      </form>
    </CardContent>
  </Card>
)
