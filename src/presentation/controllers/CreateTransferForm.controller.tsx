import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useController, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { CreateTransferFormView } from "../components/views/CreateTransferForm.view"
import { transferService } from "@/domain/services/transfer.service"
import { useUserStore } from "@/presentation/hooks/store/useUserStore"
import {
  formatMoneyInputMask,
  parseMoneyMaskToNumber,
} from "@/presentation/utils"
import { useNavigate } from "react-router-dom"

const parseAmount = parseMoneyMaskToNumber

const schema = z.object({
  agency: z.string().length(4, "Agência deve ter 4 dígitos"),
  account: z.string().length(5, "Conta deve ter 5 dígitos"),
  beneficiaryName: z
    .string()
    .min(2, "Informe o nome do favorecido")
    .max(120, "Nome muito longo"),
  amount: z
    .string()
    .min(1, "Informe um valor")
    .refine((v) => !Number.isNaN(parseAmount(v)), "Informe um valor válido")
    .refine((v) => parseAmount(v) > 0, "O valor deve ser maior que zero"),
})

type FormData = z.infer<typeof schema>

export const CreateTransferFormController = () => {
  const queryClient = useQueryClient()
  const user = useUserStore((state) => state.user)
  const navigate = useNavigate()
  const {
    register,
    setFocus,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { amount: "" },
  })

  const { mutate: createTransfer, isPending } = useMutation({
    mutationFn: transferService.createTransfer,
    onSuccess: () => {
      toast.success("Transferência enviada com sucesso")
      queryClient.invalidateQueries({ queryKey: ["transfers"] })
      queryClient.invalidateQueries({ queryKey: ["user-balance", user?.id] })
      navigate("/")
    },
    onError: () =>
      toast.error("Saldo insuficiente para realizar a transferência"),
  })

  const agency = useWatch({ control, name: "agency" })
  const account = useWatch({ control, name: "account" })

  useEffect(() => {
    if (agency?.length === 4) setFocus("account")
  }, [agency, setFocus])

  useEffect(() => {
    if (account?.length === 5) setFocus("beneficiaryName")
  }, [account, setFocus])

  const { field: amountField } = useController({
    name: "amount",
    control,
  })

  return (
    <CreateTransferFormView
      onSubmit={handleSubmit((data) =>
        createTransfer({
          userId: user?.id ?? 1,
          name: data.beneficiaryName,
          date: new Date().toISOString(),
          amount: parseAmount(data.amount),
          type: "Sent",
        })
      )}
      isPending={isPending}
      agency={{
        ...register("agency"),
        errorMessage: errors.agency?.message,
      }}
      account={{
        ...register("account"),
        errorMessage: errors.account?.message,
      }}
      beneficiaryName={{
        ...register("beneficiaryName"),
        errorMessage: errors.beneficiaryName?.message,
      }}
      amount={{
        name: amountField.name,
        ref: amountField.ref,
        value: amountField.value,
        onChange: (e) =>
          amountField.onChange(formatMoneyInputMask(e.target.value)),
        onBlur: amountField.onBlur,
        errorMessage: errors.amount?.message,
      }}
    />
  )
}
