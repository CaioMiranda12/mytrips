'use client'

import { useEffect, useState } from 'react'
import { SupabaseAuthRepository } from '../adapters/SupabaseAuthRepository'
import { AuthUser } from '../entities/AuthUser'
import { SignInWithEmail } from '../use-cases/SignInWithEmail'
import { SignUpWithEmail } from '../use-cases/SignUpWithEmail'
import { SignOut } from '../use-cases/SignOut'
import { GetCurrentUser } from '../use-cases/GetCurrentUser'

const repo = new SupabaseAuthRepository()

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const useCase = new GetCurrentUser(repo)
      const u = await useCase.execute()
      setUser(u)
      setLoading(false)
    }
    load()
  }, [])

  const signIn = (email: string, password: string) =>
    new SignInWithEmail(repo).execute(email, password)

  const signUp = (email: string, password: string) =>
    new SignUpWithEmail(repo).execute(email, password)

  const signOut = async () => {
    await new SignOut(repo).execute()
    setUser(null)
  }

  return { user, loading, signIn, signUp, signOut }
}
