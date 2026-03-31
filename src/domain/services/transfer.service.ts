import { TransferEntity } from "../entities/TransferEntity"
import { TransferRepository } from "@/infra/repositories/transfers.repository"
import { UserBalanceService } from "./userBalance.service"
import { UserBalanceRepository } from "@/infra/repositories/userBalance.repository"

export interface ITransferRepository {
  getTransfers(): Promise<TransferEntity[]>
  createTransfer(dto: Omit<TransferEntity, "id">): Promise<TransferEntity>
}

export class TransferService {
  private readonly transferRepository: ITransferRepository
  private readonly userBalanceService: UserBalanceService

  constructor(
    transferRepository: ITransferRepository,
    userBalanceService: UserBalanceService
  ) {
    this.transferRepository = transferRepository
    this.userBalanceService = userBalanceService
  }

  getTransfers = async (): Promise<TransferEntity[]> => {
    const transfers = await this.transferRepository.getTransfers()
    return [...transfers].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  createTransfer = async (
    dto: Omit<TransferEntity, "id">
  ): Promise<TransferEntity> => {
    const userBalance = await this.userBalanceService.getUserBalance(dto.userId)

    if (userBalance.balance < dto.amount) {
      throw new Error("Insufficient balance to complete the transfer.")
    }

    return this.transferRepository.createTransfer(dto)
  }
}

export const transferService = new TransferService(
  new TransferRepository(),
  new UserBalanceService(new UserBalanceRepository())
)
