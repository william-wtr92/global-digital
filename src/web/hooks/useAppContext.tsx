"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import { parseSession } from "@/utils/parseJwt"

type AppContextType = {
  token?: string
  userInfo: { id: string; firstName: string; lastName: string }
  setUserInfo: React.Dispatch<
    React.SetStateAction<{ id: string; firstName: string; lastName: string }>
  >
}

const AppContext = createContext<AppContextType>({} as AppContextType)
const useAppContext = () => useContext(AppContext)

const AppContextProvider = (props: {
  sessionUserInfo: { id: string; firstName: string; lastName: string }
  children: React.ReactNode
}) => {
  const [userInfo, setUserInfo] = useState(props.sessionUserInfo)
  const [cookies, , removeCookie] = useCookies(["Authorization"])
  const token = cookies.Authorization

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
  }, [cookies.Authorization, removeCookie])

  return (
    <AppContext.Provider value={{ token, userInfo, setUserInfo }}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContextProvider }
export default useAppContext
