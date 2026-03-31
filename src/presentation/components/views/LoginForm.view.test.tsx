import { describe, it, expect, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { LoginFormView } from "./LoginForm.view"

const noop = () => {}

const baseField = (name: string) => ({
  name,
  onBlur: noop as (e: React.FocusEvent<HTMLInputElement>) => void,
  onChange: noop as (e: React.ChangeEvent<HTMLInputElement>) => void,
})

describe("LoginFormView", () => {
  it("should call onSubmit when the form is submitted", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <LoginFormView
        onSubmit={onSubmit}
        agency={baseField("agency")}
        account={baseField("account")}
        password={baseField("password")}
      />
    )

    await user.click(screen.getByRole("button", { name: "Entrar" }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it("should disable fields and show busy state while pending", () => {
    render(
      <LoginFormView
        onSubmit={vi.fn()}
        isPending
        agency={baseField("agency")}
        account={baseField("account")}
        password={baseField("password")}
      />
    )

    const form = screen.getByRole("form", {
      name: /login com agência/i,
    })
    expect(within(form).getByLabelText("Agência")).toBeDisabled()
    expect(within(form).getByLabelText("Conta")).toBeDisabled()
    expect(within(form).getByLabelText("Senha")).toBeDisabled()
    expect(
      screen.getByRole("button", { name: "Entrando, aguarde" })
    ).toBeDisabled()
    expect(
      screen.getByRole("button", { name: "Entrando, aguarde" })
    ).toHaveAttribute("aria-busy", "true")
  })
})
