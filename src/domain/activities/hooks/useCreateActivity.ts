'use client'

import { useAuthContext } from "@/app/shared/providers/AuthProvider"
import { useState } from "react"
import { CreateActivityFormInput } from "../types/CreateActivityFormInput"
import { createActivityAction } from "@/actions/activities.actions"


export function useCreateActivity(tripId: string) {
  const [loading, setLoading] = useState(false)
  const { user } = useAuthContext()

  const createActivity = async (input: CreateActivityFormInput) => {
    setLoading(true)

    try {
      if (!user) {
        throw new Error('Usuário não autenticado')
      }

      const activityDTO = {
        ...input,
        tripId,
        createdById: user.id,
      }

      return createActivityAction(activityDTO)
    } finally {
      setLoading(false)
    }

  }

  return {
    createActivity,
    loading,
  }

}