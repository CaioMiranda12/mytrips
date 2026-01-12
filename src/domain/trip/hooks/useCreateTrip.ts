'use client'

import { createTripAction } from '@/actions/trip.actions'
import { useAuthContext } from '@/app/shared/providers/AuthProvider'
import { Trip } from '@/domain/trip/entities/Trip'

export function useCreateTrip() {
  const { user } = useAuthContext()

  const createTrip = async (input: {
    title: string
    description?: string
    location: string;
    startDate: Date
    endDate: Date
  }): Promise<Trip> => {
    if (!user) {
      throw new Error('Usuário não autenticado')
    }

    return createTripAction({
      ...input,
      ownerId: user.id,
    })
  }

  return { createTrip }
}
