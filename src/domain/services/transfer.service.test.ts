import { describe, it, expect, vi } from "vitest"
import { TransferService } from "./transfer.service"
import type { ITransferRepository } from "./transfer.service"
import type { UserBalanceService } from "./userBalance.service"
import type { TransferEntity } from "../entities/TransferEntity"

const transfer = (t: Omit<TransferEntity, never>): TransferEntity => t

describe("TransferService", () => {
  describe("getTransfers", () => {
    it("should sort transfers from newest to oldest", async () => {
      const transfers: TransferEntity[] = [
        transfer({
          id: 1,
          userId: 1,
          name: "A",
          date: "2026-03-10T10:00:00.000Z",
          amount: 10,
          type: "Received",
        }),
        transfer({
          id: 2,
          userId: 1,
          name: "B",
          date: "2026-03-20T10:00:00.000Z",
          amount: 20,
          type: "Sent",
        }),
        transfer({
          id: 3,
          userId: 1,
          name: "C",
          date: "2026-03-15T10:00:00.000Z",
          amount: 15,
          type: "Received",
        }),
      ]

      const transferRepository: ITransferRepository = {
        getTransfers: vi.fn().mockResolvedValue(transfers),
        createTransfer: vi.fn(),
      }
      const userBalanceService = {
        getUserBalance: vi.fn(),
      } as unknown as UserBalanceService

      const service = new TransferService(
        transferRepository,
        userBalanceService
      )
      const result = await service.getTransfers()

      expect(result.map((r) => r.id)).toEqual([2, 3, 1])
    })
  })

  describe("createTransfer", () => {
    const dto = {
      userId: 1,
      name: "Favorecido",
      date: "2026-03-31T12:00:00.000Z",
      amount: 50,
      type: "Sent" as const,
    }

    const created: TransferEntity = transfer({
      id: 99,
      ...dto,
    })

    it("should create transfer when balance is sufficient", async () => {
      const transferRepository: ITransferRepository = {
        getTransfers: vi.fn(),
        createTransfer: vi.fn().mockResolvedValue(created),
      }
      const userBalanceService = {
        getUserBalance: vi.fn().mockResolvedValue({ balance: 100 }),
      } as unknown as UserBalanceService

      const service = new TransferService(
        transferRepository,
        userBalanceService
      )
      const result = await service.createTransfer(dto)

      expect(userBalanceService.getUserBalance).toHaveBeenCalledWith(1)
      expect(transferRepository.createTransfer).toHaveBeenCalledWith(dto)
      expect(result).toEqual(created)
    })

    it("should throw when balance is insufficient", async () => {
      const transferRepository: ITransferRepository = {
        getTransfers: vi.fn(),
        createTransfer: vi.fn(),
      }
      const userBalanceService = {
        getUserBalance: vi.fn().mockResolvedValue({ balance: 10 }),
      } as unknown as UserBalanceService

      const service = new TransferService(
        transferRepository,
        userBalanceService
      )

      await expect(service.createTransfer(dto)).rejects.toThrow(
        "Insufficient balance to complete the transfer."
      )
      expect(transferRepository.createTransfer).not.toHaveBeenCalled()
    })
  })
})
