import axios from "axios"

import { TransferEntity } from "@/domain/entities/TransferEntity"
import type { ITransferRepository } from "@/domain/services/transfer.service"

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000"

export class TransferRepository implements ITransferRepository {
  async getTransfers() {
    const { data } = await axios.get<TransferEntity[]>(`${API_BASE}/transfers`)
    return data
  }

  async createTransfer(dto: Omit<TransferEntity, "id">) {
    const { data } = await axios.post<TransferEntity>(
      `${API_BASE}/transfers`,
      dto
    )
    return data
  }
}
