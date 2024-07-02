const routes = {
  home: "/",
  api: {
    companies: {
      create: "/api/companies/create",
    },
  },
} as const

export type Routes = typeof routes

export default routes
