"use client"

import { useQuery } from "@tanstack/react-query"

import type { User } from "@/features/account/types/user"
import type { Employee } from "@/features/companies/employee/types/employee"
import type { EmployeeRole } from "@/features/companies/employee/types/employeeRole"
import type { Role } from "@/features/companies/employee/types/role"
import { apiFetch } from "@/lib/api"
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

const fetchEmployees = async (id: string) => {
  const response = await apiFetch<EmployeeResponse>({
    url: routes.api.companies.employees(id),
  })

  return response.data
}

export const useEmployees = (id: string) => {
  const { ...query } = useQuery<EmployeeResponse>({
    queryKey: ["employees", id],
    queryFn: () => fetchEmployees(id),
  })

  return query
}
