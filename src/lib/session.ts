import { cookies } from "next/headers"

const SESSION_KEY = "session"

export async function createSession(userId: string) {
  const cookieStore = await cookies()

  cookieStore.set(SESSION_KEY, userId, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_KEY)
}

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_KEY)?.value ?? null
}
