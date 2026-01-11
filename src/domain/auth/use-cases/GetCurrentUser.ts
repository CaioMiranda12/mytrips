import { AuthRepository } from "../interfaces/AuthRepository"
import { getSessionUserId } from "@/lib/session"

export class GetCurrentUser {
  constructor(private repo: AuthRepository) { }

  async execute() {
    const userId = await getSessionUserId()
    if (!userId) return null

    return this.repo.getUserById(userId)
  }
}
