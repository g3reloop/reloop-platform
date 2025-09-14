'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CarrierCard } from './CarrierCard'
import { 
  Filter,
  Search,
  Truck
} from 'lucide-react'
import { Carrier, CapabilityType, MaterialType } from '@/types/logistics'
import { mockCarriers } from '@/data/mockCarriers'

export function CarrierDirectory() {
  const [carriers] = useState<Carrier[]>(mockCarriers)
  const [filteredCarriers, setFilteredCarriers] = useState<Carrier[]>(mockCarriers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCapability, setFilterCapability] = useState<string>('all')
  const [filterArea, setFilterArea] = useState<string>('all')
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all')

  // Get unique values for filters
  const allCapabilities = Array.from(new Set(carriers.flatMap(c => c.capabilities)))
  const allAreas = Array.from(new Set(carriers.flatMap(c => c.serviceAreas)))
  const allSpecialties = Array.from(new Set(carriers.flatMap(c => c.specialties)))

  useEffect(() => {
    let filtered = [...carriers]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(carrier => 
        carrier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        carrier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        carrier.certifications.some(cert => cert.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply capability filter
    if (filterCapability !== 'all') {
      filtered = filtered.filter(carrier => 
        carrier.capabilities.includes(filterCapability as CapabilityType)
      )
    }

    // Apply area filter
    if (filterArea !== 'all') {
      filtered = filtered.filter(carrier => 
        carrier.serviceAreas.includes(filterArea)
      )
    }

    // Apply specialty filter
    if (filterSpecialty !== 'all') {
      filtered = filtered.filter(carrier => 
        carrier.specialties.includes(filterSpecialty as MaterialType)
      )
    }

    setFilteredCarriers(filtered)
  }, [searchTerm, filterCapability, filterArea, filterSpecialty, carriers])

  const formatCapabilityName = (capability: string) => {
    return capability
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const handleContactCarrier = (carrier: Carrier) => {
    // In production, this would open a contact modal or redirect to contact page
    console.log('Contact carrier:', carrier.name)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="search">Search carriers</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                type="search"
                placeholder="Search by name, description, or certification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="capability">Capability</Label>
              <Select value={filterCapability} onValueChange={setFilterCapability}>
                <SelectTrigger id="capability">
                  <SelectValue placeholder="All capabilities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All capabilities</SelectItem>
                  {allCapabilities.map(cap => (
                    <SelectItem key={cap} value={cap}>
                      {formatCapabilityName(cap)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="area">Service area</Label>
              <Select value={filterArea} onValueChange={setFilterArea}>
                <SelectTrigger id="area">
                  <SelectValue placeholder="All areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All areas</SelectItem>
                  {allAreas.map(area => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="specialty">Material specialty</Label>
              <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="All materials" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All materials</SelectItem>
                  {allSpecialties.map(spec => (
                    <SelectItem key={spec} value={spec}>
                      {formatCapabilityName(spec)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredCarriers.length} of {carriers.length} carriers
          </div>
        </CardContent>
      </Card>

      {/* Carrier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCarriers.map(carrier => (
          <CarrierCard 
            key={carrier.id} 
            carrier={carrier}
            onContactClick={handleContactCarrier}
          />
        ))}
      </div>

      {filteredCarriers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">No carriers found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
