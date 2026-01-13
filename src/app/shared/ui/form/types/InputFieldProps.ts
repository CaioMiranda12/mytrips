import { Control, FieldErrors } from "react-hook-form";
import { ComponentType } from "react";
import { IRHFProps } from "./types";
import { LucideIcon } from "lucide-react";
import { InputColorVariant } from "../styles/inputVariants";

export interface InputFieldProps extends IRHFProps {
  // name: string;
  // control: Control<any>;
  // errors: FieldErrors<any>;
  label: string;
  required?: boolean;
  placeholder?: string;
  typeInput?: "text" | "email" | "password" | "number" | "date";
  Icon?: LucideIcon;
  color?: InputColorVariant;
}
