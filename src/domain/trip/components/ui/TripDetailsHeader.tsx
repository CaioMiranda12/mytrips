import { ArrowLeft, Check, Link2, Plane } from "lucide-react";
import { useRouter } from "next/navigation"
import { Trip } from "../../entities/Trip";

interface TripDetailsHeaderProps {
  trip: Trip;
  linkCopied: boolean;
  copyInviteLink: () => void;
  activeTab: 'overview' | 'members' | 'expenses' | 'activities';
  setActiveTab: (tab: 'overview' | 'members' | 'expenses' | 'activities') => void;
}


export function TripDetailsHeader({ trip, linkCopied, copyInviteLink, activeTab, setActiveTab }: TripDetailsHeaderProps) {
  const router = useRouter();

  return (
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
                <h1 className="text-xl font-bold text-gray-800">{trip.title}</h1>
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
  )
}