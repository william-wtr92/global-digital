import { z } from "zod"

export const MissionOperating = {
  homeWorking: "remote",
  onSite: "site",
  hybrid: "hybrid",
} as const

export const MissionStatus = {
  pending: "pending",
  inProgress: "in progress",
  completed: "completed",
} as const

export const MissionOperatingEnum = z.nativeEnum(MissionOperating)

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
    operating: MissionOperatingEnum,
    localisation: z.string().optional(),
    price: z.number().multipleOf(0.01),
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
export type MissionOperatingType =
  (typeof MissionOperating)[keyof typeof MissionOperating]
