import { and, eq } from "drizzle-orm"

import { db } from "@/db/client"
import { employee, employeeRole } from "@/db/schema"
import { SC } from "@/utils/constants/status"

export const DELETE = async (
  req: Request,
  {
    params: { companyId, employeeId },
  }: { params: { companyId: string; employeeId: string } },
) => {
  try {
    await db.transaction(async (tx) => {
      await tx
        .delete(employeeRole)
        .where(
          and(
            eq(employeeRole.employeeId, employeeId),
            eq(employeeRole.companyId, companyId),
          ),
        )
      await tx
        .delete(employee)
        .where(
          and(eq(employee.id, employeeId), eq(employee.companyId, companyId)),
        )
    })

    return Response.json({ result: true }, { status: SC.success.OK })
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
