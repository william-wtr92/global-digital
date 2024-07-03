const routes = {
  home: "/",
  login: "/login",
  api: {
    auth: {
      user: "/auth",
      login: "/auth/login",
      logout: "/auth/logout",
    },
  },
} as const

export default routes
