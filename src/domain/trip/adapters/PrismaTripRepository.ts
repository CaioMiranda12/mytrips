import { prisma } from '@/lib/prisma'
import { TripRepository, CreateTripInput } from '../interfaces/TripRepository'
import { Trip } from '../entities/Trip'

export class PrismaTripRepository implements TripRepository {
  async createTrip(data: CreateTripInput): Promise<Trip> {
    const trip = await prisma.trip.create({
      data: {
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        ownerId: data.ownerId,
      },
      include: {
        members: true,
      },
    })

    return trip
  }

  async addMember(tripId: string, userId: string, role: 'ADMIN' | 'MEMBER') {
    await prisma.tripMember.create({
      data: {
        tripId,
        userId,
        role,
      },
    })
  }

  async getTripsByUser(userId: string): Promise<Trip[]> {
    return prisma.trip.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: true,
      },
      orderBy: {
        startDate: 'asc',
      },
    })
  }

  async getTripById(tripId: string, userId: string): Promise<Trip | null> {
    return prisma.trip.findFirst({
      where: {
        id: tripId,
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: true,
      },
    })
  }
}
