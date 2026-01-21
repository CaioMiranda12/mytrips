import { prisma } from '@/lib/prisma'

import { Trip } from '@/domain/trip/entities/Trip'
import { CreateTripDTO } from '../dtos/CreateTripDTO'
import { TripRepository } from '../interfaces/TripRepository'
import { TripDetailsView } from '../views/TripDetailsView';
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
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
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
        name: member.user.name
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
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
      },
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
        name: member.user.name,
      })),
    }))
  }

  async getTripById(tripId: string): Promise<TripDetailsView | null> {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        activities: true,
        expenses: {
          orderBy: {
            date: 'desc'
          },
          include: {
            paidBy: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
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
        name: member.user.name,
      })),
      expenses: trip.expenses.map(expense => ({
        id: expense.id,
        title: expense.title,
        tripId: expense.tripId,
        amount: expense.amount.toNumber(),
        paidBy: {
          id: expense.paidBy.id,
          name: expense.paidBy.name
        },
        createdAt: expense.createdAt,
        date: expense.date,
        paidById: expense.paidById,
      })),
    }
  }
}
