"use client"

import { createContext, useContext, useState } from "react"

type AppContextType = {
  userInfo: { id: string }
}

const AppContextProvider = (props: {
  sessionUserInfo: { id: string }
  children: React.ReactNode
}) => {
  const [userInfo] = useState(props.sessionUserInfo)

  return <AppContext.Provider {...props} value={{ userInfo }} />
}

const AppContext = createContext<AppContextType>({} as AppContextType)
const useAppContext = () => useContext(AppContext)

export { AppContextProvider }
export default useAppContext
