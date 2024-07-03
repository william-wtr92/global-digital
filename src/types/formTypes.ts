import { z } from "zod"

export const SignupFormSchema = z.object({
  firstName: z.string().min(1, "tooShort"),
  lastName: z.string().min(1, "tooShort"),
  email: z.string().email("invalidEmail"),
  phoneNumber: z.string().min(5, "tooShort"),
})

export type SignupType = z.infer<typeof SignupFormSchema>

export const MoreAboutFreelanceSchema = z.object({
  jobTitle: z.string().min(1, "tooShort"),
  businessName: z.string().min(1, "tooShort"),
  areaId: z.string().refine((val) => val !== undefined),
  localisation: z.string().min(1, "tooShort"),
  registrationNumber: z.string().min(1, "tooShort"),
  termOfUse: z.boolean().refine((val) => val === true),
})

export type MoreAboutFreelanceType = z.infer<typeof MoreAboutFreelanceSchema>

export const PasswordSchema = z.object({
  password: z.string().min(8, "passwordTooShort"),
  confirmPassword: z.string().min(8, "passwordTooShort"),
})

export type PasswordType = z.infer<typeof PasswordSchema>

export const UpdateAccountFreelanceSchema = z.object({
  lastName: z.string().min(1, "tooShort"),
  firstName: z.string().min(1, "tooShort"),
  email: z.string().email("invalidEmail"),
  phoneNumber: z.string().min(5, "tooShort"),
  jobTitle: z.string().min(1, "tooShort"),
  businessName: z.string().min(1, "tooShort"),
  areaId: z.string().refine((val) => val !== undefined),
  localisation: z.string().min(1, "tooShort"),
  registrationNumber: z.string().min(1, "tooShort"),
})

export type UpdateAccountFreelanceType = z.infer<
  typeof UpdateAccountFreelanceSchema
>
