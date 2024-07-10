"use client"

import type { FieldValues } from "react-hook-form"

import {
  CustomFormField,
  type BaseCustomFormFieldProps,
} from "@/components/forms/CustomFormField"
import { Textarea } from "@/components/ui/textarea"

type CustomFormTextareaProps<T extends FieldValues> =
  BaseCustomFormFieldProps<T> & { placeholder?: string }

export const CustomFormTextarea = <T extends FieldValues>({
  placeholder,
  ...baseProps
}: CustomFormTextareaProps<T>) => {
  return (
    <CustomFormField {...baseProps}>
      {(field) => (
        <div className="relative">
          <Textarea placeholder={placeholder} {...field} />
        </div>
      )}
    </CustomFormField>
  )
}
