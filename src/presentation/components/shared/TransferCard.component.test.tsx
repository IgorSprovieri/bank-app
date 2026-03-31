import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TransferCardComponent } from "./TransferCard.component"
import { formatCurrency } from "@/presentation/utils"
import type { TransferEntity } from "@/domain/entities/TransferEntity"
import { textMatchesFormattedMoney } from "@/test/matchers"

const buildTransfer = (
  partial: Pick<TransferEntity, "id" | "name" | "amount" | "type" | "date">
): TransferEntity =>
  ({
    userId: 1,
    ...partial,
  }) as TransferEntity

describe("TransferCardComponent", () => {
  it("should render received transfer with name and amount", () => {
    const transfer = buildTransfer({
      id: 1,
      name: "Payroll",
      amount: 2500,
      type: "Received",
      date: "2026-03-15T10:00:00.000Z",
    })

    render(<TransferCardComponent transfer={transfer} />)

    expect(screen.getByText("Payroll")).toBeInTheDocument()
    expect(
      screen.getByText(textMatchesFormattedMoney(formatCurrency(2500)))
    ).toBeInTheDocument()
    expect(screen.getByText("Recebido")).toBeInTheDocument()
  })

  it("should render sent transfer label", () => {
    const transfer = buildTransfer({
      id: 2,
      name: "Groceries",
      amount: 88.9,
      type: "Sent",
      date: "2026-03-14T10:00:00.000Z",
    })

    render(<TransferCardComponent transfer={transfer} />)

    expect(screen.getByText("Enviado")).toBeInTheDocument()
  })
})
