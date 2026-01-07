'use client'

import { useState } from 'react'
import { Plane, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulação de login - redireciona para o dashboard
    router.push('/dashboard')
  }

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

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Link esqueci senha */}
            <div className="text-right">
              <button type="button" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
                Esqueci minha senha
              </button>
            </div>

            {/* Botão entrar */}
            <button
              type="submit"
              className="w-full py-3 bg-linear-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              Entrar
            </button>
          </form>

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
