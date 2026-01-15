import { Expense } from '@/domain/expense/entities/Expense'
import { TripRole } from '../entities/Trip'

export type TripMemberView = {
  userId: string
  role: TripRole
  name: string
}

export type TripDetailsView = {
  id: string
  title: string
  description?: string
  location: string
  startDate: Date
  endDate: Date
  ownerId: string
  createdAt: Date
  members: TripMemberView[]
  expenses: Expense[]
}