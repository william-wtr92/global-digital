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
      getProfile: (userId: string) => `/freelance/${userId}`,
      updateAccount: (userId: string) => `/freelance/${userId}/account`,
      deleteAccount: (userId: string) => `/freelance/${userId}/account`,
    },
    companies: {
      create: "/companies/create",
    },
  },
} as const

export type Routes = typeof routes

export default routes
