'use client'
import { useState } from 'react'
import { Plane, ArrowLeft, Users, Link2, Wallet, Calendar, Plus, Copy, Check, MapPin, DollarSign, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TripPageProps {
  params: {
    id: string;
  }
}

export default function FakeTripDetails({ params }: TripPageProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'expenses' | 'activities'>('overview')
  const [linkCopied, setLinkCopied] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showActivityModal, setShowActivityModal] = useState(false)

  // Estados do formulário de gastos
  const [expenseForm, setExpenseForm] = useState({
    description: '',
    amount: '',
    paidBy: '',
    date: ''
  })

  // Estados do formulário de passeios
  const [activityForm, setActivityForm] = useState({
    name: '',
    date: '',
    status: 'planned' as 'planned' | 'confirmed'
  })

  // Dados fictícios
  const trip = {
    name: 'Viagem para Gramado',
    startDate: '2024-07-15',
    endDate: '2024-07-22',
    location: 'Gramado, RS'
  }

  const members = [
    { id: '1', name: 'João Silva', role: 'admin', avatar: 'J' },
    { id: '2', name: 'Maria Santos', role: 'member', avatar: 'M' },
    { id: '3', name: 'Pedro Costa', role: 'member', avatar: 'P' },
    { id: '4', name: 'Ana Oliveira', role: 'member', avatar: 'A' },
  ]

  const expenses = [
    { id: '1', description: 'Hotel 3 noites', amount: 1200, paidBy: 'João Silva', date: '2024-07-15' },
    { id: '2', description: 'Restaurante', amount: 350, paidBy: 'Maria Santos', date: '2024-07-16' },
    { id: '3', description: 'Gasolina', amount: 200, paidBy: 'Pedro Costa', date: '2024-07-15' },
  ]

  const activities = [
    { id: '1', name: 'Passeio no centro histórico', date: '2024-07-16', status: 'confirmed' },
    { id: '2', name: 'Visita ao Lago Negro', date: '2024-07-17', status: 'planned' },
    { id: '3', name: 'Parque do Caracol', date: '2024-07-18', status: 'confirmed' },
  ]

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const perPerson = totalExpenses / members.length

  const copyInviteLink = () => {
    navigator.clipboard.writeText('https://familytripplanner.com/join/abc123')
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-cyan-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
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
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{trip.name}</h1>
                  <p className="text-sm text-gray-600">{trip.location}</p>
                </div>
              </div>
            </div>
            <button
              onClick={copyInviteLink}
              className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-medium rounded-lg hover:shadow-md transition-all flex items-center gap-2"
            >
              {linkCopied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
              <span>{linkCopied ? 'Copiado!' : 'Convidar'}</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium rounded-lg transition-all whitespace-nowrap ${activeTab === 'overview'
                ? 'bg-cyan-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              Visão geral
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-4 py-2 font-medium rounded-lg transition-all whitespace-nowrap ${activeTab === 'members'
                ? 'bg-cyan-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              Participantes
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-4 py-2 font-medium rounded-lg transition-all whitespace-nowrap ${activeTab === 'expenses'
                ? 'bg-cyan-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              Gastos
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-4 py-2 font-medium rounded-lg transition-all whitespace-nowrap ${activeTab === 'activities'
                ? 'bg-cyan-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              Passeios
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
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
                    <p className="font-semibold text-gray-800">{members.length} pessoas</p>
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
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Link2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Link de convite</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Compartilhe este link para convidar mais pessoas para a viagem
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="https://familytripplanner.com/join/abc123"
                      readOnly
                      className="flex-1 px-4 py-2 bg-white border border-orange-200 rounded-lg text-sm"
                    />
                    <button
                      onClick={copyInviteLink}
                      className="px-4 py-2 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      {linkCopied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Participantes ({members.length})</h2>
              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{member.avatar}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{member.name}</p>
                        <p className="text-sm text-gray-500">
                          {member.role === 'admin' ? 'Administrador' : 'Participante'}
                        </p>
                      </div>
                    </div>
                    {member.role === 'admin' && (
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Resumo financeiro</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total gasto</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalExpenses)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Por pessoa</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(perPerson)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de gastos</p>
                  <p className="text-2xl font-bold text-green-600">{expenses.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Lista de gastos</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:shadow-md transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Adicionar gasto</span>
                </button>
              </div>

              <div className="space-y-3">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{expense.description}</p>
                        <p className="text-sm text-gray-500">Pago por {expense.paidBy}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{formatCurrency(expense.amount)}</p>
                      <p className="text-xs text-gray-500">{formatDate(expense.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Roteiro de passeios</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium rounded-lg hover:shadow-md transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Adicionar passeio</span>
                </button>
              </div>

              <div className="space-y-3">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.status === 'confirmed' ? 'bg-cyan-100' : 'bg-gray-200'
                        }`}>
                        <MapPin className={`w-5 h-5 ${activity.status === 'confirmed' ? 'text-cyan-600' : 'text-gray-500'
                          }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{activity.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDate(activity.date)}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${activity.status === 'confirmed'
                      ? 'bg-cyan-100 text-cyan-700'
                      : 'bg-gray-200 text-gray-600'
                      }`}>
                      {activity.status === 'confirmed' ? 'Confirmado' : 'Planejado'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
