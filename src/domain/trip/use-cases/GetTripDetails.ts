import { Trip } from '../entities/Trip'
import { TripRepository } from '../interfaces/TripRepository'
import { GetTripByIdDTO } from '../dtos/GetTripByIdDTO'

export class GetTripDetails {
  constructor(private tripRepository: TripRepository) { }

  async execute({ tripId }: GetTripByIdDTO): Promise<Trip> {
    const findTrip = await this.tripRepository.getTripById(tripId)

    if (!findTrip) {
      throw new Error('Trip não encontrada')
    }

    return findTrip
  }
}
