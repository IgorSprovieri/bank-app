export class UserEntity {
  id: number
  name: string
  email: string
  agency: string
  account: string
  password: string
  avatarUrl: string

  constructor(
    id: number,
    name: string,
    email: string,
    agency: string,
    account: string,
    password: string,
    avatarUrl: string
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.agency = agency
    this.account = account
    this.password = password
    this.avatarUrl = avatarUrl
  }
}
