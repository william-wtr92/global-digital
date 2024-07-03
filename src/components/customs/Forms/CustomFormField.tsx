"use client"

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import type { FieldValues, Path, UseFormReturn } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type CustomFormFieldProps<T extends FieldValues> = {
  name: Path<T>
  form: UseFormReturn<T>
  label?: string
  description?: string
  placeholder?: string
  passwordField?: boolean
}

const CustomFormField = <T extends FieldValues>({
  name,
  form,
  label,
  description,
  placeholder,
  passwordField,
}: CustomFormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-screen max-w-96 px-4">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={
                  passwordField ? (showPassword ? "text" : "password") : "text"
                }
                placeholder={placeholder}
                {...field}
              />
              {passwordField && (
                <div onClick={handleShowPassword}>
                  {showPassword ? (
                    <EyeSlashIcon className="absolute right-2 top-1/4 h-5 w-4 hover:cursor-pointer" />
                  ) : (
                    <EyeIcon className="absolute right-2 top-1/4 h-5 w-4 hover:cursor-pointer" />
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
