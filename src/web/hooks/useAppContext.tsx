"use client"

import { createContext, useContext } from "react"

type AppContextType = {
  // Add your context properties here
}

const AdminContextProvider = () => {
  return <AdminContext.Provider value={{}} />
}

const AdminContext = createContext<AppContextType>({} as AppContextType)
const useAdminContext = () => useContext(AdminContext)

export { AdminContextProvider }
export default useAdminContext
