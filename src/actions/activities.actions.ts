'use server'

import { PrismaActivityRepository } from "@/domain/activities/adapters/PrismaActivityRepository";
import { CreateActivityDTO } from "@/domain/activities/dtos/CreateActivityDTO";
import { CreateActivity } from "@/domain/activities/use-cases/CreateActivity";

export async function createActivityAction(createActivityDTO: CreateActivityDTO) {
  const { title, date, hour, description, estimatedCost, status, tripId } = createActivityDTO;

  const repo = new PrismaActivityRepository();
  const useCase = new CreateActivity(repo);

  return useCase.execute({
    title,
    date,
    hour,
    description,
    estimatedCost,
    status,
    tripId,
  });
}