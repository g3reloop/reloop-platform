'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useLogisticsAccess } from '@/hooks/useLogisticsAccess'
import { LogisticsPermission } from '@/lib/logistics-access'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Loader2, ShieldX } from 'lucide-react'

interface ProtectedLogisticsRouteProps {
  children: React.ReactNode
  requiredPermission?: keyof LogisticsPermission
  fallbackUrl?: string
  showError?: boolean
}

export function ProtectedLogisticsRoute({
  children,
  requiredPermission,
  fallbackUrl = '/logistics',
  showError = true
}: ProtectedLogisticsRouteProps) {
  const router = useRouter()
  const { isAuthenticated, hasPermission, isLoading, userRole } = useLogisticsAccess()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?callbackUrl=' + encodeURIComponent(window.location.pathname))
    }
  }, [isAuthenticated, isLoading, router])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  // Check permission if specified
  if (requiredPermission && !hasPermission(requiredPermission)) {
    if (showError) {
      return (
        <div className="container py-10">
          <Alert variant="destructive">
            <ShieldX className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don't have permission to access this feature. Your current role is: {userRole || 'Unknown'}.
              This feature requires the "{requiredPermission}" permission.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button onClick={() => router.push(fallbackUrl)}>
              Go Back
            </Button>
          </div>
        </div>
      )
    } else {
      router.push(fallbackUrl)
      return null
    }
  }

  // All checks passed
  return <>{children}</>
}
