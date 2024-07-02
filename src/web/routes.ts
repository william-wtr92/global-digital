const routes = {
  home: "/",
  api: {
    areas: {
      index: "/areas",
    },
    companies: {
      create: "/companies/create",
    },
  },
} as const

export type Routes = typeof routes

export default routes
