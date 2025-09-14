'use client'

import React from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { Web3Provider } from '@/hooks/useWeb3'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Web3Provider>
        {children}
      </Web3Provider>
      <Toaster richColors position="top-right" />
    </AuthProvider>
  )
}
