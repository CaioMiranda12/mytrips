'use client'

import { InputField } from "@/app/shared/ui/form/InputField"
import { Calendar, MapPin } from "lucide-react"
import { useState } from "react"
import { useTripForm } from "../hooks/useTripForm"
import { TripSchema, TripSchemaType } from "../schemas/tripSchema"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useCreateTrip } from "../hooks/useCreateTrip"

export function CreateTripForm() {
  const router = useRouter()

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

  const { createTrip } = useCreateTrip()

  const onSubmit = async (formData: TripSchemaType) => {
    try {
      const trip = await createTrip({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
      })
      toast.success('Viagem criada com sucesso!')
      router.push(`/trip/${trip.id}`)
    } catch (error) {
      console.log(error)
      toast.error('Erro ao criar a viagem. Tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100" noValidate>
      <div className="space-y-6">
        <InputField
          name="title"
          control={control}
          errors={errors}
          label="Nome da viagem"
          placeholder="Ex: Viagem para Gramado"
          typeInput="text"
          Icon={MapPin}
          required
        />

        <InputField
          name="location"
          control={control}
          errors={errors}
          label="Localização da viagem"
          placeholder="Ex: Fortaleza, CE"
          typeInput="text"
          Icon={MapPin}
          required
        />

        <InputField
          name="description"
          control={control}
          errors={errors}
          label="Descrição da viagem"
          placeholder="Conte mais sobre sua viagem"
          typeInput="text"
          Icon={MapPin}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            name="startDate"
            control={control}
            errors={errors}
            label="Data de início"
            placeholder="Selecione a data de início"
            typeInput="date"
            Icon={Calendar}
            required
          />

          <InputField
            name="endDate"
            control={control}
            errors={errors}
            label="Data de término"
            placeholder="Selecione a data de término"
            typeInput="date"
            Icon={Calendar}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!tripName || !startDate || !endDate}
          className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Criar viagem
        </button>
      </div>
    </form>
  )
}