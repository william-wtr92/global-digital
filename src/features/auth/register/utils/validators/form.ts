import { z } from "zod"

import {
  acceptValidator,
  areaIdValidator,
  emailValidator,
  passwordValidator,
  phoneNumberValidator,
  stringValidator,
} from "@/utils/validators"

export const signupFormSchema = z.object({
  firstName: stringValidator,
  lastName: stringValidator,
  email: emailValidator,
  phoneNumber: phoneNumberValidator,
})

export type SignupType = z.infer<typeof signupFormSchema>

export const moreAboutFreelanceSchema = z.object({
  jobTitle: stringValidator,
  businessName: stringValidator,
  areaId: areaIdValidator,
  localisation: stringValidator,
  registrationNumber: stringValidator,
  termOfUse: acceptValidator,
})

export type MoreAboutFreelanceType = z.infer<typeof moreAboutFreelanceSchema>

export const passwordSchema = z.object({
  password: passwordValidator,
  confirmPassword: passwordValidator,
})

export type PasswordType = z.infer<typeof passwordSchema>

export const updateAccountFreelanceSchema = z.object({
  lastName: stringValidator,
  firstName: stringValidator,
  email: emailValidator,
  phoneNumber: phoneNumberValidator,
  jobTitle: stringValidator,
  businessName: stringValidator,
  areaId: areaIdValidator,
  localisation: stringValidator,
  registrationNumber: stringValidator,
})

export type UpdateAccountFreelanceType = z.infer<
  typeof updateAccountFreelanceSchema
>

export const updateAccountUserSchema = z.object({
  lastName: z.string().min(1, "tooShort"),
  firstName: z.string().min(1, "tooShort"),
  email: z.string().email("invalidEmail"),
  phoneNumber: z.string().min(5, "tooShort"),
})

export type UpdateAccountUserType = z.infer<typeof updateAccountUserSchema>
