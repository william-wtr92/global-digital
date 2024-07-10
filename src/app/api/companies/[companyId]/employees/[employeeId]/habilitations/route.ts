import { and, eq } from "drizzle-orm"

import { db } from "@/db/client"
import { employeeRole } from "@/db/schema"
import { SC } from "@/utils/constants/status"

export const PATCH = async (
  req: Request,
  {
    params: { companyId, employeeId },
  }: { params: { companyId: string; employeeId: string } },
) => {
  const { roleId } = await req.json()

  try {
    await db
      .update(employeeRole)
      .set({ roleId })
      .where(
        and(
          eq(employeeRole.employeeId, employeeId),
          eq(employeeRole.companyId, companyId),
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
