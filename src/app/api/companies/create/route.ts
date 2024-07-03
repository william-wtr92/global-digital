import { z } from "zod"

import { db } from "@/db/client"
import { company } from "@/db/schema"
import type { ReadonlyArrayZod } from "@/utils/types"
import { companiesCreateFormValidator } from "@/utils/validators/companies"

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
    const json = await req.json()
    const areas = await db.query.area.findMany()
    const body = await companiesCreateFormValidator(
      areas.map((area) => area.value) as unknown as ReadonlyArrayZod,
    ).parseAsync(json)

    const data = await companyCreateValidator.parseAsync({
      businessName: body.businessName,
      description: body.descriptionCompany,
      areaId: areas.find((area) => area.value === body.areaId)!.id,
      headQuarter: body.headquarters,
      logo: body.logo,
      kbisUrl: body.kbis,
    })

    await db.insert(company).values(data)

    return Response.json(data, { status: 201 })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
