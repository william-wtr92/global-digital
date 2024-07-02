const routes = {
  home: "/",
  api: {
    areas: {
      index: "/api/areas",
    },
    companies: {
      create: "/api/companies/create",
    },
  },
} as const

export type Routes = typeof routes

export default routes
