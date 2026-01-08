export type TripRole = 'ADMIN' | 'MEMBER'

export type TripMember = {
  userId: string
  role: TripRole
}

export type Trip = {
  id: string
  title: string
  description?: string | null
  startDate: Date
  endDate: Date
  ownerId: string
  members: TripMember[]
  createdAt: Date
}
