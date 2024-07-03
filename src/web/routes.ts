const routes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  freelanceCreateProfile: "/freelance/create-profile",
  missions: {
    search: "/missions/search",
    detailedMission: (id: string) => `/missions?id=${id}`,
    updateMission: (missionId: string) => `/missions/update?id=${missionId}`,
  },
  api: {
    auth: {
      user: "/auth",
      login: "/auth/login",
      logout: "/auth/logout",
    },
    missions: {
      create: "/missions",
      list: "/missions",
      detailedMission: (missionId: string) => `/missions/${missionId}`,
      updateMission: (missionId: string) => `/missions/${missionId}`,
    },
    createAccount: "/freelance/create-account",
    areas: "/areas",
  },
} as const

export default routes
