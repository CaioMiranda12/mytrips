import { TripRepository } from '../interfaces/TripRepository'
import { Trip } from '../entities/Trip'

export class GetUserTrips {
  constructor(private tripRepo: TripRepository) { }

  async execute(userId: string): Promise<Trip[]> {
    return this.tripRepo.getTripsByUser(userId)
  }
}
