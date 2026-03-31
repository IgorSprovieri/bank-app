import { describe, it, expect, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CreateTransferFormView } from "./CreateTransferForm.view"

const noop = () => {}

const baseField = (name: string) => ({
  name,
  onBlur: noop as (e: React.FocusEvent<HTMLInputElement>) => void,
  onChange: noop as (e: React.ChangeEvent<HTMLInputElement>) => void,
})

describe("CreateTransferFormView", () => {
  it("should call onSubmit when the form is submitted", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <CreateTransferFormView
        onSubmit={onSubmit}
        agency={baseField("agency")}
        account={baseField("account")}
        beneficiaryName={baseField("beneficiaryName")}
        amount={{
          ...baseField("amount"),
          value: "",
        }}
      />
    )

    await user.click(screen.getByRole("button", { name: "Transferir" }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it("should disable inputs and show busy button state while pending", () => {
    render(
      <CreateTransferFormView
        onSubmit={vi.fn()}
        isPending
        agency={baseField("agency")}
        account={baseField("account")}
        beneficiaryName={baseField("beneficiaryName")}
        amount={{
          ...baseField("amount"),
          value: "",
        }}
      />
    )

    const form = screen.getByRole("form", {
      name: /nova transferência entre contas/i,
    })
    expect(within(form).getByLabelText("Agência")).toBeDisabled()
    expect(within(form).getByLabelText("Conta")).toBeDisabled()
    expect(within(form).getByLabelText("Nome do favorecido")).toBeDisabled()
    expect(within(form).getByLabelText("Valor")).toBeDisabled()
    expect(
      screen.getByRole("button", { name: "Enviando transferência" })
    ).toBeDisabled()
  })
})
