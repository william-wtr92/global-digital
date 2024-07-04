"use client"

import { useContext } from "react"

import { AppContext } from "@/providers/AppContext"

export const useAppContext = () => useContext(AppContext)
