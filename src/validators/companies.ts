import { z } from "zod"

import type { InsertCompany } from "@/db/schema"

export const companiesCreateValidator = z.object<Omit<InsertCompany, "id">>({
  address: z.string().min(1),
  businessName: z.string().min(1),
  logo: z.string(),
  headquarters: z.string().min(1),
  kbis: z.string(),
  descriptionCompany: z.string().min(1),
  accept: z.string(),
})

export type CompaniesCreateValidatorType = z.infer<
  typeof companiesCreateValidator
>
