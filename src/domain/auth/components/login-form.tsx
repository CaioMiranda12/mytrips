'use client'

import { Lock, Mail } from "lucide-react"
import { useLoginForm } from "../hooks/useLoginForm"
import { LoginSchema, LoginSchemaType } from "../schemas/loginSchema"
import { InputField } from "@/app/shared/ui/form/InputField"
import { PasswordInput } from "@/app/shared/ui/form/passwordInput"
import { useAuthContext } from "@/app/shared/providers/AuthProvider"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export function LoginForm() {
  const { signIn } = useAuthContext()
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    errors,
    clearErrors
  } = useLoginForm(LoginSchema)

  const onSubmit = async (formData: LoginSchemaType) => {
    const { email, password } = formData;

    try {
      await signIn(email, password)

      router.refresh()
      router.push('/dashboard')

    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Erro ao fazer login')
      }

      toast.error(errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <InputField
        name="email"
        control={control}
        errors={errors}
        label="Email"
        placeholder="seu@email.com"
        typeInput="text"
        Icon={Mail}
        required
      />

      <PasswordInput
        name="password"
        control={control}
        errors={errors}
        nameInput="Senha"
        nameLabelInput="password"
        namePlaceholderInput="••••••••"
        Icon={Lock}
      />

      <div className="text-right">
        <button type="button" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
          Esqueci minha senha
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-linear-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
      >
        Entrar
      </button>
    </form>
  )
}