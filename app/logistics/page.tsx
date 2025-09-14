'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ProtectedLogisticsRoute } from '@/components/logistics/ProtectedLogisticsRoute'
import { InstallPrompt, usePWAInstall } from '@/components/pwa/InstallPrompt'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FeatureCard } from '@/components/ui/feature-card'
import { 
  Truck, 
  Route, 
  Users, 
  BarChart3, 
  Settings, 
  ArrowRight,
  Zap,
  Shield,
  Activity,
  Wifi,
  WifiOff,
  Download,
  Smartphone,
  Monitor,
  Cpu,
  Database,
  Network,
  Layers,
  Hexagon,
  Triangle,
  Circle
} from 'lucide-react'
import { useLogisticsAccess } from '@/hooks/useLogisticsAccess'
import { usePWA } from '@/hooks/usePWA'

// Mythic Tech color palette
const mythicColors = {
  primary: '#4361ee',      // Electric blue
  accent: '#f3722c',       // Blood orange  
  secondary: '#1b4332',    // Deep green
  dark: '#2b2d42',         // Gunmetal gray
  text: '#ffffff',
  muted: '#a0a0a0'
}

// Fractal-inspired patterns for background
const FractalPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-full">
      {/* Mandelbrot-inspired gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-mythic-primary-500/5 via-transparent to-mythic-accent-300/5" />
      
      {/* Fractal geometric patterns */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-mythic-primary-500/10 rotate-45" />
      <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-mythic-accent-300/20 rotate-45" />
      <div className="absolute top-1/4 left-1/4 w-8 h-8 border border-mythic-primary-500/30 rotate-45" />
      
      <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-mythic-accent-300/10 -rotate-12" />
      <div className="absolute top-3/4 right-1/4 w-12 h-12 border border-mythic-primary-500/20 -rotate-12" />
      <div className="absolute top-3/4 right-1/4 w-6 h-6 border border-mythic-accent-300/30 -rotate-12" />
      
      {/* Holographic shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mythic-primary-500/5 to-transparent animate-pulse" />
    </div>
  </div>
)

// Glitch art transition component
const GlitchTransition = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20, skewX: -5 }}
    animate={{ opacity: 1, x: 0, skewX: 0 }}
    transition={{ 
      duration: 0.6, 
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
    className="relative"
  >
    {children}
    {/* Glitch effect overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-mythic-primary-500/10 to-mythic-accent-300/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
  </motion.div>
)

function LogisticsContent() {
  const { hasPermission } = useLogisticsAccess()
  const { isInstallable, isInstalled, isOnline } = usePWA()
  const [systemStatus, setSystemStatus] = useState({
    agents: 10,
    routes: 12,
    carriers: 24,
    efficiency: 87.5
  })


  const features = [
    {
      title: 'Carrier Directory',
      description: 'AI-verified transport partners with real-time capacity tracking',
      icon: Users,
      href: '/logistics/carriers',
      permission: 'viewCarriers' as const,
      status: 'online',
      metrics: { active: 24, verified: 18 }
    },
    {
      title: 'Route Planner',
      description: 'Quantum-optimized collection paths with carbon footprint analysis',
      icon: Route,
      href: '/logistics/route-planner',
      permission: 'createRoutes' as const,
      status: 'optimizing',
      metrics: { routes: 12, saved: '23%' }
    },
    {
      title: 'Analytics',
      description: 'Real-time performance metrics with predictive insights',
      icon: BarChart3,
      href: '/logistics/analytics',
      permission: 'viewAnalytics' as const,
      status: 'processing',
      metrics: { efficiency: '87.5%', co2: '3.2t' }
    },
    {
      title: 'Settings',
      description: 'Configure AI agents and system parameters',
      icon: Settings,
      href: '/logistics/settings',
      permission: 'manageSettings' as const,
      status: 'configured',
      metrics: { agents: 10, active: 8 }
    }
  ]

  const systemMetrics = [
    {
      label: 'Active Routes',
      value: systemStatus.routes,
      change: '+3',
      trend: 'up',
      icon: Route,
      color: 'text-mythic-primary-500'
    },
    {
      label: 'Partner Carriers',
      value: systemStatus.carriers,
      change: '+2',
      trend: 'up',
      icon: Users,
      color: 'text-mythic-accent-300'
    },
    {
      label: 'Total Distance',
      value: '1,847 km',
      change: '-12%',
      trend: 'down',
      icon: Activity,
      color: 'text-mythic-secondary-500'
    },
    {
      label: 'CO2 Saved',
      value: '3.2 tons',
      change: '+18%',
      trend: 'up',
      icon: Shield,
      color: 'text-mythic-accent-300'
    }
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Mythic Tech Background */}
      <FractalPattern />
      
      {/* Holographic grid overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-mythic-primary-500/5 via-transparent to-mythic-accent-300/5" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-mythic-primary-500/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container py-10">
        {/* Header with Mythic Tech styling */}
        <GlitchTransition delay={0.1}>
          <PageHeader className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-mythic-primary-500 to-mythic-accent-300 rounded-lg">
                <Cpu className="h-8 w-8 text-mythic-dark-900" />
              </div>
              <div>
                <PageHeaderHeading className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-mythic-primary-500 via-mythic-accent-300 to-mythic-primary-500 bg-clip-text text-transparent">
                    Logistics Command
                  </span>
                </PageHeaderHeading>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {isOnline ? (
                      <Wifi className="h-4 w-4 text-mythic-accent-300" />
                    ) : (
                      <WifiOff className="h-4 w-4 text-mythic-text-muted" />
                    )}
                    <span className="text-sm text-mythic-text-muted">
                      {isOnline ? 'Network Online' : 'Offline Mode'}
                    </span>
                  </div>
                  <div className="w-1 h-1 bg-mythic-text-muted rounded-full" />
                  <div className="flex items-center gap-1">
                    <Database className="h-4 w-4 text-mythic-primary-500" />
                    <span className="text-sm text-mythic-text-muted">
                      {systemStatus.agents} AI Agents Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <PageHeaderDescription className="text-xl text-mythic-text-muted max-w-3xl">
              Decentralized logistics orchestration powered by quantum-optimized AI agents. 
              Transform waste streams into value through intelligent routing and real-time coordination.
            </PageHeaderDescription>
          </PageHeader>
        </GlitchTransition>

        {/* System Status Grid */}
        <GlitchTransition delay={0.2}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-mythic-text-primary mb-6 flex items-center gap-2">
              <Network className="h-6 w-6 text-mythic-primary-500" />
              System Status
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {systemMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-mythic-dark-800/80 backdrop-blur border-mythic-primary-500/20 hover:border-mythic-primary-500/40 transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <metric.icon className={`h-5 w-5 ${metric.color}`} />
                        <div className="flex items-center gap-1">
                          <span className={`text-xs ${metric.trend === 'up' ? 'text-mythic-accent-300' : 'text-mythic-text-muted'}`}>
                            {metric.change}
                          </span>
                          <div className={`w-2 h-2 rounded-full ${metric.trend === 'up' ? 'bg-mythic-accent-300' : 'bg-mythic-text-muted'}`} />
                        </div>
                      </div>
                      <CardTitle className="text-sm font-medium text-mythic-text-muted">
                        {metric.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-mythic-text-primary group-hover:text-mythic-primary-500 transition-colors">
                        {metric.value}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </GlitchTransition>

        {/* Feature Grid with Mythic Tech styling */}
        <GlitchTransition delay={0.4}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-mythic-text-primary mb-6 flex items-center gap-2">
              <Layers className="h-6 w-6 text-mythic-accent-300" />
              Command Modules
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature, index) => {
                const hasAccess = hasPermission(feature.permission)
                
                return (
                  <motion.div
                    key={feature.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="bg-mythic-dark-800/80 backdrop-blur border-mythic-primary-500/20 hover:border-mythic-primary-500/40 transition-all duration-300 group overflow-hidden relative">
                      {/* Holographic effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-mythic-primary-500/5 via-transparent to-mythic-accent-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-mythic-primary-500/20 to-mythic-accent-300/20 rounded-lg group-hover:from-mythic-primary-500/30 group-hover:to-mythic-accent-300/30 transition-all">
                              <feature.icon className="h-6 w-6 text-mythic-primary-500" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-semibold text-mythic-text-primary group-hover:text-mythic-primary-500 transition-colors">
                                {feature.title}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <div className={`w-2 h-2 rounded-full ${
                                  feature.status === 'online' ? 'bg-mythic-accent-300' :
                                  feature.status === 'optimizing' ? 'bg-mythic-primary-500' :
                                  feature.status === 'processing' ? 'bg-mythic-secondary-500' :
                                  'bg-mythic-text-muted'
                                }`} />
                                <span className="text-xs text-mythic-text-muted capitalize">
                                  {feature.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-mythic-text-muted group-hover:text-mythic-primary-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <CardDescription className="text-mythic-text-muted">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4 text-sm">
                            {Object.entries(feature.metrics).map(([key, value]) => (
                              <div key={key} className="text-mythic-text-muted">
                                <span className="font-mono text-mythic-primary-500">{value}</span>
                                <span className="ml-1 capitalize">{key}</span>
                              </div>
                            ))}
                          </div>
                          {hasAccess ? (
                            <Link href={feature.href}>
                              <Button 
                                size="sm" 
                                className="bg-mythic-primary-500 hover:bg-mythic-primary-600 text-mythic-dark-900 font-medium"
                              >
                                Access
                              </Button>
                            </Link>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              disabled
                              className="border-mythic-text-muted/30 text-mythic-text-muted"
                            >
                              Restricted
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </GlitchTransition>

        {/* PWA Installation Prompt */}
        {isInstallable && !isInstalled && (
          <InstallPrompt />
        )}

        {/* Offline Indicator */}
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 left-4 right-4 z-40 md:left-auto md:right-4 md:max-w-sm"
          >
            <Card className="bg-mythic-dark-800/90 backdrop-blur border-mythic-accent-300/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <WifiOff className="h-5 w-5 text-mythic-accent-300" />
                  <div>
                    <p className="text-sm font-medium text-mythic-text-primary">Offline Mode</p>
                    <p className="text-xs text-mythic-text-muted">Some features may be limited</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function LogisticsPage() {
  return (
    <ProtectedLogisticsRoute requiredPermission="viewCarriers">
      <LogisticsContent />
    </ProtectedLogisticsRoute>
  )
}