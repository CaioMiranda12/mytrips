import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "../schemas/loginSchema";


export const useLoginForm = (schema: typeof LoginSchema) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
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