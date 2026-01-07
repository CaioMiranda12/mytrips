import { AuthUser } from '../entities/AuthUser'

export interface AuthRepository {
  signInWithEmail(email: string, password: string): Promise<void>
  signUpWithEmail(email: string, password: string): Promise<void>
  signOut(): Promise<void>
  getCurrentUser(): Promise<AuthUser | null>
}
