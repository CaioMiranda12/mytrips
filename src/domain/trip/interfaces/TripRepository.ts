import { CreateTripDTO } from '../dtos/CreateTripDTO'
import { Trip } from '../entities/Trip'
import { TripDetailsView } from '../views/TripDetailsView'
export interface TripRepository {
  createTrip(data: CreateTripDTO): Promise<Trip>
  getTripsByUser(userId: string): Promise<Trip[]>
  getTripById(tripId: string): Promise<TripDetailsView | null>
}
