import { CarrierDirectory } from '@/components/logistics/CarrierDirectory'
import { ProtectedLogisticsRoute } from '@/components/logistics/ProtectedLogisticsRoute'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'

export default function CarriersPage() {
  return (
    <ProtectedLogisticsRoute requiredPermission="viewCarriers">
      <div className="container py-10">
        <PageHeader>
          <PageHeaderHeading>Carrier Directory</PageHeaderHeading>
          <PageHeaderDescription>
            Find and connect with verified waste transport carriers
          </PageHeaderDescription>
        </PageHeader>
        
        <div className="mt-8">
          <CarrierDirectory />
        </div>
      </div>
    </ProtectedLogisticsRoute>
  )
}
