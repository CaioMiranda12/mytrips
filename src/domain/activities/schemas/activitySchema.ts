import { z } from "zod";

export const ActivitySchema = z.object({
  title: z.string('O título deve ter entre 2 e 100 caracteres').min(2, 'O título deve ter entre 2 e 100 caracteres').max(100, 'O título deve ter entre 2 e 100 caracteres'),
  description: z.string().optional(),
  date: z.date(),
  status: z.enum(['PLANNED', 'DONE', 'CANCELED']),
  tripId: z.string().uuid(),
})

export type ActivitySchemaType = z.infer<typeof ActivitySchema>;