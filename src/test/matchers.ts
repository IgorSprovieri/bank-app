/** Normalizes Intl narrow-no-break space so getByText matches the DOM. */
export function normalizeMoneyText(value: string): string {
  return value.replace(/\u00a0/g, " ").trim()
}

export function textMatchesFormattedMoney(formatted: string) {
  const want = normalizeMoneyText(formatted)
  return (content: string) => normalizeMoneyText(content) === want
}
