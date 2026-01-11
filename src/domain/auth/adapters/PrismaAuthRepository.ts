import { AuthError } from "../errors/AuthError"
import { comparePassword, hashPassword } from "@/lib/password"
import { AuthRepository } from "../interfaces/AuthRepository"
import { AuthUser } from "../entities/AuthUser"
import { prisma } from "@/lib/prisma"

export class PrismaAuthRepository implements AuthRepository {

  async signUpWithEmail(
    email: string,
    password: string,
    name: string
  ): Promise<AuthUser> {
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) throw new AuthError("E-mail já cadastrado")

    const hashed = await hashPassword(password)

    const user = await prisma.user.create({
      data: { email, name, password: hashed },
    })

    return {
      id: user.id,
      email: user.email,
      name: user.name ?? "",
    }
  }

  async signInWithEmail(
    email: string,
    password: string
  ): Promise<AuthUser> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new AuthError("Credenciais inválidas")

    const valid = await comparePassword(password, user.password)
    if (!valid) throw new AuthError("Credenciais inválidas")

    return {
      id: user.id,
      email: user.email,
      name: user.name ?? "",
    }
  }

  async getUserById(userId: string): Promise<AuthUser | null> {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return null

    return {
      id: user.id,
      email: user.email,
      name: user.name ?? "",
    }
  }
}

