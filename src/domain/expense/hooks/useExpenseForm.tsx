import { zodResolver } from "@hookform/resolvers/zod";
import { ExpenseSchema, ExpenseSchemaType } from "../schemas/expenseSchema";
import { useForm } from "react-hook-form";

export const useExpenseForm = (schema: typeof ExpenseSchema) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm<ExpenseSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      amount: "",
      date: "",
      participants: [],
      splitType: "equal",
      paidById: "",
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