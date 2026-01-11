// src/lib/session.ts
import { cookies } from "next/headers"

export const SESSION_KEY = "session"

export async function createSession(userId: string) {
  const store = await cookies()
  store.set(SESSION_KEY, userId, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export async function destroySession() {
  const store = await cookies()
  store.delete(SESSION_KEY)
}

export async function getSessionUserId(): Promise<string | null> {
  const store = await cookies()
  return store.get(SESSION_KEY)?.value ?? null
}
