'use client'
import { useState } from 'react'
import { Plane, ArrowLeft, Calendar, MapPin, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CreateTripForm } from '@/domain/trip/components/create-trip-form'

export default function CreateTripPage() {
  const router = useRouter()

  const handleCreateExample = () => {
    router.push('/trip/fake-trip')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-cyan-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Family Trip Planner</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
            <MapPin className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Criar nova viagem</h2>
          <p className="text-gray-600">Preencha as informações básicas da sua viagem</p>
        </div>

        {/* Form */}
        <CreateTripForm />

        {/* Example Trip Option */}
        <div className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Experimentar com uma viagem de exemplo
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Não quer criar uma viagem agora? Explore o sistema com uma viagem fictícia já preenchida.
              </p>
              <button
                onClick={handleCreateExample}
                className="px-5 py-2 bg-white text-orange-600 font-semibold rounded-lg hover:shadow-md transition-all border border-orange-200"
              >
                Ver exemplo
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
