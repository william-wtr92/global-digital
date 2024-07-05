import type { ReactNode } from "react"
import type {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export type BaseCustomFormFieldProps<T extends FieldValues> = {
  name: Path<T>
  form: UseFormReturn<T>
  label?: string
  description?: string
}

type CustomFormFieldProps<T extends FieldValues> =
  BaseCustomFormFieldProps<T> & {
    children: (field: ControllerRenderProps<T, Path<T>>) => ReactNode
  }

export const CustomFormField = <T extends FieldValues>({
  name,
  form,
  label,
  description,
  children,
}: CustomFormFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-screen max-w-96 px-4">
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
