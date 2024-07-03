const routes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  freelanceCreateProfile: "/freelance/create-profile",
  missions: {
    search: "/missions/search",
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
    },
    createAccount: "/freelance/create-account",
    areas: "/areas",
  },
} as const

export default routes
