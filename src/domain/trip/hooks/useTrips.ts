'use client'

import { useState } from 'react'
import { PrismaTripRepository } from '../adapters/PrismaTripRepository'
import { CreateTrip } from '../use-cases/CreateTrip'
import { GetUserTrips } from '../use-cases/GetUserTrips'
import { Trip } from '../entities/Trip'
import { useAuthContext } from '@/app/shared/providers/AuthProvider'

export function useTrips() {
  const { user } = useAuthContext()

  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(false)

  const loadTrips = async () => {
    if (!user) return

    setLoading(true)

    try {
      const repo = new PrismaTripRepository()
      const data = await new GetUserTrips(repo).execute(user.id)
      setTrips(data)
    } finally {
      setLoading(false)
    }
  }

  const createTrip = async (input: {
    title: string
    description?: string
    startDate: Date
    endDate: Date
  }) => {
    if (!user) {
      throw new Error('Usuário não autenticado')
    }

    const repo = new PrismaTripRepository()
    const trip = await new CreateTrip(repo).execute({
      ...input,
      ownerId: user.id,
    })

    setTrips((prev) => [...prev, trip])
    return trip
  }

  return {
    trips,
    loading,
    loadTrips,
    createTrip,
  }
}
