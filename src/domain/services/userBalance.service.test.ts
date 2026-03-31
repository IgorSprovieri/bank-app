import { describe, it, expect, vi } from "vitest"
import { UserBalanceService } from "./userBalance.service"
import type { IUserBalanceRepository } from "./userBalance.service"

describe("UserBalanceService", () => {
  it("should delegate to repository and return user balance", async () => {
    const repo: IUserBalanceRepository = {
      getUserBalance: vi.fn().mockResolvedValue({ balance: 1_234.56 }),
    }
    const service = new UserBalanceService(repo)

    const result = await service.getUserBalance(42)

    expect(repo.getUserBalance).toHaveBeenCalledWith(42)
    expect(result.balance).toBe(1_234.56)
  })
})
