import { TripRepository } from '../interfaces/TripRepository'
import { GetTripByIdDTO } from '../dtos/GetTripByIdDTO'
import { TripDetailsView } from '../views/TripDetailsView'

export class GetTripDetails {
  constructor(private tripRepository: TripRepository) { }

  async execute({ tripId }: GetTripByIdDTO): Promise<TripDetailsView> {
    const findTrip = await this.tripRepository.getTripById(tripId)

    if (!findTrip) {
      throw new Error('Trip não encontrada')
    }

    return findTrip
  }
}
