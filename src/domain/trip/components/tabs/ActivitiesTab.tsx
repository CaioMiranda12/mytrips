import { Expense } from "@/domain/expense/entities/Expense";
import { Trip, TripMember } from "../../entities/Trip";
import { Clock, MapPin, Plus } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { CreateActivityModalForm } from "@/domain/activities/components/create-activity-modal-form";

interface TripTabProps {
  trip: Trip;
  members: TripMember[];
  expenses: Expense[];
  activities: any[];
}

export default function ActivitiesTab({ trip, members, expenses, activities }: TripTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Roteiro de passeios</h2>
          <CreateActivityModalForm trip={trip} />
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
  )
}