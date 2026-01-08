'use client'

import { Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { IIPasswordInputProps } from "./types/passwordInput";


export function PasswordInput({
  name,
  control,
  errors,
  nameInput,
  nameLabelInput,
  namePlaceholderInput,
  Icon
}: IIPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
              placeholder={namePlaceholderInput}
              type={showPassword ? 'text' : 'password'}
              className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
          <ErrorMessage message={errors?.[name]?.message} />
        </div>
      )}
    />
  )
}