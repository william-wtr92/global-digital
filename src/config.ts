const configuration = {
  port: 3000,
  security: {
    jwt: {
      secret: process.env.SECURITY_JWT_SECRET || "secret",
      expiresIn: "2 days",
    },
  },
  api: {
    baseApiURL: "/api",
    baseURL: process.env.BASE_URL,
  },
}

export default configuration
