import { UserBalanceRepository } from "@/infra/repositories/userBalance.repository"

export interface IUserBalanceRepository {
  getUserBalance(userId: number): Promise<{ balance: number }>
}

export class UserBalanceService {
  private readonly userBalanceRepository: IUserBalanceRepository

  constructor(userBalanceRepository: IUserBalanceRepository) {
    this.userBalanceRepository = userBalanceRepository
  }

  getUserBalance = async (userId: number): Promise<{ balance: number }> => {
    return this.userBalanceRepository.getUserBalance(userId)
  }
}

export const userBalanceService = new UserBalanceService(
  new UserBalanceRepository()
)
