"use client"

import { useAuthContext } from "@/app/shared/providers/AuthProvider"

export function useAuth() {
  return useAuthContext()
}
