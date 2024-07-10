import { z } from "zod"

import type { ReadonlyArrayZod } from "@/types/utils"

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

export const companyCreateValidator = z.object({
  businessName: z.string().min(1),
  description: z.string().min(1),
  areaId: z.string().uuid(),
  logo: z.string().url(),
  headQuarter: z.string().min(1),
  kbisUrl: z.string().url(),
})

export const companiesUpdateFormValidator = (areas: ReadonlyArrayZod) =>
  z.object({
    address: z.string().min(1).optional(),
    businessName: z.string().min(1).optional(),
    logo: z.string().url().optional(),
    headquarters: z.string().min(1).optional(),
    areaId: z.enum(areas).optional(),
    kbis: z.string().url().optional(),
    descriptionCompany: z.string().min(1).optional(),
  })

export type CompaniesUpdateValidatorType = z.infer<
  ReturnType<typeof companiesUpdateFormValidator>
>

export const companyUpdateValidator = z.object({
  businessName: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  areaId: z.string().uuid().optional(),
  logo: z.string().url().optional(),
  headQuarter: z.string().min(1).optional(),
  kbisUrl: z.string().url().optional(),
})
