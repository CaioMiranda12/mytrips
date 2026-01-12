'use client'

import { useEffect, useState } from 'react'
import { getTripDetailsAction } from '@/actions/trip.actions'
import { TripDetailsView } from '../views/TripDetailsView'

export function useTripDetails(tripId: string) {
  const [trip, setTrip] = useState<TripDetailsView | null>(null)
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
