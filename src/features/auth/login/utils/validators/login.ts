import { z } from "zod"

import { emailValidator, passwordValidator } from "@/utils/validators"

export const loginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
})

export type LoginType = z.infer<typeof loginSchema>
