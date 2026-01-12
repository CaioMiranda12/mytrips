'use client'

import { useEffect, useState } from 'react'
import { getUserTripsAction } from '@/actions/trip.actions'
import { useAuthContext } from '@/app/shared/providers/AuthProvider'
import { Trip } from '@/domain/trip/entities/Trip'

export function useUserTrips() {
  const { user } = useAuthContext()

  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserTrips() {
      if (!user) return

      try {
        const userTripsData = await getUserTripsAction(user.id)
        setTrips(userTripsData)
      } finally {
        setLoading(false)
      }
    }

    loadUserTrips();

  }, [user])

  return { trips, loading }
}
