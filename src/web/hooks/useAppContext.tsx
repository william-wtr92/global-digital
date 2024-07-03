"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import { parseSession } from "@/utils/parseJwt"

type AppContextType = {
  userInfo: { id: string; firstName: string; lastName: string }
}

const AppContextProvider = (props: {
  sessionUserInfo: { id: string; firstName: string; lastName: string }
  children: React.ReactNode
}) => {
  const [userInfo, setUserInfo] = useState(props.sessionUserInfo)
  const [cookies, , removeCookie] = useCookies(["Authorization"])

  useEffect(() => {
    const jwt: string = cookies.Authorization as string

    if (jwt) {
      try {
        const newSession = parseSession(jwt)
        setUserInfo(newSession.user)
      } catch (e) {
        setUserInfo({ id: "", firstName: "", lastName: "" })
        removeCookie("Authorization")
      }
    }
  }, [cookies.Authorization, removeCookie, userInfo.id])

  return <AppContext.Provider {...props} value={{ userInfo }} />
}

const AppContext = createContext<AppContextType>({} as AppContextType)
const useAppContext = () => useContext(AppContext)

export { AppContextProvider }
export default useAppContext
