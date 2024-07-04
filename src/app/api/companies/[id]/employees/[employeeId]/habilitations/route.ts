import { and, eq } from "drizzle-orm"

import { db } from "@/db/client"
import { employeeRole } from "@/db/schema"
import { SC } from "@/def/status"

export const PATCH = async (
  req: Request,
  {
    params: { id, employeeId },
  }: { params: { id: string; employeeId: string } },
) => {
  const { roleId } = await req.json()

  try {
    await db
      .update(employeeRole)
      .set({ roleId })
      .where(
        and(
          eq(employeeRole.employeeId, employeeId),
          eq(employeeRole.companyId, id),
        ),
      )

    return Response.json({ result: true }, { status: SC.success.OK })
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
