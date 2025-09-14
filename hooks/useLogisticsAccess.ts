import { useAuth } from '@/contexts/AuthContext'
import { LogisticsRole, hasLogisticsPermission, getLogisticsPermissions, LogisticsPermission } from '@/lib/logistics-access'

export function useLogisticsAccess() {
  const { user, loading } = useAuth()
  
  // In a real implementation, the user's logistics role would come from the session
  // For now, we'll simulate it based on user email or role
  const getUserLogisticsRole = (): LogisticsRole | undefined => {
    if (!user) return undefined
    
    // Simulate role assignment based on email domain or user metadata
    const email = user.email || ''
    
    if (email.includes('admin') || user.role === 'admin') return LogisticsRole.ADMIN
    if (email.includes('manager')) return LogisticsRole.MANAGER
    if (email.includes('dispatcher')) return LogisticsRole.DISPATCHER
    if (email.includes('driver')) return LogisticsRole.DRIVER
    
    // Default to viewer for authenticated users
    return LogisticsRole.VIEWER
  }
  
  const userRole = getUserLogisticsRole()
  const permissions = userRole ? getLogisticsPermissions(userRole) : null
  
  return {
    userRole,
    permissions,
    hasPermission: (permission: keyof LogisticsPermission) => 
      hasLogisticsPermission(userRole, permission),
    isAuthenticated: !!user,
    isLoading: loading
  }
}
