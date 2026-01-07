import { AuthRepository } from '../interfaces/AuthRepository'

export class SignOut {
  constructor(private repo: AuthRepository) { }

  execute() {
    return this.repo.signOut()
  }
}
