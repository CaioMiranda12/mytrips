'use client'

import { useState } from 'react'
import { createExpenseAction } from '@/actions/expense.actions'
import { ExpenseCategory } from '@/domain/expense/enums/ExpenseCategory'
import { useAuthContext } from '@/app/shared/providers/AuthProvider'

type CreateExpenseInput = {
  title: string
  amount: string
  category?: ExpenseCategory
  date?: Date
  paidById: string
  participants: string[]
  splitType: 'equal' | 'custom'
}

export function useCreateExpense(tripId: string) {
  const [loading, setLoading] = useState(false)
  const { user } = useAuthContext()

  const createExpense = async (input: CreateExpenseInput) => {
    setLoading(true)

    try {
      if (!user) {
        throw new Error('Usuário não autenticado')
      }

      const expenseDTO = {
        title: input.title,
        amount: Number(input.amount),
        category: input.category,
        date: input.date ?? new Date(),
        paidById: input.paidById,
        participants: input.participants,
        tripId,
      }

      return createExpenseAction(expenseDTO)
    } finally {
      setLoading(false)
    }
  }

  return {
    createExpense,
    loading,
  }
}
