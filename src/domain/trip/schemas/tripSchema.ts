import { z } from "zod";

export const TripSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
})

export type TripSchemaType = z.infer<typeof TripSchema>;