import { eq } from "drizzle-orm"

import { db } from "@/db/client"
import { company } from "@/db/schema"
import {
  companiesUpdateFormValidator,
  companyUpdateValidator,
} from "@/features/companies/utils/validators/companies"
import type { ReadonlyArrayZod } from "@/types/utils"
import { SC } from "@/utils/constants/status"

export const GET = async (
  req: Request,
  { params: { companyId } }: { params: { companyId: string } },
) => {
  try {
    const companyData = await db
      .select()
      .from(company)
      .where(eq(company.id, companyId))

    if (companyData.length === 0) {
      return Response.json(
        { error: "Not found" },
        { status: SC.errors.NOT_FOUND },
      )
    }

    return Response.json(companyData[0])
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}

export const PUT = async (
  req: Request,
  { params: { companyId } }: { params: { companyId: string } },
) => {
  try {
    const json = await req.json()
    const areas = await db.query.area.findMany()
    const body = await companiesUpdateFormValidator(
      areas.map((area) => area.value) as unknown as ReadonlyArrayZod,
    ).parseAsync(json)

    const data = await companyUpdateValidator.parseAsync({
      businessName: body.businessName,
      description: body.descriptionCompany,
      areaId: areas.find((area) => area.value === body.areaId)!.id,
      headQuarter: body.headquarters,
      logo: body.logo,
      kbisUrl: body.kbis,
    })

    const companyData = await db
      .update(company)
      .set(data)
      .where(eq(company.id, companyId!))
      .returning()

    return Response.json(companyData[0])
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
