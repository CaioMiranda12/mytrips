"use server"

import { PrismaAuthRepository } from "@/domain/auth/adapters/PrismaAuthRepository"
import { SignInWithEmail } from "@/domain/auth/use-cases/SignInWithEmail"
import { SignUpWithEmail } from "@/domain/auth/use-cases/SignUpWithEmail"
import { SignOut } from "@/domain/auth/use-cases/SignOut"
import { GetCurrentUser } from "@/domain/auth/use-cases/GetCurrentUser"
import { createSession } from "@/lib/session"

const repo = new PrismaAuthRepository()

export async function signUpAction(
  email: string,
  password: string,
  name: string
) {
  return new SignUpWithEmail(repo).execute(email, password, name)
}

export async function signInAction(
  email: string,
  password: string
) {
  const user = await new SignInWithEmail(repo).execute(email, password)

  // 🔥 ISSO ESTAVA FALTANDO
  await createSession(user.id)

  return user
}

export async function signOutAction() {
  await new SignOut(repo).execute()
}

export async function getCurrentUserAction() {
  return new GetCurrentUser(repo).execute()
}
