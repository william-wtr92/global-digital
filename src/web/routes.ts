const routes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  freelance: {
    createProfile: "/freelance/create-profile",
    updateProfile: (name: string, id: string) =>
      `/freelance/update-profile/${name}?id=${id}`,
  },
  profile: (name: string, id: string) => `/freelance/profile/${name}?id=${id}`,
  api: {
    auth: {
      user: "/auth",
      login: "/auth/login",
      logout: "/auth/logout",
      register: { freelance: "/auth/register/freelance" },
    },
    areas: {
      index: "/areas",
    },
    freelance: {
      createAccount: "/freelance/create-account",
      getProfile: (userId: string) => `/freelance/${userId}`,
    },
    companies: {
      create: "/companies/create",
    },
    createAccount: "/freelance/create-account",
    updateAccount: (userId: string) => `/freelance/${userId}/account`,
  },
} as const

export type Routes = typeof routes

export default routes
