import { Controller } from "react-hook-form";
import { InputFieldProps } from "./types/InputFieldProps";
import { FieldWrapper } from "./FieldWrapper";
import clsx from "clsx";
import { inputVariants } from "./styles/inputVariants";


export function TextAreaField({
  name,
  control,
  errors,
  label,
  required,
  typeInput = "text",
  placeholder,
  Icon,
  color
}: InputFieldProps) {
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
          <div className="relative">
            {Icon && (
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            )}

            <textarea
              {...field}
              placeholder={placeholder}
              rows={3}
              className={clsx(
                "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none outline-none",
                Icon ? "pl-11" : "pl-4",
                inputVariants[color ?? 'default']
              )}
            />
          </div>
        </FieldWrapper>
      )}
    />
  );
}
