export class TransferEntity {
  readonly id: number
  readonly userId: number
  readonly name: string
  readonly date: string
  readonly amount: number
  readonly type: "Received" | "Sent"

  constructor(
    id: number,
    userId: number,
    name: string,
    date: string,
    amount: number,
    type: "Received" | "Sent"
  ) {
    this.id = id
    this.userId = userId
    this.name = name
    this.date = date
    this.amount = amount
    this.type = type
  }
}
