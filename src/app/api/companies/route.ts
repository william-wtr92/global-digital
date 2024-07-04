import { db } from "@/db/client"
import { company } from "@/db/schema"
import {
  companiesCreateFormValidator,
  companyCreateValidator,
} from "@/features/companies/utils/validators/companies"
import type { ReadonlyArrayZod } from "@/types/utils"
import { SC } from "@/utils/constants/status"

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

    return Response.json(data, { status: SC.success.CREATED })
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
