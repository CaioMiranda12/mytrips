'use client'

import { Input } from "@/app/shared/ui/form/input"
import { Calendar, MapPin } from "lucide-react"
import { useState } from "react"
import { useTripForm } from "../hooks/useTripForm"
import { TripSchema, TripSchemaType } from "../schemas/tripSchema"
import { useTrips } from "../hooks/useTrips"
import { toast } from "react-toastify"

export function CreateTripForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    errors,
    clearErrors
  } = useTripForm(TripSchema)

  const tripName = watch('title')
  const description = watch('description')
  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const { createTrip } = useTrips()


  const onSubmit = async (formData: TripSchemaType) => {
    try {
      const trip = await createTrip({
        title: formData.title,
        description: formData.description,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
      })
      console.log(trip)
      toast.success('Viagem criada com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao criar a viagem. Tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100" noValidate>
      <div className="space-y-6">
        <Input
          name="title"
          control={control}
          errors={errors}
          nameInput="Nome da viagem"
          nameLabelInput="title"
          namePlaceholderInput="Ex: Viagem para Gramado"
          typeInput="text"
          Icon={MapPin}
        />

        <Input
          name="description"
          control={control}
          errors={errors}
          nameInput="Descrição da viagem"
          nameLabelInput="description"
          namePlaceholderInput="Conte mais sobre sua viagem"
          typeInput="text"
          Icon={MapPin}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            name="startDate"
            control={control}
            errors={errors}
            nameInput="Data de início"
            nameLabelInput="startDate"
            namePlaceholderInput="Selecione a data de início"
            typeInput="date"
            Icon={Calendar}
          />

          <Input
            name="endDate"
            control={control}
            errors={errors}
            nameInput="Data de término"
            nameLabelInput="endDate"
            namePlaceholderInput="Selecione a data de término"
            typeInput="date"
            Icon={Calendar}
          />
        </div>

        <button
          type="submit"
          disabled={!tripName || !description || !startDate || !endDate}
          className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Criar viagem
        </button>
      </div>
    </form>
  )
}