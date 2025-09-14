// Role-based access control for logistics features

export enum LogisticsRole {
  VIEWER = 'viewer',
  DRIVER = 'driver',
  DISPATCHER = 'dispatcher',
  MANAGER = 'manager',
  ADMIN = 'admin'
}

export interface LogisticsPermission {
  viewCarriers: boolean
  editCarriers: boolean
  viewRoutes: boolean
  createRoutes: boolean
  editRoutes: boolean
  deleteRoutes: boolean
  shareRoutes: boolean
  viewAnalytics: boolean
  manageDrivers: boolean
  manageSettings: boolean
}

// Permission matrix for each role
export const rolePermissions: Record<LogisticsRole, LogisticsPermission> = {
  [LogisticsRole.VIEWER]: {
    viewCarriers: true,
    editCarriers: false,
    viewRoutes: true,
    createRoutes: false,
    editRoutes: false,
    deleteRoutes: false,
    shareRoutes: false,
    viewAnalytics: false,
    manageDrivers: false,
    manageSettings: false
  },
  [LogisticsRole.DRIVER]: {
    viewCarriers: true,
    editCarriers: false,
    viewRoutes: true,
    createRoutes: false,
    editRoutes: false,
    deleteRoutes: false,
    shareRoutes: true,
    viewAnalytics: false,
    manageDrivers: false,
    manageSettings: false
  },
  [LogisticsRole.DISPATCHER]: {
    viewCarriers: true,
    editCarriers: true,
    viewRoutes: true,
    createRoutes: true,
    editRoutes: true,
    deleteRoutes: false,
    shareRoutes: true,
    viewAnalytics: true,
    manageDrivers: true,
    manageSettings: false
  },
  [LogisticsRole.MANAGER]: {
    viewCarriers: true,
    editCarriers: true,
    viewRoutes: true,
    createRoutes: true,
    editRoutes: true,
    deleteRoutes: true,
    shareRoutes: true,
    viewAnalytics: true,
    manageDrivers: true,
    manageSettings: true
  },
  [LogisticsRole.ADMIN]: {
    viewCarriers: true,
    editCarriers: true,
    viewRoutes: true,
    createRoutes: true,
    editRoutes: true,
    deleteRoutes: true,
    shareRoutes: true,
    viewAnalytics: true,
    manageDrivers: true,
    manageSettings: true
  }
}

// Helper function to check if user has permission
export function hasLogisticsPermission(
  userRole: LogisticsRole | undefined,
  permission: keyof LogisticsPermission
): boolean {
  if (!userRole) return false
  return rolePermissions[userRole][permission]
}

// Helper function to get all permissions for a role
export function getLogisticsPermissions(role: LogisticsRole): LogisticsPermission {
  return rolePermissions[role]
}

// Route access configuration
export const routeAccess = {
  '/logistics': [LogisticsRole.VIEWER, LogisticsRole.DRIVER, LogisticsRole.DISPATCHER, LogisticsRole.MANAGER, LogisticsRole.ADMIN],
  '/logistics/carriers': [LogisticsRole.VIEWER, LogisticsRole.DRIVER, LogisticsRole.DISPATCHER, LogisticsRole.MANAGER, LogisticsRole.ADMIN],
  '/logistics/route-planner': [LogisticsRole.DISPATCHER, LogisticsRole.MANAGER, LogisticsRole.ADMIN],
  '/logistics/analytics': [LogisticsRole.DISPATCHER, LogisticsRole.MANAGER, LogisticsRole.ADMIN],
  '/logistics/settings': [LogisticsRole.MANAGER, LogisticsRole.ADMIN]
}

// Check if user can access a specific route
export function canAccessRoute(userRole: LogisticsRole | undefined, route: string): boolean {
  if (!userRole) return false
  const allowedRoles = routeAccess[route as keyof typeof routeAccess]
  return allowedRoles ? allowedRoles.includes(userRole) : false
}
