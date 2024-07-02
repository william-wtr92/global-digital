import { db } from "@/db/client"
import { company } from "@/db/schema"
import { companiesCreateValidator } from "@/validators/companies"

export const POST = async (request: Request) => {
  const body = await companiesCreateValidator.parseAsync(await request.json())

  const companyResult = await db.insert(company).values({})

  return Response.json(companyResult.fields)
}
