import axios from "axios"
import type { UserEntity } from "@/domain/entities/UserEntity"
import type { IUserRepository } from "@/domain/services/auth.service"

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000"

export class UserRepository implements IUserRepository {
  async getUserByAgencyAndAccount(
    agency: string,
    account: string
  ): Promise<UserEntity> {
    const { data } = await axios.get<UserEntity[]>(`${API_BASE}/users`)
    const list = Array.isArray(data) ? data : [data]

    const user = list.find((u) => u.agency === agency && u.account === account)

    if (!user) {
      throw new Error("User not found")
    }
    return user
  }
}
