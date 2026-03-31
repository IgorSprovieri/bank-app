import { useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/presentation/hooks/store/useAuthStore"
import { useUserStore } from "@/presentation/hooks/store/useUserStore"

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useUserStore((state) => state.user)
  const auth = useAuthStore((state) => state.token)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !auth) {
      navigate("/login", { replace: true })
    }
  }, [user, auth, navigate])

  if (!user || !auth) {
    return null
  }

  return children
}
