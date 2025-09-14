import './globals.css'
import React from 'react'
import GenesisThemeProvider from '../components/theme/GenesisThemeProvider'
import { QuintupleLayer } from '../components/theme/QuintupleLayer'
import Navigation from '../components/layout/navigation'
import { Providers } from '../components/providers/providers'

export const metadata = { 
  title: 'Genesis Reloop', 
  description: 'Build Homes. Close Loops. Replace Babylon.' 
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <GenesisThemeProvider>
          <Providers>
            <QuintupleLayer>
              <Navigation />
              <main className="min-h-screen relative z-10">
                {children}
              </main>
            </QuintupleLayer>
          </Providers>
        </GenesisThemeProvider>
      </body>
    </html>
  )
}
