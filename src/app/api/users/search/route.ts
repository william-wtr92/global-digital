import { and, eq, ilike, notInArray, or } from "drizzle-orm"

import { db } from "@/db/client"
import { employee, users } from "@/db/schema"
import { SC } from "@/utils/constants/status"

export const POST = async (req: Request) => {
  const { searchText, id } = await req.json()

  if (!searchText) {
    return Response.json([], { status: SC.success.OK })
  }

  try {
    const employeeUserIds = await db
      .select()
      .from(employee)
      .where(eq(employee.companyId, id))

    const userIds = employeeUserIds.map((emp) => emp.userId)

    const isLikeCondition = or(
      ilike(users.firstName, `%${searchText}%`),
      ilike(users.lastName, `%${searchText}%`),
    )

    const conditons =
      userIds.length > 0
        ? and(isLikeCondition, notInArray(users.id, userIds))
        : or(isLikeCondition)

    const contains = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(users)
      .where(conditons)

    return Response.json(contains, { status: SC.success.OK })
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
