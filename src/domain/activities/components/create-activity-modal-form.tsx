'use client'

import { useState } from "react"
import { useActivityForm } from "../hooks/useActivityForm"
import { ActivitySchema, ActivitySchemaType } from "../schemas/activitySchema"
import { Plus, X } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { Trip } from "@/domain/trip/entities/Trip";
import { InputField } from "@/app/shared/ui/form/InputField";
import { TextAreaField } from "@/app/shared/ui/form/TextareaField";
import { SelectField } from "@/app/shared/ui/form/SelectField";
import { useCreateActivity } from "../hooks/useCreateActivity";
import { toast } from "react-toastify";

interface CreateActivityModalFormProps {
  trip: Trip;
}

export function CreateActivityModalForm({ trip }: CreateActivityModalFormProps) {
  const [showActivityModal, setShowActivityModal] = useState(false);
  const { createActivity, loading } = useCreateActivity(trip.id);

  const statusOptions = [
    { value: 'PLANNED', label: 'Planejado' },
    { value: 'DONE', label: 'Concluído' },
    { value: 'CANCELED', label: 'Cancelado' },
  ]

  const {
    register,
    handleSubmit,
    control,
    reset,
    errors,
    watch,
    clearErrors,
    setValue,
  } = useActivityForm(ActivitySchema)

  const onSubmit = (formData: ActivitySchemaType) => {
    const { title, date, hour, description, estimatedCost, status, tripId } = formData;

    const activityPayload = {
      title,
      date: new Date(date),
      hour,
      description,
      estimatedCost: estimatedCost ? Number(estimatedCost) : undefined,
      status,
      tripId: trip.id,
    }

    createActivity(activityPayload)
    reset();
    setShowActivityModal(false);
    toast.success('Passeio criado com sucesso!')
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
          <InputField
            name="title"
            control={control}
            errors={errors}
            label="Nome do passeio"
            placeholder="Ex: Visita ao Lago Negro"
            typeInput="text"
            required
          />

          <div>
            <InputField
              name="date"
              control={control}
              errors={errors}
              label="Dia do passeio"
              typeInput="date"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Período da viagem: {formatDate(trip.startDate)} até {formatDate(trip.endDate)}
            </p>
          </div>

          <InputField
            name="hour"
            control={control}
            errors={errors}
            label="Horário"
            typeInput="time"
          />

          <TextAreaField
            name="description"
            control={control}
            errors={errors}
            label=" Descrição / Observações"
            placeholder="Adicione detalhes sobre o passeio, endereço, observações..."
          />

          <SelectField
            name="status"
            control={control}
            errors={errors}
            label="Status"
            options={statusOptions}
          />

          <div>
            <InputField
              name="estimatedCost"
              control={control}
              errors={errors}
              label="Custo estimado"
              placeholder="R$ 0,00"
              typeInput="number"
              opitionalText="não é gasto real"
            />
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