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
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      permission: 'viewCarriers' as const
    },
    {
      title: 'Route Planner',
      description: 'Optimize multi-stop collection and delivery routes',
      icon: Route,
      href: '/logistics/route-planner',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      permission: 'createRoutes' as const
    },
    {
      title: 'Analytics',
      description: 'Track performance metrics and optimize operations',
      icon: BarChart3,
      href: '/logistics/analytics',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      permission: 'viewAnalytics' as const
    },
    {
      title: 'Settings',
      description: 'Configure logistics preferences and integrations',
      icon: Settings,
      href: '/logistics/settings',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      permission: 'manageSettings' as const
    }
  ]

  return (
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
          const Icon = feature.icon
          
          return (
            <Card key={feature.href} className={!hasAccess ? 'opacity-50' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  {hasAccess && (
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {hasAccess ? (
                  <Link href={feature.href}>
                    <Button className="w-full">
                      Access {feature.title}
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full">
                    No Access
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Quick Overview</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground mt-1">
                +3 from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Partner Carriers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-muted-foreground mt-1">
                Across 5 regions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Distance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1,847 km</p>
              <p className="text-xs text-muted-foreground mt-1">
                This month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                CO2 Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">3.2 tons</p>
              <p className="text-xs text-green-500 mt-1">
                Through optimization
              </p>
            </CardContent>
          </Card>
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
