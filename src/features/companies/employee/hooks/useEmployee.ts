"use client"

import type { User } from "@/features/account/types/user"
import type { Employee } from "@/features/companies/employee/types/employee"
import type { EmployeeRole } from "@/features/companies/employee/types/employeeRole"
import type { Role } from "@/features/companies/employee/types/role"
import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

export type EmployeeResponse = {
  result: boolean
  employees: {
    Role: Role
    Employee: Employee
    Employee_role: EmployeeRole
    Users: User
  }[]
}
export const useEmployees = (id: string) =>
  useQuery<EmployeeResponse>(routes.api.companies.employees(id))
