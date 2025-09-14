'use client'

import Link from 'next/link'
import { ProtectedLogisticsRoute } from '@/components/logistics/ProtectedLogisticsRoute'
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
import { Truck, Route, Users, BarChart3, Settings, ArrowRight } from 'lucide-react'
import { useLogisticsAccess } from '@/hooks/useLogisticsAccess'

function LogisticsContent() {
  const { hasPermission } = useLogisticsAccess()

  const features = [
    {
      title: 'Carrier Directory',
      description: 'Find and connect with verified waste transport carriers',
      icon: Users,
      href: '/logistics/carriers',
      permission: 'viewCarriers' as const
    },
    {
      title: 'Route Planner',
      description: 'Optimize multi-stop collection and delivery routes',
      icon: Route,
      href: '/logistics/route-planner',
      permission: 'createRoutes' as const
    },
    {
      title: 'Analytics',
      description: 'Track performance metrics and optimize operations',
      icon: BarChart3,
      href: '/logistics/analytics',
      permission: 'viewAnalytics' as const
    },
    {
      title: 'Settings',
      description: 'Configure logistics preferences and integrations',
      icon: Settings,
      href: '/logistics/settings',
      permission: 'manageSettings' as const
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="container py-10">
      <PageHeader>
        <PageHeaderHeading>Logistics Management</PageHeaderHeading>
        <PageHeaderDescription>
          Streamline your waste collection and transport operations
        </PageHeaderDescription>
      </PageHeader>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {features.map((feature) => {
          const hasAccess = hasPermission(feature.permission)
          
          return (
            <FeatureCard
              key={feature.href}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              href={feature.href}
              hasAccess={hasAccess}
            />
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-mythic-text-primary">Quick Overview</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-mythic-dark-800 border-mythic-primary-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-mythic-text-muted">
                Active Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-mythic-text-primary">12</p>
              <p className="text-xs text-mythic-text-muted mt-1">
                +3 from last week
              </p>
            </CardContent>
          </Card>
          <Card className="bg-mythic-dark-800 border-mythic-primary-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-mythic-text-muted">
                Partner Carriers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-mythic-text-primary">24</p>
              <p className="text-xs text-mythic-text-muted mt-1">
                Across 5 regions
              </p>
            </CardContent>
          </Card>
          <Card className="bg-mythic-dark-800 border-mythic-primary-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-mythic-text-muted">
                Total Distance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-mythic-text-primary">1,847 km</p>
              <p className="text-xs text-mythic-text-muted mt-1">
                This month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-mythic-dark-800 border-mythic-primary-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-mythic-text-muted">
                CO2 Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-mythic-text-primary">3.2 tons</p>
              <p className="text-xs text-mythic-primary-500 mt-1">
                Through optimization
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
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
