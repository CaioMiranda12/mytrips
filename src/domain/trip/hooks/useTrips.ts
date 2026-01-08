'use client'

import { useState } from 'react'
import { PrismaTripRepository } from '../adapters/PrismaTripRepository'
import { CreateTrip } from '../use-cases/CreateTrip'
import { GetUserTrips } from '../use-cases/GetUserTrips'
import { Trip } from '../entities/Trip'

const repo = new PrismaTripRepository()

export function useTrips(userId: string) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(false)

  const loadTrips = async () => {
    setLoading(true)
    const data = await new GetUserTrips(repo).execute(userId)
    setTrips(data)
    setLoading(false)
  }

  const createTrip = async (input: {
    title: string
    description?: string
    startDate: Date
    endDate: Date
  }) => {
    const trip = await new CreateTrip(repo).execute({
      ...input,
      ownerId: userId,
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
