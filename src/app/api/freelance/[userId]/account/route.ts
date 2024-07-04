import { eq, inArray } from "drizzle-orm"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

import { db } from "@/db/client"
import { employee, employeeRole, freelance, users } from "@/db/schema"
import { SC } from "@/def/status"

export const PATCH = async (
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } },
) => {
  const body = await req.json()

  try {
    await db.update(users).set(body).where(eq(users.id, userId))

    await db.update(freelance).set(body).where(eq(freelance.userId, userId))

    return Response.json({ result: true }, { status: SC.success.OK })
  } catch (e) {
    return Response.json(
      { error: e },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}

export const DELETE = async (
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } },
) => {
  try {
    const employees = db
      .select({ employeeId: employee.id })
      .from(employee)
      .where(eq(employee.userId, userId))

    await db
      .delete(employeeRole)
      .where(inArray(employeeRole.employeeId, employees))
    await db.delete(freelance).where(eq(freelance.userId, userId))
    await db.delete(employee).where(eq(employee.userId, userId))
    await db.delete(users).where(eq(users.id, userId))

    cookies().delete("Authorization")

    return Response.json({ result: true }, { status: SC.success.OK })
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
