import { UserRepository } from "@/infra/repositories/user.repository"
import type { UserEntity } from "../entities/UserEntity"

export interface IUserRepository {
  getUserByAgencyAndAccount(
    agency: string,
    account: string
  ): Promise<UserEntity>
}

export class AuthService {
  private readonly userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  login = async (
    dto: Pick<UserEntity, "agency" | "account" | "password">
  ): Promise<{
    data: {
      token: string
      user: Omit<UserEntity, "password">
    }
  }> => {
    const user = await this.userRepository.getUserByAgencyAndAccount(
      dto.agency,
      dto.account
    )

    if (!user) {
      throw new Error("Agency, account or password is invalid")
    }

    if (String(user.password) !== String(dto.password)) {
      throw new Error("Agency, account or password is invalid")
    }

    const { password, ...userWithoutPassword } = user

    void password

    return {
      data: {
        token: "awesome-token",
        user: userWithoutPassword,
      },
    }
  }
}

export const authService = new AuthService(new UserRepository())
