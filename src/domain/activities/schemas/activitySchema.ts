import { z } from "zod";

export const ActivitySchema = z.object({
  title: z.string('O título deve ter entre 2 e 100 caracteres').min(1, 'O título é obrigatório').max(100, 'O título deve ter entre 2 e 100 caracteres'),
  date: z.string(),
  hour: z.string().optional(),
  estimatedCost: z.string().min(0, 'O valor não pode ser negativo').optional(),
  status: z.enum(['PLANNED', 'DONE', 'CANCELED']),
  description: z.string().optional(),
  tripId: z.string(),
})

export type ActivitySchemaType = z.infer<typeof ActivitySchema>;