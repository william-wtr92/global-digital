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
    missions: {
      create: "/missions",
      list: "/missions",
      detailedMission: (missionId: string) => `/missions/${missionId}`,
      updateMission: (missionId: string) => `/missions/${missionId}`,
      candidate: {
        isCandidate: (missionId: string) => `/missions/${missionId}/candidate`,
        send: (missionId: string) => `/missions/${missionId}/candidate`,
        delete: (missionId: string) => `/missions/${missionId}/candidate`,
        list: (missionId: string) => `/missions/${missionId}/candidate/list`,
        deleteByEmployee: (missionId: string, candidateId: string) =>
          `/missions/${missionId}/candidate/list/${candidateId}`,
      },
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
