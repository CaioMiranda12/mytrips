import { AuthRepository } from "../interfaces/AuthRepository"
import { AuthUser } from "../entities/AuthUser"
export class SignInWithEmail {
  constructor(private repo: AuthRepository) { }

  async execute(
    email: string,
    password: string
  ): Promise<AuthUser> {
    return this.repo.signInWithEmail(email, password)
  }
}
