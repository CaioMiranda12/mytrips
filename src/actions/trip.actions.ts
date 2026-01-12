'use server'

import { PrismaTripRepository } from '@/domain/trip/adapters/PrismaTripRepository'
import { CreateTrip } from '@/domain/trip/use-cases/CreateTrip'
import { GetTripDetails } from '@/domain/trip/use-cases/GetTripDetails'
import { GetUserTrips } from '@/domain/trip/use-cases/GetUserTrips'

const repo = new PrismaTripRepository()

export async function createTripAction(data: {
  title: string
  description?: string
  location: string;
  startDate: Date
  endDate: Date
  ownerId: string
}) {
  return new CreateTrip(repo).execute(data)
}

export async function getTripDetailsAction(tripId: string) {
  return new GetTripDetails(repo).execute({ tripId })
}

export async function getUserTripsAction(userId: string) {
  return new GetUserTrips(repo).execute(userId)
}
