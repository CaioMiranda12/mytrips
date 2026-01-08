import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TripSchema, TripSchemaType } from "../schemas/tripSchema";

export const useTripForm = (schema: typeof TripSchema) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<TripSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
    }
  });

  return {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    errors,
    clearErrors
  };
}