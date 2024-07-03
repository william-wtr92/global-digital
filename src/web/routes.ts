const routes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  companies: {
    "create": "/companies/create",
    ":id": (id: string) => `/companies/${id}`,
  },
  freelance: {
    createProfile: "/freelance/create-profile",
  },
  search: "/search",
  api: {
    auth: {
      user: "/auth",
      login: "/auth/login",
      logout: "/auth/logout",
    },
    areas: {
      "index": "/areas",
      ":id": (id: string) => `/areas/${id}`,
    },
    freelance: {
      createAccount: "/freelance/create-account",
    },
    companies: {
      "create": "/companies/create",
      ":id": (id: string) => `/companies/${id}`,
    },
    missions: {
      list: "/missions",
    },
    createAccount: "/freelance/create-account",
  },
} as const

export type Routes = typeof routes

export default routes
