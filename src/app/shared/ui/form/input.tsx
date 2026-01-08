import { Controller } from "react-hook-form";
import { IInputProps } from "./types/input";
import ErrorMessage from "./ErrorMessage";
import { User } from "lucide-react";


export function Input({
  name,
  control,
  errors,
  nameInput,
  nameLabelInput,
  namePlaceholderInput,
  typeInput,
  Icon
}: IInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <label htmlFor={nameLabelInput} className="block text-sm font-medium text-gray-700 mb-2">
            {nameInput}
          </label>
          <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              {...field}
              id={nameLabelInput}
              name={nameLabelInput}
              type={typeInput}
              placeholder={namePlaceholderInput}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <ErrorMessage message={errors?.[name]?.message} />
        </div>
      )}
    />
  )
}