import { TripRepository } from '../interfaces/TripRepository'
import { Trip } from '../entities/Trip'

export class GetTripById {
  constructor(private tripRepo: TripRepository) { }

  async execute(tripId: string, userId: string): Promise<Trip | null> {
    return this.tripRepo.getTripById(tripId, userId)
  }
}
