import { Control, FieldErrors } from "react-hook-form";
import { InputColorVariant } from "../styles/inputVariants";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  label: string;
  required?: boolean;
  options: SelectOption[];
  color?: InputColorVariant;
}
