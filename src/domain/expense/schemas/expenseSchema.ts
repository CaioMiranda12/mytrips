import { z } from 'zod'

export const ExpenseSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório'),

  amount: z
    .string()
    .min(1, 'Valor é obrigatório')
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) > 0,
      'Valor deve ser um número maior que zero'
    ),

  category: z.enum([
    'FOOD',
    'TRANSPORT',
    'LODGING',
    'ENTERTAINMENT',
    'OTHER',
  ]).optional(),

  date: z
    .string()
    .optional(),

  paidById: z
    .string()
    .uuid('Usuário inválido'),

  participants: z
    .array(z.string().uuid())
    .min(1, 'Selecione ao menos um participante'),
})

export type ExpenseSchemaType = z.infer<typeof ExpenseSchema>
