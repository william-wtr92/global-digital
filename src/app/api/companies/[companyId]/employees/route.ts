import { eq } from "drizzle-orm"
import type { NextRequest } from "next/server"

import { db } from "@/db/client"
import { employee, employeeRole, role, users } from "@/db/schema"
import { SC } from "@/utils/constants/status"

export const GET = async (
  req: NextRequest,
  { params: { companyId } }: { params: { companyId: string } },
) => {
  try {
    const employees = await db
      .select()
      .from(employee)
      .where(eq(employee.companyId, companyId))
      .leftJoin(employeeRole, eq(employeeRole.employeeId, employee.id))
      .leftJoin(role, eq(role.id, employeeRole.roleId))
      .leftJoin(users, eq(users.id, employee.userId))

    return Response.json({ result: true, employees }, { status: SC.success.OK })
  } catch (e) {
    return Response.json(
      { isError: true, message: "anErrorOccurred" },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}

export const POST = async (
  req: Request,
  { params: { companyId } }: { params: { companyId: string } },
) => {
  const { userId } = await req.json()

  try {
    const newEmployee = await db
      .insert(employee)
      .values({ companyId, userId })
      .returning()

    const ownerRole = await db
      .select()
      .from(role)
      .where(eq(role.value, "owner"))

    await db.insert(employeeRole).values({
      companyId,
      employeeId: newEmployee[0].id,
      roleId: ownerRole[0].id,
    })

    return Response.json({ result: true }, { status: SC.success.OK })
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
