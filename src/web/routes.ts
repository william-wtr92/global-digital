const routes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  freelance: {
    createProfile: "/freelance/create-profile",
  },
  api: {
    auth: {
      user: "/auth",
      login: "/auth/login",
      logout: "/auth/logout",
    },
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
