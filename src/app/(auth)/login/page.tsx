'use client'

import { useState } from 'react'
import { Plane, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LoginForm } from '@/domain/auth/components/login-form'

export default function Login() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 via-blue-50 to-teal-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo e título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Plane className="w-9 h-9 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Family Trip Planner</h1>
          <p className="text-gray-600">Entre para organizar suas viagens</p>
        </div>

        {/* Card de login */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Entrar</h2>

          <LoginForm />

          {/* Link para cadastro */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link href="/cadastro" className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>

        {/* Link voltar */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Voltar para página inicial
          </button>
        </div>
      </div>
    </div>
  )
}
