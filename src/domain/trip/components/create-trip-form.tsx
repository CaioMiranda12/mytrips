'use client'

import { Input } from "@/app/shared/ui/form/input"
import { Calendar, MapPin } from "lucide-react"
import { useState } from "react"
import { useTripForm } from "../hooks/useTripForm"
import { TripSchema } from "../schemas/tripSchema"

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

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const handleCreateTrip = () => {
    // if (tripName && startDate && endDate) {
    //   // Simular criação e redirecionar para a viagem
    //   router.push('/trip/1')
    // }
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
          onClick={handleCreateTrip}
          disabled={!tripName || !description || !startDate || !endDate}
          className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Criar viagem
        </button>
      </div>
    </form>
  )
}