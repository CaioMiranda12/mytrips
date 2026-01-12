'use client'

import { useState } from 'react'
import { PrismaTripRepository } from '../adapters/PrismaTripRepository'
import { CreateTrip } from '../use-cases/CreateTrip'
import { GetUserTrips } from '../use-cases/GetUserTrips'
import { Trip } from '../entities/Trip'
import { useAuthContext } from '@/app/shared/providers/AuthProvider'
import { createTripAction, getUserTripsAction } from '@/actions/trip.actions'

export function useTrips() {
  const { user } = useAuthContext()

  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(false)

  const loadTrips = async () => {
    if (!user) return

    setLoading(true)

    try {
      const data = await getUserTripsAction(user.id)
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

    const trip = await createTripAction({
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
