import { prisma } from '@/lib/prisma'

import { Trip } from '@/domain/trip/entities/Trip'
import { CreateTripDTO } from '../dtos/CreateTripDTO'
import { TripRepository } from '../interfaces/TripRepository'
export class PrismaTripRepository implements TripRepository {
  async createTrip(data: CreateTripDTO): Promise<Trip> {
    const trip = await prisma.trip.create({
      data: {
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        ownerId: data.ownerId,
        members: {
          create: {
            userId: data.ownerId,
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
      startDate: trip.startDate,
      endDate: trip.endDate,
      ownerId: trip.ownerId,
      createdAt: trip.createdAt,
      members: trip.members.map(m => ({
        userId: m.userId,
        role: m.role,
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
      startDate: trip.startDate,
      endDate: trip.endDate,
      ownerId: trip.ownerId,
      createdAt: trip.createdAt,
      members: trip.members.map(m => ({
        userId: m.userId,
        role: m.role,
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
      startDate: trip.startDate,
      endDate: trip.endDate,
      ownerId: trip.ownerId,
      createdAt: trip.createdAt,
      members: trip.members.map(m => ({
        userId: m.userId,
        role: m.role,
      })),
    }
  }
}
