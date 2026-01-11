
import { AuthError } from "../errors/AuthError"
import { comparePassword, hashPassword } from "@/lib/password"
import { AuthRepository } from "../interfaces/AuthRepository"
import { createSession, destroySession, getSessionUserId } from "@/lib/session"
import { AuthUser } from "../entities/AuthUser"
import { prisma } from "@/lib/prisma"

export class PrismaAuthRepository implements AuthRepository {
  async signUpWithEmail(email: string, password: string) {
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) throw new AuthError("E-mail já cadastrado")

    const hashed = await hashPassword(password)

    await prisma.user.create({
      data: {
        email,
        password: hashed,
      },
    })
  }

  async signInWithEmail(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new AuthError("Credenciais inválidas")

    const valid = await comparePassword(password, user.password)
    if (!valid) throw new AuthError("Credenciais inválidas")

    createSession(user.id)
  }

  async signOut() {
    destroySession()
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const userId = await getSessionUserId()

    if (!userId || typeof userId !== "string") {
      return null
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return null

    return {
      id: user.id,
      email: user.email,
      name: user.name || '',
    }
  }
}
