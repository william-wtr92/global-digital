"use client"

import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import type { Employee } from "@/types/employee"
import type { EmployeeRole } from "@/types/employeeRole"
import type { Role } from "@/types/role"
import type { User } from "@/types/user"
import routes from "@/web/routes"

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
