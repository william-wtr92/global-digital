import type { Area } from "../area"
import type { Freelance } from "../freelance"
import type { User } from "../user"

export type ProfileApi = {
  Users: User
  Freelance: Freelance
  Area: Area
  isError: boolean
  message: string
}
