import { InputColorVariant } from "../styles/inputVariants";
import { IRHFProps } from "./types";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectFieldProps extends IRHFProps {
  label: string;
  required?: boolean;
  options: SelectOption[];
  color?: InputColorVariant;
}
