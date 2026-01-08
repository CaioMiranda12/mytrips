import { z } from "zod";

export const LoginSchema = z
  .object({
    email: z
      .string('Por favor, informe seu email.')
      .min(1, 'Email é obrigatório')
      .email('Email inválido'),
    password: z
      .string('A senha deve ter no mínimo 6 caracteres')
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  })

export type LoginSchemaType = z.infer<typeof LoginSchema>;