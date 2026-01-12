import { prisma } from '@/lib/prisma'

import { Trip } from '@/domain/trip/entities/Trip'
import { CreateTripDTO } from '../dtos/CreateTripDTO'
import { TripRepository } from '../interfaces/TripRepository'
export class PrismaTripRepository implements TripRepository {
  async createTrip(tripData: CreateTripDTO): Promise<Trip> {
    const { title, description, startDate, endDate, ownerId, location } = tripData;

    const trip = await prisma.trip.create({
      data: {
        title: title,
        description: description,
        location: location,
        startDate: startDate,
        endDate: endDate,
        ownerId: ownerId,
        members: {
          create: {
            userId: ownerId,
            role: 'ADMIN',
          },
        },
      },
      include: {
        members: true,
      },
    })

    return {
      id: trip.id,
      title: trip.title,
      description: trip.description ?? undefined,
      location: trip.location,
      startDate: trip.startDate,
      endDate: trip.endDate,
      ownerId: trip.ownerId,
      createdAt: trip.createdAt,
      members: trip.members.map(member => ({
        userId: member.userId,
        role: member.role,
      })),
    }
  }

  async getTripsByUser(userId: string): Promise<Trip[]> {
    const trips = await prisma.trip.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      include: { members: true },
    })

    return trips.map(trip => ({
      id: trip.id,
      title: trip.title,
      description: trip.description ?? undefined,
      location: trip.location,
      startDate: trip.startDate,
      endDate: trip.endDate,
      ownerId: trip.ownerId,
      createdAt: trip.createdAt,
      members: trip.members.map(member => ({
        userId: member.userId,
        role: member.role,
      })),
    }))
  }

  async getTripById(tripId: string): Promise<Trip | null> {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { members: true },
    })

    if (!trip) return null

    return {
      id: trip.id,
      title: trip.title,
      description: trip.description ?? undefined,
      location: trip.location,
      startDate: trip.startDate,
      endDate: trip.endDate,
      ownerId: trip.ownerId,
      createdAt: trip.createdAt,
      members: trip.members.map(member => ({
        userId: member.userId,
        role: member.role,
      })),
    }
  }
}
