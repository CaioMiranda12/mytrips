import { AuthRepository } from '../interfaces/AuthRepository'

export class SignUpWithEmail {
  constructor(private repo: AuthRepository) { }

  execute(email: string, password: string) {
    return this.repo.signUpWithEmail(email, password)
  }
}
