'use state'
import { Check, Copy, Link2 } from "lucide-react";
import { Trip, TripMember } from "../../entities/Trip";
import { useState } from "react";
import { Expense } from "@/domain/expense/entities/Expense";

interface TripTabProps {
  trip: Trip;
  members: TripMember[];
  expenses: Expense[];
}


export function MembersTab({ trip, members, expenses }: TripTabProps) {
  const [linkCopied, setLinkCopied] = useState(false);

  if (!trip) return;

  const copyInviteLink = () => {
    navigator.clipboard.writeText(`https://familytripplanner.com/join/${trip.id}`)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
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
                value={`https://familytripplanner.com/join/${trip.id}`}
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
        <h2 className="text-xl font-bold text-gray-800 mb-4">Participantes ({trip.members.length})</h2>
        <div className="space-y-3">
          {trip.members.map((member) => (
            <div
              key={member.userId}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-500">
                    {member.role === 'ADMIN' ? 'Administrador' : 'Participante'}
                  </p>
                </div>
              </div>
              {member.role === 'ADMIN' && (
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full">
                  Admin
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}