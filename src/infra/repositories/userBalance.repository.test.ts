import { describe, it, expect, vi, beforeEach } from "vitest"
import axios from "axios"
import { UserBalanceRepository } from "./userBalance.repository"

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}))

const mockedAxiosGet = vi.mocked(axios.get)

describe("UserBalanceRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should sum received and subtract sent amounts only for the requested userId", async () => {
    mockedAxiosGet.mockResolvedValue({
      data: [
        { userId: 1, amount: 350, type: "Received" },
        { userId: 1, amount: 100, type: "Sent" },
        { userId: 2, amount: 9_999, type: "Received" },
        { userId: 1, amount: 50, type: "Received" },
      ],
    })

    const repo = new UserBalanceRepository()
    const { balance } = await repo.getUserBalance(1)

    expect(balance).toBe(350 - 100 + 50)
    expect(mockedAxiosGet).toHaveBeenCalledTimes(1)
  })

  it("should return zero when user has no transfers", async () => {
    mockedAxiosGet.mockResolvedValue({
      data: [{ userId: 99, amount: 500, type: "Received" }],
    })

    const repo = new UserBalanceRepository()
    const { balance } = await repo.getUserBalance(1)

    expect(balance).toBe(0)
  })
})
