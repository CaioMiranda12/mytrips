import { Trip } from "../entities/Trip";
import { TripRepository } from "../interfaces/TripRepository";


export class GetTripDetails {
  constructor(private tripRepository: TripRepository) { }

  async execute(tripId: string): Promise<Trip> {
    const findTrip = await this.tripRepository.getTripById(tripId);

    if (!findTrip) {
      throw new Error("Trip não encontrada");
    }

    return findTrip;
  }
}