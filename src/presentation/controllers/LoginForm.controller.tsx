import { useMutation } from "@tanstack/react-query"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import { LoginFormView } from "../components/views/LoginForm.view"
import { authService } from "@/domain/services/auth.service"
import { useAuthStore } from "@/presentation/hooks/store/useAuthStore"
import { useUserStore } from "@/presentation/hooks/store/useUserStore"

const schema = z.object({
  agency: z.string().length(4, "Agência deve ter 4 dígitos"),
  account: z.string().length(5, "Conta deve ter 5 dígitos"),
  password: z.string().length(6, "Senha deve ter 6 dígitos"),
})

type FormData = z.infer<typeof schema>

export const LoginFormController = () => {
  const navigate = useNavigate()
  const { setToken } = useAuthStore()
  const { setUser } = useUserStore()

  const {
    register,
    setFocus,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const { mutate: login, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: ({ data }) => {
      toast.success("Login realizado com sucesso")
      setToken(data.token)
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        agency: data.user.agency,
        account: data.user.account,
        avatarUrl: data.user.avatarUrl,
      })
      navigate("/")
    },
    onError: (error) => toast.error(error.message),
  })

  const agency = useWatch({ control, name: "agency" })
  const account = useWatch({ control, name: "account" })
  const password = useWatch({ control, name: "password" })

  useEffect(() => {
    if (agency?.length === 4) setFocus("account")
  }, [agency, setFocus])

  useEffect(() => {
    if (account?.length === 5) setFocus("password")
  }, [account, setFocus])

  useEffect(() => {
    if (
      agency?.length === 4 &&
      account?.length === 5 &&
      password?.length === 6
    ) {
      handleSubmit((data) => login(data))()
      setFocus("agency")
    }
  }, [agency, account, password, handleSubmit, login, reset, setFocus])

  return (
    <LoginFormView
      onSubmit={handleSubmit((data) => login(data))}
      isPending={isPending}
      agency={{
        ...register("agency"),
        errorMessage: errors.agency?.message,
      }}
      account={{
        ...register("account"),
        errorMessage: errors.account?.message,
      }}
      password={{
        ...register("password"),
        errorMessage: errors.password?.message,
      }}
    />
  )
}
