import { z } from "zod"

export const searchMissionsSchema = z.object({
  search: z.string().optional(),
  offset: z.number().optional(),
  limit: z.number().optional(),
})

export type SearchMissionsType = z.infer<typeof searchMissionsSchema>
