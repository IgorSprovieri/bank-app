import { describe, it, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import { TransfersView } from "./Transfers.view"
import type { TransferEntity } from "@/domain/entities/TransferEntity"

const transfer = (partial: {
  id: number
  name: string
  amount: number
  type: "Received" | "Sent"
  date: string
}): TransferEntity =>
  ({
    userId: 1,
    ...partial,
  }) as TransferEntity

describe("TransfersView", () => {
  it("should render statement title, period badge and list transfers", () => {
    const transfers: TransferEntity[] = [
      transfer({
        id: 1,
        name: "Alice",
        amount: 100,
        type: "Received",
        date: "2026-03-31T12:00:00.000Z",
      }),
      transfer({
        id: 2,
        name: "Bob Store",
        amount: 50.5,
        type: "Sent",
        date: "2026-03-30T12:00:00.000Z",
      }),
    ]

    render(<TransfersView transfers={transfers} />)

    expect(screen.getByText("Extrato")).toBeInTheDocument()
    expect(screen.getByText("Últimos 30 Dias")).toBeInTheDocument()

    const list = screen.getByRole("list", { name: /extrato/i })
    expect(within(list).getAllByRole("listitem")).toHaveLength(2)
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText("Bob Store")).toBeInTheDocument()
  })

  it("should render an empty list when there are no transfers", () => {
    render(<TransfersView transfers={[]} />)

    const list = screen.getByRole("list", { name: /extrato/i })
    expect(within(list).queryAllByRole("listitem")).toHaveLength(0)
  })
})
