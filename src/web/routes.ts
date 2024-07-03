const routes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  freelanceCreateProfile: "/freelance/create-profile",
  api: {
    auth: {
      user: "/auth",
      login: "/auth/login",
      logout: "/auth/logout",
    },
    createAccount: "/freelance/create-account",
    areas: "/areas",
  },
} as const

export default routes
