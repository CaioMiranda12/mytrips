import { supabase } from '@/lib/supabase/client'
import { AuthRepository } from '../interfaces/AuthRepository'
import { AuthUser } from '../entities/AuthUser'
import { AuthError } from '../errors/AuthError'

export class SupabaseAuthRepository implements AuthRepository {
  async signUpWithEmail(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        throw new AuthError(error.message)
      }
    } catch (error) {
      console.log(error)
      throw new AuthError('Erro inesperado ao criar conta')
    }
  }

  async signInWithEmail(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw new AuthError(error.message)
      }
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      }

      throw new AuthError('Erro inesperado ao fazer login')
    }
  }

  async signOut() {
    await supabase.auth.signOut()
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data } = await supabase.auth.getUser()
    if (!data.user) return null

    return {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata.full_name,
    }
  }
}
