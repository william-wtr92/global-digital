import type { User } from "@/types/user"

export const getFullNameLowerCase = (firstName: string, lastName: string) =>
  `${firstName}${lastName}`
    .toLocaleLowerCase()
    .split(" ")
    .join("")
    .split(".")
    .join("")

export const getFullName = (user: User) => `${user.firstName} ${user.lastName}`
