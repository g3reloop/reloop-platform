// Service Worker for Genesis Reloop Logistics PWA
// Provides offline functionality and background sync

const CACHE_NAME = 'reloop-logistics-v1.0.0'
const STATIC_CACHE = 'reloop-static-v1.0.0'
const DYNAMIC_CACHE = 'reloop-dynamic-v1.0.0'

// Assets to cache for offline functionality
const STATIC_ASSETS = [
  '/',
  '/logistics',
  '/logistics/route-planner',
  '/logistics/carriers',
  '/logistics/analytics',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// API endpoints that should work offline with cached data
const API_CACHE_PATTERNS = [
  '/api/agents/status',
  '/api/logistics/routes',
  '/api/logistics/carriers'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Static assets cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated successfully')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Handle different types of requests
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request))
  } else if (isApiRequest(request)) {
    event.respondWith(handleApiRequest(request))
  } else if (isPageRequest(request)) {
    event.respondWith(handlePageRequest(request))
  }
})

// Check if request is for a static asset
function isStaticAsset(request) {
  const url = new URL(request.url)
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
}

// Check if request is for an API endpoint
function isApiRequest(request) {
  const url = new URL(request.url)
  return url.pathname.startsWith('/api/')
}

// Check if request is for a page
function isPageRequest(request) {
  const url = new URL(request.url)
  return url.pathname.startsWith('/logistics') || url.pathname === '/'
}

// Handle static asset requests
async function handleStaticAsset(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // If not in cache, fetch from network
    const networkResponse = await fetch(request)
    
    // Cache the response for future use
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('Service Worker: Failed to handle static asset', request.url, error)
    return new Response('Asset not available offline', { status: 404 })
  }
}

// Handle API requests
async function handleApiRequest(request) {
  try {
    // Try network first for API requests
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Cache successful API responses
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache for API', request.url)
    
    // If network fails, try cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline response for API requests
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'This feature requires an internet connection',
        offline: true
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

// Handle page requests
async function handlePageRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Cache successful page responses
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache for page', request.url)
    
    // If network fails, try cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Fallback to offline page
    const offlineResponse = await caches.match('/offline.html')
    if (offlineResponse) {
      return offlineResponse
    }
    
    // Return basic offline response
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - Genesis Reloop</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: #1b4332;
              color: #ffffff;
              margin: 0;
              padding: 20px;
              text-align: center;
            }
            .container { max-width: 400px; margin: 0 auto; padding-top: 50px; }
            h1 { color: #4361ee; margin-bottom: 20px; }
            p { margin-bottom: 30px; opacity: 0.8; }
            .retry-btn {
              background: #4361ee;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>You're Offline</h1>
            <p>This app works offline, but some features require an internet connection.</p>
            <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
          </div>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      }
    )
  }
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag)
  
  if (event.tag === 'logistics-form-sync') {
    event.waitUntil(syncLogisticsForms())
  }
})

// Sync pending form submissions when back online
async function syncLogisticsForms() {
  try {
    // Get pending form data from IndexedDB
    const pendingForms = await getPendingForms()
    
    for (const formData of pendingForms) {
      try {
        const response = await fetch(formData.url, {
          method: formData.method,
          headers: formData.headers,
          body: formData.body
        })
        
        if (response.ok) {
          // Remove from pending queue
          await removePendingForm(formData.id)
          console.log('Service Worker: Synced form submission', formData.id)
        }
      } catch (error) {
        console.error('Service Worker: Failed to sync form', formData.id, error)
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error)
  }
}

// Helper functions for IndexedDB operations
async function getPendingForms() {
  // In a real implementation, this would use IndexedDB
  // For now, return empty array
  return []
}

async function removePendingForm(id) {
  // In a real implementation, this would remove from IndexedDB
  console.log('Service Worker: Removing pending form', id)
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received')
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-96x96.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Genesis Reloop', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked')
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/logistics')
    )
  }
})
