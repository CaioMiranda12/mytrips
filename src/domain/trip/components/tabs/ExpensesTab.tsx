import { Check, DollarSign, Link2, MoreVertical } from "lucide-react";
import { Trip, TripMember } from "../../entities/Trip";
import { useTripDetails } from "../../hooks/useTripDetails";
import { useGetTripExpenses } from "@/domain/expense/hooks/useGetTripExpenses";
import { formatCurrency } from "@/lib/formatCurrency";
import { CreateExpenseModalForm } from "@/domain/expense/components/create-expense-modal-form";
import { formatDate } from "@/lib/formatDate";
import { Expense } from "@/domain/expense/entities/Expense";

interface TripTabProps {
  trip: Trip;
  members: TripMember[];
  expenses: Expense[];
}

export function ExpensesTab({ trip, members, expenses }: TripTabProps) {

  if (!trip) return;

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const perPerson = totalExpenses / members.length

  return (
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
        <CreateExpenseModalForm trip={trip} />

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
                  <p className="font-semibold text-gray-800">{expense.title}</p>
                  <p className="text-sm text-gray-500">Pago por {expense.paidBy?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-bold text-gray-800">{formatCurrency(expense.amount)}</p>
                  <p className="text-xs text-gray-500">{formatDate(expense.date)}</p>
                </div>
                <button
                  className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                  title="Editar ou excluir gasto"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}