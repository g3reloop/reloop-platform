'use client'

import { useState, useEffect } from 'react'

interface PWAStatus {
  isInstallable: boolean
  isInstalled: boolean
  isOnline: boolean
  isStandalone: boolean
  hasServiceWorker: boolean
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function usePWA() {
  const [status, setStatus] = useState<PWAStatus>({
    isInstallable: false,
    isInstalled: false,
    isOnline: true,
    isStandalone: false,
    hasServiceWorker: false
  })
  
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    // Check if app is already installed (standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true

    // Check if service worker is supported and registered
    const checkServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration()
          setStatus(prev => ({ ...prev, hasServiceWorker: !!registration }))
        } catch (error) {
          console.error('Service Worker check failed:', error)
        }
      }
    }

    // Check online status
    const updateOnlineStatus = () => {
      setStatus(prev => ({ ...prev, isOnline: navigator.onLine }))
    }

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setStatus(prev => ({ ...prev, isInstallable: true }))
    }

    // Handle appinstalled event
    const handleAppInstalled = () => {
      setStatus(prev => ({ 
        ...prev, 
        isInstalled: true, 
        isInstallable: false 
      }))
      setDeferredPrompt(null)
    }

    // Register event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // Initial checks
    setStatus(prev => ({ 
      ...prev, 
      isInstalled: isStandalone,
      isOnline: navigator.onLine 
    }))
    
    checkServiceWorker()

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  const install = async (): Promise<boolean> => {
    if (!deferredPrompt) {
      console.warn('No install prompt available')
      return false
    }

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
        setDeferredPrompt(null)
        setStatus(prev => ({ ...prev, isInstallable: false }))
        return true
      } else {
        console.log('User dismissed the install prompt')
        return false
      }
    } catch (error) {
      console.error('Installation failed:', error)
      return false
    }
  }

  const registerServiceWorker = async (): Promise<boolean> => {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker not supported')
      return false
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered:', registration)
      setStatus(prev => ({ ...prev, hasServiceWorker: true }))
      return true
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return false
    }
  }

  const unregisterServiceWorker = async (): Promise<boolean> => {
    if (!('serviceWorker' in navigator)) {
      return false
    }

    try {
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map(registration => registration.unregister()))
      setStatus(prev => ({ ...prev, hasServiceWorker: false }))
      return true
    } catch (error) {
      console.error('Service Worker unregistration failed:', error)
      return false
    }
  }

  return {
    ...status,
    deferredPrompt,
    install,
    registerServiceWorker,
    unregisterServiceWorker
  }
}

// Hook for offline functionality
export function useOffline() {
  const [isOnline, setIsOnline] = useState(true)
  const [isReconnecting, setIsReconnecting] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setIsReconnecting(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setIsReconnecting(false)
    }

    const handleVisibilityChange = () => {
      if (!document.hidden && !navigator.onLine) {
        setIsReconnecting(true)
        // Simulate reconnection attempt
        setTimeout(() => {
          setIsReconnecting(false)
          setIsOnline(navigator.onLine)
        }, 2000)
      }
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return {
    isOnline,
    isOffline: !isOnline,
    isReconnecting
  }
}

// Hook for background sync
export function useBackgroundSync() {
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype)
  }, [])

  const sync = async (tag: string, data?: any): Promise<boolean> => {
    if (!isSupported) {
      console.warn('Background sync not supported')
      return false
    }

    try {
      const registration = await navigator.serviceWorker.ready
      await registration.sync.register(tag)
      
      // Store data for the sync event
      if (data) {
        localStorage.setItem(`sync-${tag}`, JSON.stringify(data))
      }
      
      return true
    } catch (error) {
      console.error('Background sync failed:', error)
      return false
    }
  }

  return {
    isSupported,
    sync
  }
}
