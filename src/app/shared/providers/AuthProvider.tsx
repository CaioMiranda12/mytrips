"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

import { AuthUser } from "@/domain/auth/entities/AuthUser"
import {
  signInAction,
  signUpAction,
  signOutAction,
  getCurrentUserAction,
} from "@/actions/auth.actions"

type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUserAction()
      setUser(currentUser)
      setLoading(false)
    }
    loadUser()
  }, [])

  const signIn = async (email: string, password: string) => {
    await signInAction(email, password)
    setUser(await getCurrentUserAction())
  }

  const signUp = async (email: string, password: string) => {
    await signUpAction(email, password)
    setUser(await getCurrentUserAction())
  }

  const signOut = async () => {
    await signOutAction()
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
    throw new Error("useAuthContext must be used within AuthProvider")
  }
  return context
}
