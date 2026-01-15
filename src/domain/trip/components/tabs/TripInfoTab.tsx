import { formatDate } from "@/lib/formatDate";
import { Calendar, MapPin, Users, Wallet } from "lucide-react";
import { useTripDetails } from "../../hooks/useTripDetails";
import { useGetTripExpenses } from "@/domain/expense/hooks/useGetTripExpenses";
import { formatCurrency } from "@/lib/formatCurrency";

interface TripTabProps {
  tripId: string;
}

export function TripInfoTab({ tripId }: TripTabProps) {
  const { trip, loading } = useTripDetails(tripId)
  const { expenses, loading: expensesLoading } = useGetTripExpenses(tripId)

  if (!trip) return;

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const perPerson = totalExpenses / trip.members.length

  const activities = [
    { id: '1', name: 'Passeio no centro histórico', date: '2024-07-16', status: 'confirmed' },
    { id: '2', name: 'Visita ao Lago Negro', date: '2024-07-17', status: 'planned' },
    { id: '3', name: 'Parque do Caracol', date: '2024-07-18', status: 'confirmed' },
  ]

  return (
    <div className="space-y-6">
      {/* Trip Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Informações da viagem</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Período</p>
              <p className="font-semibold text-gray-800">
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Participantes</p>
              <p className="font-semibold text-gray-800">{trip.members.length} pessoas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800">Gastos totais</h3>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2">{formatCurrency(totalExpenses)}</p>
          <p className="text-sm text-gray-600">{formatCurrency(perPerson)} por pessoa</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800">Passeios</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-2">{activities.length}</p>
          <p className="text-sm text-gray-600">
            {activities.filter(a => a.status === 'confirmed').length} confirmados
          </p>
        </div>
      </div>
    </div>
  )
}