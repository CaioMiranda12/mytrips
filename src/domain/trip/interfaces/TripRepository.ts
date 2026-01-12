import { CreateTripDTO } from '../dtos/CreateTripDTO'
import { Trip } from '../entities/Trip'
export interface TripRepository {
  createTrip(data: CreateTripDTO): Promise<Trip>
  getTripsByUser(userId: string): Promise<Trip[]>
  getTripById(tripId: string): Promise<Trip | null>
}
