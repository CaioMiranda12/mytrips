'use client'

import { getTripExpensesAction } from '@/actions/expense.actions'
import { useEffect, useState } from 'react'
import { Expense } from '../entities/Expense'

export function useGetTripExpenses(tripId: string) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTripExpenses() {
      try {
        const tripExpenses = await getTripExpensesAction(tripId)
        setExpenses(tripExpenses)
      } finally {
        setLoading(false)
      }
    }

    loadTripExpenses()
  }, [tripId])

  return {
    expenses,
    loading,
  }
}
