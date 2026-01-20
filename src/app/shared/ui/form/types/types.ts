import { Control, FieldErrors } from "react-hook-form";
export interface IRHFProps {
  name: string;
  control: Control<any>;
  errors?: FieldErrors<any>;
}
