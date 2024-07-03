import { z } from "zod"

import type { ReadonlyArrayZod } from "@/utils/types"

export const companiesCreateFormValidator = (areas: ReadonlyArrayZod) =>
  z.object({
    address: z.string().min(1),
    businessName: z.string().min(1),
    logo: z.string().url(),
    headquarters: z.string().min(1),
    areaId: z.enum(areas),
    kbis: z.string().url(),
    descriptionCompany: z.string().min(1),
    accept: z.boolean(),
  })

export type CompaniesCreateValidatorType = z.infer<
  ReturnType<typeof companiesCreateFormValidator>
>
