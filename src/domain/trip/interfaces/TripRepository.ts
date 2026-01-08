import { Trip } from '../entities/Trip'

export type CreateTripInput = {
  title: string
  description?: string
  startDate: Date
  endDate: Date
  ownerId: string
}

export interface TripRepository {
  createTrip(data: CreateTripInput): Promise<Trip>
  addMember(tripId: string, userId: string, role: 'ADMIN' | 'MEMBER'): Promise<void>
  getTripsByUser(userId: string): Promise<Trip[]>
  getTripById(tripId: string, userId: string): Promise<Trip | null>
}
