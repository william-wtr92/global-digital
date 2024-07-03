const routes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  companies: {
    "create": "/companies/create",
    ":id": (id: string) => `/companies/${id}`,
  },
  missions: {
    search: "/missions/search",
    detailedMission: (id: string) => `/missions?id=${id}`,
    updateMission: (missionId: string) => `/missions/update?id=${missionId}`,
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
      create: "/missions",
      list: "/missions",
      detailedMission: (missionId: string) => `/missions/${missionId}`,
      updateMission: (missionId: string) => `/missions/${missionId}`,
    },
  },
} as const

export type Routes = typeof routes

export default routes
