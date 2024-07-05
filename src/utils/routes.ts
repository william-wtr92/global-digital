const routes = {
  home: "/",
  login: "/login",
  register: {
    index: "/register",
    freelance: "/register/freelance",
    recruiter: "/register/recruiter",
  },
  companies: {
    "create": "/companies/create",
    ":id": {
      index: (id: string) => `/companies/${id}`,
      habilitations: (id: string) => `/companies/${id}/habilitations`,
    },
  },
  missions: {
    search: "/missions/search",
    detailedMission: (id: string) => `/missions/${id}`,
    updateMission: (missionId: string) => `/missions/${missionId}/update`,
    confirmPayment: (missionId: string, userId: string) =>
      `/missions/${missionId}/confirm-payment?id=${userId}`,
  },
  freelance: {
    updateProfile: (name: string, id: string) =>
      `/freelance/${name}/update?id=${id}`,
    profile: (name: string, id: string) => `/freelance/${name}?id=${id}`,
  },
  search: "/search",
  api: {
    home: "/home",
    auth: {
      user: "/auth",
      login: "/auth/login",
      logout: "/auth/logout",
      register: "/auth/register",
    },
    missions: {
      create: "/missions",
      list: "/missions",
      detailedMission: (missionId: string) => `/missions/${missionId}`,
      updateMission: (missionId: string) => `/missions/${missionId}`,
      payment: (missionId: string) => `/missions/${missionId}/payment`,
      candidate: {
        isCandidate: (missionId: string) => `/missions/${missionId}/candidate`,
        send: (missionId: string) => `/missions/${missionId}/candidate`,
        delete: (missionId: string) => `/missions/${missionId}/candidate`,
        list: (missionId: string) => `/missions/${missionId}/candidate/list`,
        deleteByEmployee: (missionId: string, candidateId: string) =>
          `/missions/${missionId}/candidate/list/${candidateId}`,
        acceptedByEmployee: (missionId: string, candidateId: string) =>
          `/missions/${missionId}/candidate/list/${candidateId}`,
      },
    },
    areas: {
      "index": "/areas",
      ":id": (id: string) => `/areas/${id}`,
    },
    roles: {
      index: "/roles",
    },
    createAccount: "/create-account",
    getProfile: (userId: string) => `/users/${userId}`,
    updateAccount: (userId: string) => `/users/${userId}/account`,
    deleteAccount: (userId: string) => `/users/${userId}/account`,
    companies: {
      "index": "/companies",
      ":id": {
        index: (id: string) => `/companies/${id}`,
        missions: (id: string) => `/companies/${id}/missions`,
      },
      "employees": (id: string) => `/companies/${id}/employees`,
      "updateHabilitation": (id: string, employeeId: string) =>
        `/companies/${id}/employees/${employeeId}/habilitations`,
      "deleteEmployee": (id: string, employeeId: string) =>
        `/companies/${id}/employees/${employeeId}`,
      "addEmployee": (id: string) => `/companies/${id}/employees`,
    },
    users: {
      search: "/users/search",
    },
  },
} as const

export type Routes = typeof routes

export default routes
