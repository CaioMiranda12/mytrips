import { TripRepository } from '../interfaces/TripRepository'
import { Trip } from '../entities/Trip'
import { TripDetailsView } from '../views/TripDetailsView'

export class GetTripById {
  constructor(private tripRepo: TripRepository) { }

  async execute(tripId: string): Promise<TripDetailsView | null> {
    return this.tripRepo.getTripById(tripId)
  }
}
