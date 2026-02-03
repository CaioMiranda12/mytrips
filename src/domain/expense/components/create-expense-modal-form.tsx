'use client'

import { Info, MapPin, Plus, X } from "lucide-react"
import { useState } from "react"
import { formatCurrency } from "@/lib/formatCurrency"
import { TripDetailsView } from "@/domain/trip/views/TripDetailsView"
import { useExpenseForm } from "../hooks/useExpenseForm"
import { ExpenseSchema, ExpenseSchemaType } from "../schemas/expenseSchema"
import { InputField } from "@/app/shared/ui/form/InputField"
import { SelectField } from "@/app/shared/ui/form/SelectField"
import { useCreateExpense } from "../hooks/useCreateExpense"
import { ExpenseCategory } from "../enums/ExpenseCategory"
import { toast } from "react-toastify"
import { Trip } from "@/domain/trip/entities/Trip"
import { Expense } from "../entities/Expense"

type ExpenseFormMode = 'create' | 'edit'
interface CreateExpenseModalProps {
  trip: Trip;
  mode: ExpenseFormMode;
}

export function CreateExpenseModalForm({ trip, mode }: CreateExpenseModalProps) {
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const { createExpense } = useCreateExpense(trip.id)
  const tripExpenses = trip.expenses || []
  console.log(tripExpenses)

  const memberOptions = trip.members.map(member => ({
    value: member.userId,
    label: member.name
  }));

  const categoryOptions = [
    // { value: "", label: "Selecione uma categoria" },
    { value: "FOOD", label: "🍽️ Alimentação" },
    { value: "TRANSPORT", label: "🚗 Transporte" },
    { value: "LODGING", label: "🏨 Hospedagem" },
    { value: "ENTERTAINMENT", label: "🎉 Lazer" },
    { value: "OTHER", label: "📦 Outros" }
  ];

  const {
    register,
    handleSubmit,
    control,
    reset: resetForm,
    watch,
    errors,
    clearErrors,
    setValue
  } = useExpenseForm(ExpenseSchema)

  const splitType = watch("splitType");
  const participants = watch("participants") || [];
  const amount = watch("amount");

  const toggleParticipant = (memberId: string) => {
    const currentParticipants = watch("participants") || [];

    if (currentParticipants.includes(memberId)) {
      setValue(
        "participants",
        currentParticipants.filter(id => id !== memberId)
      );
    } else {
      setValue("participants", [...currentParticipants, memberId]);
    }
  };

  const calculatePerPerson = () => {
    const newAmount = parseFloat(amount) || 0
    if (splitType === 'equal') {
      return newAmount / trip.members.length
    } else {
      const count = participants.length || 1
      return newAmount / count
    }
  }

  if (!showExpenseModal) {
    return (
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Lista de gastos</h2>
        <button
          onClick={() => setShowExpenseModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:shadow-md transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Adicionar gasto</span>
        </button>
      </div>
    )
  }

  const onSubmit = (formData: ExpenseSchemaType) => {
    const {
      title,
      amount,
      category,
      date,
      paidById,
      participants,
      splitType
    } = formData;

    const resolvedParticipants = splitType === 'equal' ? trip.members.map(member => member.userId) : participants ?? [];

    const resolvedDate = date ? new Date(date) : new Date();

    const expensePayload = {
      tripId: trip.id,
      title,
      amount,
      category: category
        ? (category as ExpenseCategory)
        : undefined,
      date: resolvedDate,
      paidById,
      participants: resolvedParticipants,
      splitType,
    };

    createExpense(expensePayload);
    toast.success('Gasto adicionado com sucesso!')
    resetForm();
    clearErrors();
    setShowExpenseModal(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800">Adicionar gasto</h2>
          <button
            onClick={() => setShowExpenseModal(false)}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <InputField
            name="title"
            control={control}
            errors={errors}
            label="Descrição do gasto"
            placeholder="Ex: Almoço no restaurante"
            typeInput="text"
            required
            color="green"
          />

          <InputField
            name="amount"
            control={control}
            errors={errors}
            label="Valor total"
            placeholder="R$ 0,00"
            typeInput="number"
            required
            color="green"
          />

          <SelectField
            name="paidById"
            control={control}
            errors={errors}
            label="Quem pagou"
            required
            options={memberOptions}
            color="green"
          />

          <SelectField
            name="splitType"
            control={control}
            errors={errors}
            label="Forma de divisão"
            required
            options={[
              { value: "equal", label: "Dividir igualmente" },
              { value: "custom", label: "Selecionar participantes" },
            ]}
            color="green"
          />

          {splitType === 'custom' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Selecione os participantes deste gasto
              </label>
              <div className="space-y-2">
                {trip.members.map(member => (
                  <label key={member.userId} className="flex items-center gap-3 p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={participants.includes(member.userId)}
                      onChange={() => toggleParticipant(member.userId)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{member.name.charAt(0)}</span>
                      </div>
                      <span className="text-gray-800 font-medium">{member.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <SelectField
            name="category"
            control={control}
            errors={errors}
            label="Categoria"
            options={categoryOptions}
            color="green"
          />

          <InputField
            name="date"
            control={control}
            errors={errors}
            label="Data do gasto"
            typeInput="date"
            color="green"
          />

          {/* Prévia do valor por pessoa */}
          {amount && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Valor por pessoa</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(calculatePerPerson())}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {splitType === 'equal'
                      ? `Dividido entre ${trip.members.length} pessoas`
                      : `Dividido entre ${participants.length || 0} pessoa(s) selecionada(s)`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 rounded-b-2xl">
          <button
            onClick={() => setShowExpenseModal(false)}
            className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            // onClick={handleSaveExpense}
            // disabled={!expenseForm.description || !expenseForm.amount}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Salvar gasto
          </button>
        </div>
      </div>
    </form>
  )

}