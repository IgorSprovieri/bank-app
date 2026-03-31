import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeaderView } from "./Header.view"
import { formatCurrency } from "@/presentation/utils"
import type { UserEntity } from "@/domain/entities/UserEntity"
import { textMatchesFormattedMoney } from "@/test/matchers"

const user: Omit<UserEntity, "password"> = {
  id: 1,
  name: "Igor Sprovieri",
  email: "igor@example.com",
  agency: "0001",
  account: "12345",
  avatarUrl: "",
} as Omit<UserEntity, "password">

describe("HeaderView", () => {
  it("should display user name and formatted balance", () => {
    const balance = 1234.56

    render(<HeaderView user={user} balance={balance} />)

    expect(screen.getByText("Igor Sprovieri")).toBeInTheDocument()
    expect(screen.getByText("Saldo Atual")).toBeInTheDocument()
    expect(
      screen.getByText(textMatchesFormattedMoney(formatCurrency(balance)))
    ).toBeInTheDocument()
  })

  it("should expose balance region with accessible label", () => {
    render(<HeaderView user={user} balance={0} />)

    expect(
      screen.getByRole("group", { name: "Saldo Atual" })
    ).toBeInTheDocument()
  })

  it("should render footer slot when provided", () => {
    render(
      <HeaderView
        user={user}
        balance={100}
        footerRender={() => <footer data-testid="mobile-footer">Menu</footer>}
      />
    )

    expect(screen.getByTestId("mobile-footer")).toHaveTextContent("Menu")
  })
})
