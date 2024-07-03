import { z } from "zod"

export const MissionOperating = {
  homeWorking: "Télétravail",
  onSite: "Sur place",
  hybrid: "Hybride",
} as const

export const searchMissionsSchema = z.object({
  search: z.string().optional(),
  offset: z.number().optional(),
  limit: z.number().optional(),
})

export const missionSchema = z
  .object({
    title: z.string().min(1),
    startDate: z.date().min(new Date()),
    endDate: z.date(),
    description: z.string().min(1).max(500),
    operating: z.nativeEnum(MissionOperating),
    localisation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.endDate <= data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
      })
    }
  })

export type SearchMissionsType = z.infer<typeof searchMissionsSchema>
export type MissionType = z.infer<typeof missionSchema>