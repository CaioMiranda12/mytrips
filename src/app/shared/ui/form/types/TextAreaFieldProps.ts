import { IRHFProps } from "./types";
import { LucideIcon } from "lucide-react";
import { InputColorVariant } from "../styles/inputVariants";

export interface TextAreaFieldProps extends IRHFProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  Icon?: LucideIcon;
  color?: InputColorVariant;
}
