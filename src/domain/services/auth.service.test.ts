import { describe, it, expect, vi } from "vitest"
import { AuthService } from "./auth.service"
import type { IUserRepository } from "./auth.service"
import type { UserEntity } from "../entities/UserEntity"

const baseUser: UserEntity = {
  id: 1,
  name: "Maria",
  email: "maria@test.com",
  agency: "0001",
  account: "12345",
  password: "123456",
  avatarUrl: "",
} as UserEntity

describe("AuthService", () => {
  it("should return token and user without password when agency, account and password are valid", async () => {
    const repo: IUserRepository = {
      getUserByAgencyAndAccount: vi.fn().mockResolvedValue({ ...baseUser }),
    }
    const service = new AuthService(repo)

    const result = await service.login({
      agency: "0001",
      account: "12345",
      password: "123456",
    })

    expect(result.data.token).toBe("awesome-token")
    expect(result.data.user).toEqual({
      id: 1,
      name: "Maria",
      email: "maria@test.com",
      agency: "0001",
      account: "12345",
      avatarUrl: "",
    })
    expect("password" in result.data.user).toBe(false)
  })

  it("should reject when password does not match", async () => {
    const repo: IUserRepository = {
      getUserByAgencyAndAccount: vi.fn().mockResolvedValue({ ...baseUser }),
    }
    const service = new AuthService(repo)

    await expect(
      service.login({
        agency: "0001",
        account: "12345",
        password: "000000",
      })
    ).rejects.toThrow("Agency, account or password is invalid")
  })

  it("should reject when repository returns no user (null)", async () => {
    const repo: IUserRepository = {
      getUserByAgencyAndAccount: vi.fn().mockResolvedValue(null),
    }
    const service = new AuthService(repo)

    await expect(
      service.login({
        agency: "0001",
        account: "99999",
        password: "123456",
      })
    ).rejects.toThrow("Agency, account or password is invalid")
  })
})
