import { CreateTripDTO } from "../dtos/CreateTripDTO"
import { TripRepository } from "../interfaces/TripRepository"
export class CreateTrip {
  constructor(private repo: TripRepository) { }

  async execute(data: CreateTripDTO) {
    if (data.startDate > data.endDate) {
      throw new Error('Data inicial não pode ser maior que a final')
    }

    return this.repo.createTrip(data)
  }
}
