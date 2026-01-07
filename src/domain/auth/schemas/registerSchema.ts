import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string('Por favor, informe seu nome.')
      .min(1, 'Nome é obrigatório')
      .max(100, 'Nome deve ter no máximo 100 caracteres'),

    email: z
      .string('Por favor, informe seu email.')
      .min(1, 'Email é obrigatório')
      .email('Email inválido'),

    password: z
      .string('A senha deve ter no mínimo 6 caracteres')
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),

    confirmPassword: z
      .string('Confirme sua senha')
      .min(6, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;