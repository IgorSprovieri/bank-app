import type { TransferEntity } from "@/domain/entities/TransferEntity"
import type { IUserBalanceRepository } from "@/domain/services/userBalance.service"
import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000"

export class UserBalanceRepository implements IUserBalanceRepository {
  async getUserBalance(userId: number): Promise<{ balance: number }> {
    const { data } = await axios.get<TransferEntity[]>(`${API_BASE}/transfers`)
    const transfers = Array.isArray(data) ? data : [data]

    return {
      balance: transfers
        .filter((transfer) => transfer.userId == userId)
        .reduce((acc, transfer) => {
          return transfer.type === "Received"
            ? acc + transfer.amount
            : acc - transfer.amount
        }, 0),
    }
  }
}
