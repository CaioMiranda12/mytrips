'use client'

import { useEffect, useState } from 'react'
import { Trip } from '../entities/Trip'
import { getTripDetailsAction } from '@/actions/trip.actions'

export function useTripDetails(tripId: string) {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTrip() {
      try {
        const tripData = await getTripDetailsAction(tripId)
        setTrip(tripData)
      } finally {
        setLoading(false)
      }
    }

    loadTrip()
  }, [tripId])

  return {
    trip,
    loading,
  }
}
