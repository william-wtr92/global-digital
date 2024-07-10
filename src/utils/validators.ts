import { z } from "zod"

export const emailValidator = z.string().email("invalidEmail")

export const stringValidator = z.string().min(1, "tooShort")

export const phoneNumberValidator = z.string().min(5, "tooShort")

export const passwordValidator = z.string().min(8, "passwordTooShort")

export const areaIdValidator = z.string().refine((val) => val !== undefined)

export const acceptValidator = z.boolean().refine((val) => val === true)
