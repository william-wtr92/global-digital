const routes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  freelanceCreateProfile: "/freelance/create-profile",
  search: "/search",
  api: {
    auth: {
      user: "/auth",
      login: "/auth/login",
      logout: "/auth/logout",
    },
    missions: {
      list: "/missions",
    },
    createAccount: "/freelance/create-account",
    areas: "/areas",
  },
} as const

export default routes
