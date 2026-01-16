'use client'

import { useState } from "react"
import { useActivityForm } from "../hooks/useActivityForm"
import { ActivitySchema } from "../schemas/activitySchema"
import { Plus, X } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { Trip } from "@/domain/trip/entities/Trip";

interface CreateActivityModalFormProps {
  trip: Trip;
}

export function CreateActivityModalForm({ trip }: CreateActivityModalFormProps) {
  const [showActivityModal, setShowActivityModal] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    clearErrors,
    setValue,
  } = useActivityForm(ActivitySchema)

  const onSubmit = (data: any) => {
    console.log(data)
  }

  if (!showActivityModal) {
    return (
      <button
        onClick={() => setShowActivityModal(true)}
        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium rounded-lg hover:shadow-md transition-all flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        <span>Adicionar passeio</span>
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800">Adicionar passeio</h2>
          <button
            onClick={() => setShowActivityModal(false)}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </header>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Nome do passeio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do passeio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Visita ao Lago Negro"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Dia do passeio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dia do passeio <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              // min={trip.startDate}
              // max={trip.endDate}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              Período da viagem: {formatDate(trip.startDate)} até {formatDate(trip.endDate)}
            </p>
          </div>

          {/* Horário (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horário <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <input
              type="time"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Descrição / Observações (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição / Observações <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <textarea
              placeholder="Adicione detalhes sobre o passeio, endereço, observações..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Custo estimado (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custo estimado <span className="text-gray-400 text-xs">(opcional - não é gasto real)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500">R$</span>
              <input
                type="number"
                placeholder="0,00"
                step="0.01"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              💡 Este valor é apenas para planejamento, não será adicionado aos gastos
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 rounded-b-2xl">
          <button
            onClick={() => setShowActivityModal(false)}
            className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            // disabled={!activityForm.name || !activityForm.date}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Salvar passeio
          </button>
        </div>
      </div>
    </form>
  )
}