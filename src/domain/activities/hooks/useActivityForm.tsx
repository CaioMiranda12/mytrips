import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActivitySchema, ActivitySchemaType } from "../schemas/activitySchema";

export const useActivityForm = (schema: typeof ActivitySchema) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm<ActivitySchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      date: "",
      hour: "",
      description: "",
      amount: "",
      status: "PLANNED",
      tripId: ""
    }
  })

  return {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    errors,
    clearErrors,
    setValue
  }
}