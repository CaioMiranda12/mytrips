import { AuthRepository } from '../interfaces/AuthRepository'

export class SignInWithEmail {
  constructor(private repo: AuthRepository) { }

  execute(email: string, password: string) {
    return this.repo.signInWithEmail(email, password)
  }
}
