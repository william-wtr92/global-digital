import type { SelectUser } from "@/db/schema"

export const sanitizeUser = (
  user: SelectUser,
): Omit<SelectUser, "passwordHash" | "passwordSalt"> => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl,
    phoneNumber: user.phoneNumber,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}
