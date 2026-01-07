import { AuthRepository } from '../interfaces/AuthRepository'

export class GetCurrentUser {
  constructor(private repo: AuthRepository) { }

  execute() {
    return this.repo.getCurrentUser()
  }
}
