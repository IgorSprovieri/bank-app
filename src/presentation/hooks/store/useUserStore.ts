import type { UserEntity } from "@/domain/entities/UserEntity"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type UserState = {
  user: Omit<UserEntity, "password"> | null
  setUser: (user: Omit<UserEntity, "password">) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
)
