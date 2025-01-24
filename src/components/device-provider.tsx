"use client"

import { Device } from "@/types/devices"
import { createContext, ReactNode, useContext } from "react"

const DeviceContext = createContext<Device>({} as Device)

export const useDevice = () => useContext(DeviceContext)

interface DeviceProviderProps {
  device: Device
  children: ReactNode
}

export function DeviceProvider({ device, children }: DeviceProviderProps) {
  return (
    <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
  )
}
