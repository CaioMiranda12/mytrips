'use client'
import { useAuthContext } from '@/app/shared/providers/AuthProvider'
import { useUserTrips } from '@/domain/trip/hooks/useUserTrips'
import { Plane, Plus, Users, Calendar, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const { user } = useAuthContext()
  console.log(user)

  // const trips = [
  //   {
  //     id: '1',
  //     name: 'Viagem para Gramado',
  //     startDate: '2024-07-15',
  //     endDate: '2024-07-22',
  //     participants: 5,
  //     location: 'Gramado, RS'
  //   },
  //   {
  //     id: '2',
  //     name: 'Férias em Florianópolis',
  //     startDate: '2024-08-10',
  //     endDate: '2024-08-17',
  //     participants: 3,
  //     location: 'Florianópolis, SC'
  //   }
  // ]

  const { trips, loading } = useUserTrips()

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-cyan-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div
            onClick={() => router.push('/')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Family Trip Planner</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">U</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Title and Action */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Minhas viagens</h2>
            <p className="text-gray-600">Gerencie e organize todas as suas viagens em grupo</p>
          </div>
          <button
            onClick={() => router.push('/create-trip')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Criar nova viagem</span>
          </button>
        </div>

        {/* Trips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => router.push(`/trip/${trip.id}`)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-sm font-medium rounded-full">
                  Ativa
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-cyan-600 transition-colors">
                {trip.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{trip.members.length} participantes</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">{trip.location}</span>
              </div>
            </div>
          ))}

          {/* Empty State Card */}
          <div
            onClick={() => router.push('/create-trip')}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-cyan-400 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[250px] group"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            </div>
            <p className="text-gray-600 font-medium text-center">
              Criar nova viagem
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
