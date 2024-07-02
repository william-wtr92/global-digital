import { z } from "zod"

import { db } from "@/db/client"
import { company } from "@/db/schema"

const companyCreateValidator = z.object({
  businessName: z.string().min(1),
  description: z.string().min(1),
  areaId: z.string().uuid(),
  headQuarter: z.string().min(1),
  kbisUrl: z.string().url(),
})

export const POST = async (req: Request) => {
  try {
    const body = await companyCreateValidator.parseAsync(await req.json())

    await db.insert(company).values(body)

    return Response.json({}, { status: 201 })
  } catch (err) {
    return Response.json({ error: "An unexpected error" }, { status: 500 })
  }
}
