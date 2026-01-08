import { TripRepository, CreateTripInput } from '../interfaces/TripRepository'
import { Trip } from '../entities/Trip'

export class CreateTrip {
  constructor(private tripRepo: TripRepository) { }

  async execute(input: CreateTripInput): Promise<Trip> {
    if (input.startDate > input.endDate) {
      throw new Error('Data inicial não pode ser maior que a final')
    }

    const trip = await this.tripRepo.createTrip(input)

    await this.tripRepo.addMember(trip.id, input.ownerId, 'ADMIN')

    return trip
  }
}
