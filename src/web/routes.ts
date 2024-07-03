const routes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  freelanceCreateProfile: "/freelance/create-profile",
  freelanceUpdateProfile: (name: string, id: string) =>
    `/freelance/update-profile/${name}?id=${id}`,
  profile: (name: string, id: string) => `/freelance/${name}?id=${id}`,
  api: {
    auth: {
      user: "/auth",
      login: "/auth/login",
      logout: "/auth/logout",
    },
    createAccount: "/freelance/create-account",
    updateAccount: (userId: string) => `/freelance/${userId}/account`,
    areas: "/areas",
    freelance: {
      getProfile: (userId: string | null) => `/freelance/${userId}`,
    },
  },
} as const

export default routes
