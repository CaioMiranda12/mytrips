import { AuthUser } from "../entities/AuthUser"

export interface AuthRepository {
  signUpWithEmail(
    email: string,
    password: string,
    name: string
  ): Promise<AuthUser>

  signInWithEmail(
    email: string,
    password: string
  ): Promise<AuthUser>

  getUserById(userId: string): Promise<AuthUser | null>
}
