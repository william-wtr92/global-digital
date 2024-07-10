"use client"

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { type HTMLInputTypeAttribute, useState } from "react"
import type { FieldValues } from "react-hook-form"

import {
  CustomFormField,
  type BaseCustomFormFieldProps,
} from "@/components/forms/CustomFormField"
import { Input } from "@/components/ui/input"

type CustomFormInputProps<T extends FieldValues> =
  BaseCustomFormFieldProps<T> & {
    type?: HTMLInputTypeAttribute
    placeholder?: string
  }

export const CustomFormInput = <T extends FieldValues>({
  placeholder,
  type,
  ...baseProps
}: CustomFormInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <CustomFormField {...baseProps}>
      {(field) => (
        <div className="relative">
          <Input
            type={
              type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            placeholder={placeholder}
            {...field}
          />
          {type === "password" && (
            <div onClick={handleShowPassword}>
              {showPassword ? (
                <EyeSlashIcon className="absolute right-2 top-1/4 h-5 w-4 hover:cursor-pointer" />
              ) : (
                <EyeIcon className="absolute right-2 top-1/4 h-5 w-4 hover:cursor-pointer" />
              )}
            </div>
          )}
        </div>
      )}
    </CustomFormField>
  )
}
