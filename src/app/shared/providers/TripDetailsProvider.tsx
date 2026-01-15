'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getTripDetailsAction } from '@/actions/trip.actions'
import { Trip, TripMember } from '@/domain/trip/entities/Trip'
import { Expense } from '@/domain/expense/entities/Expense'

type TripDetailsContextData = {
  trip: Trip | null
  members: TripMember[]
  expenses: Expense[]
  loading: boolean
}

const TripDetailsContext = createContext<TripDetailsContextData | null>(null)

export function TripDetailsProvider({
  tripId,
  children,
}: {
  tripId: string
  children: React.ReactNode
}) {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [members, setMembers] = useState<TripMember[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTrip() {
      try {
        const tripView = await getTripDetailsAction(tripId)

        setTrip(tripView)
        setMembers(tripView.members)
        setExpenses(tripView.expenses)
      } finally {
        setLoading(false)
      }
    }

    loadTrip()
  }, [tripId])

  return (
    <TripDetailsContext.Provider
      value={{ trip, members, expenses, loading }}
    >
      {children}
    </TripDetailsContext.Provider>
  )
}

export function useTripDetails() {
  const context = useContext(TripDetailsContext)
  if (!context) {
    throw new Error('useTripDetails deve ser usado dentro de TripDetailsProvider')
  }
  return context
}