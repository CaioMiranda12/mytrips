'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

import { AuthUser } from '@/domain/auth/entities/AuthUser'
import { SupabaseAuthRepository } from '@/domain/auth/adapters/SupabaseAuthRepository'
import { SignInWithEmail } from '@/domain/auth/use-cases/SignInWithEmail'
import { SignUpWithEmail } from '@/domain/auth/use-cases/SignUpWithEmail'
import { SignOut } from '@/domain/auth/use-cases/SignOut'
import { GetCurrentUser } from '@/domain/auth/use-cases/GetCurrentUser'

type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

const repo = new SupabaseAuthRepository()

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await new GetCurrentUser(repo).execute()
      setUser(currentUser)
      setLoading(false)
    }
    loadUser()
  }, [])

  const signIn = async (email: string, password: string) => {
    await new SignInWithEmail(repo).execute(email, password)
    setUser(await new GetCurrentUser(repo).execute())
  }

  const signUp = async (email: string, password: string) => {
    await new SignUpWithEmail(repo).execute(email, password)
    setUser(await new GetCurrentUser(repo).execute())
  }

  const signOut = async () => {
    await new SignOut(repo).execute()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }

  return context
}
