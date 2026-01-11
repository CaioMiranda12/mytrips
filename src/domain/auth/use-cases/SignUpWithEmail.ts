import { AuthRepository } from "../interfaces/AuthRepository"
import { AuthUser } from "../entities/AuthUser"

export class SignUpWithEmail {
  constructor(private repo: AuthRepository) { }

  async execute(
    email: string,
    password: string,
    name: string
  ): Promise<AuthUser> {
    return this.repo.signUpWithEmail(email, password, name)
  }
}
