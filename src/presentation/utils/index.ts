import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

/** Máscara de valor ao digitar (estilo app bancário: apenas dígitos, vírgula como decimal). */
export function formatMoneyInputMask(raw: string): string {
  const digits = raw.replace(/\D/g, "")
  if (!digits) return ""
  const value = Number.parseInt(digits, 10) / 100
  return brlFormatter.format(value)
}

export function parseMoneyMaskToNumber(raw: string): number {
  const digits = raw.replace(/\D/g, "")
  if (!digits) return Number.NaN
  return Number.parseInt(digits, 10) / 100
}
