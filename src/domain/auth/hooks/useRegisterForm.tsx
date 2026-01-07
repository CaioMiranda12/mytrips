import { useForm } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";


export const useRegisterForm = (schema: typeof RegisterSchema) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { errors }
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  return {
    register,
    handleSubmit,
    control,
    reset,
    errors,
    clearErrors
  };
}