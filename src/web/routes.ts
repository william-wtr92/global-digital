const routes = {
  home: "/",
  registration: "/registration",
  freelance: {
    createProfile: "/freelance/create-profile",
  },
  api: {
    areas: {
      index: "/areas",
    },
    freelance: {
      createAccount: "/freelance/create-account",
    },
    companies: {
      create: "/companies/create",
    },
  },
} as const

export type Routes = typeof routes

export default routes
