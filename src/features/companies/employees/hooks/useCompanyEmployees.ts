"use client"

import type { User } from "@/features/account/types/user"
import type { Employee } from "@/features/companies/employees/types/employee"
import type { EmployeeRole } from "@/features/companies/employees/types/employeeRole"
import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

import type { Role } from "@/features/companies/employees/types/role"

export type EmployeeResponse = {
  Role: Role
  Employee: Employee
  Employee_role: EmployeeRole
  Users: User
}[]

export const useCompanyEmployees = (id: string) =>
  useQuery<EmployeeResponse>(routes.api.companies.employees(id))
