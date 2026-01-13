import { Controller } from "react-hook-form";
import { SelectFieldProps } from "./types/SelectFieldProps";
import { FieldWrapper } from "./FieldWrapper";
import clsx from "clsx";
import { inputVariants } from "./styles/inputVariants";


export function SelectField({
  name,
  control,
  errors,
  label,
  required,
  options,
  color
}: SelectFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FieldWrapper
          label={label}
          required={required}
          error={errors?.[name]?.message as string}
        >
          <select
            {...field}
            className={clsx(
              "w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 transition-all",
              inputVariants[color ?? 'default']
            )}
          >
            <option value="">Selecione...</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FieldWrapper>
      )}
    />
  );
}
