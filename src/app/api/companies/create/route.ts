import { z } from "zod"

import { db } from "@/db/client"
import { company } from "@/db/schema"
import type { ReadonlyArrayZod } from "@/utils/types"
import { companiesCreateFormValidator } from "@/validators/companies"

const companyCreateValidator = z.object({
  businessName: z.string().min(1),
  description: z.string().min(1),
  areaId: z.string().uuid(),
  logo: z.string().url(),
  headQuarter: z.string().min(1),
  kbisUrl: z.string().url(),
})

export const POST = async (req: Request) => {
  try {
    const areas = await db.query.area.findMany()
    const body = await companiesCreateFormValidator(
      areas.map((area) => area.value) as unknown as ReadonlyArrayZod,
    ).parseAsync(await req.json())

    const data = await companyCreateValidator.parseAsync({
      businessName: body.businessName,
      description: body.descriptionCompany,
      areaId: body.areaId,
      headQuarter: body.headquarters,
      kbisUrl: body.kibs,
    })

    await db.insert(company).values(data)

    return Response.json({}, { status: 201 })
  } catch (err) {
    return Response.json({ error: "An unexpected error" }, { status: 500 })
  }
}
