'use client'
import { useState } from 'react'
import { Plane, ArrowLeft, Users, Link2, Wallet, Calendar, Plus, Copy, Check, MapPin, DollarSign, Clock } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { formatDate } from '@/lib/formatDate'
import { formatCurrency } from '@/lib/formatCurrency'
import { CreateExpenseModalForm } from '@/domain/expense/components/create-expense-modal-form'
import { useGetTripExpenses } from '@/domain/expense/hooks/useGetTripExpenses'
import { Tabs } from '@/domain/trip/components/tabs/Tabs'
import { TripInfoTab } from '@/domain/trip/components/tabs/TripInfoTab'
import { ExpensesTab } from '@/domain/trip/components/tabs/ExpensesTab'
import { MembersTab } from '@/domain/trip/components/tabs/MembersTab'
import { TripDetailsHeader } from '@/domain/trip/components/ui/TripDetailsHeader'
import { useTripDetails } from '@/app/shared/providers/TripDetailsProvider'
import LoadingScreen from '@/app/shared/ui/loading/loadingScreen'
import ActivitiesTab from '@/domain/trip/components/tabs/ActivitiesTab'


export default function TripDetails() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'expenses' | 'activities'>('overview')
  const [linkCopied, setLinkCopied] = useState(false)

  const { trip, members, expenses } = useTripDetails()

  if (!trip) return <LoadingScreen />

  const activities = [
    { id: '1', name: 'Passeio no centro histórico', date: '2024-07-16', status: 'confirmed' },
    { id: '2', name: 'Visita ao Lago Negro', date: '2024-07-17', status: 'planned' },
    { id: '3', name: 'Parque do Caracol', date: '2024-07-18', status: 'confirmed' },
  ]

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const perPerson = totalExpenses / trip.members.length

  const copyInviteLink = () => {
    navigator.clipboard.writeText('https://familytripplanner.com/join/abc123')
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      <TripDetailsHeader trip={trip} linkCopied={linkCopied} copyInviteLink={copyInviteLink} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && <TripInfoTab trip={trip} members={members} expenses={expenses} />}
        {activeTab === 'expenses' && <ExpensesTab trip={trip} members={members} expenses={expenses} />}
        {activeTab === 'members' && <MembersTab trip={trip} members={members} expenses={expenses} />}
        {activeTab === 'activities' && <ActivitiesTab trip={trip} members={members} expenses={expenses} activities={activities} />}
      </main>
    </div>
  )
}
