import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email("invalidEmail"),
  password: z.string().min(8, "passwordInvalid"),
})

export type LoginType = z.infer<typeof LoginSchema>
