'use client'

import { useEffect } from 'react'
import { usePWA } from '@/hooks/usePWA'

export function ServiceWorkerRegistration() {
  const { registerServiceWorker, hasServiceWorker } = usePWA()

  useEffect(() => {
    // Register service worker on component mount
    if (!hasServiceWorker) {
      registerServiceWorker()
    }
  }, [hasServiceWorker, registerServiceWorker])

  // This component doesn't render anything, it just handles service worker registration
  return null
}

// Component to handle PWA updates
export function PWAUpdateHandler() {
  const { hasServiceWorker } = usePWA()

  useEffect(() => {
    if (!hasServiceWorker) return

    const handleServiceWorkerUpdate = () => {
      // Check if there's a waiting service worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then((registration) => {
          if (registration?.waiting) {
            // Notify user about update
            if (confirm('A new version of the app is available. Would you like to update?')) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' })
              window.location.reload()
            }
          }
        })
      }
    }

    // Listen for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    }

    // Check for updates periodically
    const updateInterval = setInterval(handleServiceWorkerUpdate, 60000) // Check every minute

    return () => {
      clearInterval(updateInterval)
    }
  }, [hasServiceWorker])

  return null
}
