import { prisma } from "@/lib/prisma";
import { CreateActivityDTO } from "../dtos/CreateActivityDTO";
import { Activity } from "../entities/Activity";
import { ActivityRepository } from "../interface/ActivityRepository";


export class PrismaActivityRepository implements ActivityRepository {
  async create(createActivityDTO: CreateActivityDTO): Promise<Activity> {
    const { title, description, date, status, tripId, estimatedCost, hour } = createActivityDTO;

    const activity = await prisma.activity.create({
      data: {
        title,
        description,
        date,
        status,
        tripId,
        estimatedCost,
        hour,
      }
    });

    return {
      id: activity.id,
      title: activity.title,
      description: activity.description ?? undefined,
      date: activity.date,
      status: activity.status,
      tripId: activity.tripId,
      estimatedCost: activity.estimatedCost ? activity.estimatedCost.toNumber() : undefined,
      hour: activity.hour ?? undefined,
      createdAt: activity.createdAt
    }
  }
}