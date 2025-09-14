import { RoutePlanner } from '@/components/logistics/routing/RoutePlanner'
import { ProtectedLogisticsRoute } from '@/components/logistics/ProtectedLogisticsRoute'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'

export default function RoutePlannerPage() {
  return (
    <ProtectedLogisticsRoute requiredPermission="createRoutes">
      <div className="min-h-screen bg-black">
        <div className="container py-10">
        <PageHeader>
          <PageHeaderHeading>Route Planner</PageHeaderHeading>
          <PageHeaderDescription>
            Optimize multi-stop collection and delivery routes
          </PageHeaderDescription>
        </PageHeader>
        
        <div className="mt-8">
          <RoutePlanner />
        </div>
        </div>
      </div>
    </ProtectedLogisticsRoute>
  )
}
