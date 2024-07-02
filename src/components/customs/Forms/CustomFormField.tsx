"use client"

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
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-96">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={passwordField ? "password" : "text"}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
