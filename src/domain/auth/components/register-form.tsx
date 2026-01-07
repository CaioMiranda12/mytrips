'use client'

import Link from "next/link";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { RegisterSchema, RegisterSchemaType } from "../schemas/registerSchema";
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useState } from "react";
import { Input } from "@/app/shared/ui/form/input";
import { PasswordInput } from "@/app/shared/ui/form/passwordInput";
import { useAuthContext } from "@/app/shared/providers/AuthProvider";
import { AuthError } from "../errors/AuthError";
import { toast } from "react-toastify";

export function RegisterForm() {
  const { signUp } = useAuthContext()

  const {
    handleSubmit,
    errors,
    control,
    reset: resetForm,
    clearErrors
  } = useRegisterForm(RegisterSchema);

  const onSubmit = async (formData: RegisterSchemaType) => {
    const { name, email, password, confirmPassword } = formData;
    console.log(formData)

    try {
      await signUp(email, password)
      toast.success('Conta criada com sucesso!')
      resetForm();
      clearErrors();
    } catch (error) {
      console.log(error)
      if (error instanceof AuthError) {
        toast.error(error.message)
      } else {
        toast.error('Erro inesperado')
      }
    }
  }

  return (
    <>
      {/* Card de cadastro */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Criar conta</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Nome */}
          <Input
            name="name"
            control={control}
            errors={errors}
            nameInput="Nome"
            nameLabelInput="name"
            namePlaceholderInput="Seu nome completo"
            typeInput="text"
            Icon={<User />}
          />

          {/* Email */}
          <Input
            name="email"
            control={control}
            errors={errors}
            nameInput="Email"
            nameLabelInput="email"
            namePlaceholderInput="seu@email.com"
            typeInput="text"
            Icon={<Mail />}
          />

          {/* Senha */}
          <PasswordInput
            name="password"
            control={control}
            errors={errors}
            nameInput="Senha"
            nameLabelInput="password"
            namePlaceholderInput="••••••••"
            Icon={<Lock />}
          />

          {/* Confirmar senha */}
          <PasswordInput
            name="confirmPassword"
            control={control}
            errors={errors}
            nameInput="Confirmar senha"
            nameLabelInput="confirmPassword"
            namePlaceholderInput="••••••••"
            Icon={<Lock />}
          />

          {/* Botão cadastrar */}
          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Criar conta
          </button>
        </form>

        {/* Link para login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}