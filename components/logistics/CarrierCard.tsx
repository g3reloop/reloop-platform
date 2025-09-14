'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Truck, 
  Shield, 
  MapPin, 
  Award, 
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Thermometer,
  AlertTriangle,
  Package,
  Clock
} from 'lucide-react'
import { Carrier, CapabilityType } from '@/types/logistics'
import { cn } from '@/lib/utils'

interface CarrierCardProps {
  carrier: Carrier
  onContactClick?: (carrier: Carrier) => void
}

export function CarrierCard({ carrier, onContactClick }: CarrierCardProps) {
  const getCapabilityIcon = (capability: string) => {
    switch (capability) {
      case CapabilityType.TEMPERATURE_CONTROL:
        return <Thermometer className="h-4 w-4" />
      case CapabilityType.ADR_CERTIFIED:
      case CapabilityType.HAZARDOUS_WASTE:
        return <AlertTriangle className="h-4 w-4" />
      case CapabilityType.BULK_TRANSPORT:
        return <Package className="h-4 w-4" />
      case CapabilityType.TWENTY_FOUR_SEVEN:
        return <Clock className="h-4 w-4" />
      default:
        return <Truck className="h-4 w-4" />
    }
  }

  const formatCapabilityName = (capability: string) => {
    return capability
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              {carrier.name}
              {carrier.verified && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{carrier.description}</p>
          </div>
          <Badge variant="secondary" className="ml-2">
            ⭐ {carrier.rating}/5.0
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{carrier.stats.fleetSize}</p>
            <p className="text-xs text-muted-foreground">Fleet size</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{carrier.stats.yearsInBusiness}</p>
            <p className="text-xs text-muted-foreground">Years in business</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{carrier.stats.monthlyCapacity}</p>
            <p className="text-xs text-muted-foreground">Monthly capacity</p>
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <p className="text-sm font-medium mb-2">Capabilities</p>
          <div className="flex flex-wrap gap-2">
            {carrier.capabilities.map(cap => (
              <Badge key={cap} variant="outline" className="flex items-center gap-1">
                {getCapabilityIcon(cap)}
                {formatCapabilityName(cap)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <p className="text-sm font-medium mb-2 flex items-center gap-1">
            <Award className="h-4 w-4" />
            Certifications
          </p>
          <div className="flex flex-wrap gap-2">
            {carrier.certifications.map(cert => (
              <Badge key={cert} variant="secondary">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        {/* Service Areas */}
        <div>
          <p className="text-sm font-medium mb-2 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            Service areas
          </p>
          <div className="flex flex-wrap gap-2">
            {carrier.serviceAreas.map(area => (
              <span key={area} className="text-sm text-muted-foreground">
                {area}{carrier.serviceAreas.indexOf(area) < carrier.serviceAreas.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="pt-2 border-t space-y-2">
          {carrier.contact.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${carrier.contact.phone}`} className="hover:underline">
                {carrier.contact.phone}
              </a>
            </div>
          )}
          {carrier.contact.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${carrier.contact.email}`} className="hover:underline">
                {carrier.contact.email}
              </a>
            </div>
          )}
          {carrier.contact.website && (
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a 
                href={`https://${carrier.contact.website}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline"
              >
                {carrier.contact.website}
              </a>
            </div>
          )}
        </div>

        <Button 
          className="w-full"
          onClick={() => onContactClick?.(carrier)}
        >
          Contact Carrier
        </Button>
      </CardContent>
    </Card>
  )
}
