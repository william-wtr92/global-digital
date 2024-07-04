import type { User } from "@/features/account/types/user"
import type { Area } from "@/features/areas/types/area"
import type { Freelance } from "@/features/freelance/types/freelance"

export type ApiProfile = {
  Users: User
  Freelance: Freelance
  Area: Area
  isError: boolean
  message: string
}
