import { Carrier, CapabilityType, CertificationType, MaterialType } from '@/types/logistics'

export const mockCarriers: Carrier[] = [
  {
    id: '1',
    name: 'EcoTransport Ltd',
    description: 'Leading sustainable logistics provider specializing in temperature-controlled waste transport',
    capabilities: [
      CapabilityType.TEMPERATURE_CONTROL,
      CapabilityType.ADR_CERTIFIED,
      CapabilityType.REAL_TIME_TRACKING,
      CapabilityType.BULK_TRANSPORT
    ],
    certifications: [
      CertificationType.ISO_14001,
      CertificationType.FORS_GOLD,
      CertificationType.ADR_LICENSE,
      CertificationType.WAMITAB,
      CertificationType.ISO_9001
    ],
    serviceAreas: ['UK', 'London', 'Southeast', 'Midlands'],
    vehicleTypes: ['Refrigerated trucks', 'Tankers', 'Compactors', 'Box trucks'],
    specialties: [MaterialType.FOOD_WASTE, MaterialType.UCO, MaterialType.HAZARDOUS],
    contact: {
      phone: '+44 20 7123 4567',
      email: 'contact@ecotransport.co.uk',
      website: 'www.ecotransport.co.uk'
    },
    stats: {
      fleetSize: 45,
      yearsInBusiness: 12,
      monthlyCapacity: '2,500 tonnes'
    },
    rating: 4.8,
    verified: true
  },
  {
    id: '2',
    name: 'Green Logistics Co',
    description: 'Carbon-neutral logistics with rail access for long-distance transport',
    capabilities: [
      CapabilityType.BULK_TRANSPORT,
      CapabilityType.RAIL_ACCESS,
      CapabilityType.CARBON_NEUTRAL,
      CapabilityType.HAZARDOUS_WASTE
    ],
    certifications: [
      CertificationType.ISO_9001,
      CertificationType.ISCC,
      CertificationType.CARBON_TRUST,
      CertificationType.RHA_MEMBER
    ],
    serviceAreas: ['UK', 'EU', 'Scotland', 'North England'],
    vehicleTypes: ['Bulk carriers', 'Walking floor trailers', 'Rail containers'],
    specialties: [MaterialType.BULK_LIQUID, MaterialType.INDUSTRIAL, MaterialType.AGRICULTURAL],
    contact: {
      phone: '+44 131 555 0123',
      email: 'info@greenlogistics.com',
      website: 'www.greenlogistics.com'
    },
    stats: {
      fleetSize: 65,
      yearsInBusiness: 18,
      monthlyCapacity: '5,000 tonnes'
    },
    rating: 4.6,
    verified: true
  },
  {
    id: '3',
    name: 'SafeWaste Carriers',
    description: 'Specialist hazardous waste transport with 24/7 emergency response',
    capabilities: [
      CapabilityType.HAZARDOUS_WASTE,
      CapabilityType.ADR_CERTIFIED,
      CapabilityType.TWENTY_FOUR_SEVEN,
      CapabilityType.EMERGENCY_RESPONSE
    ],
    certifications: [
      CertificationType.ADR_LICENSE,
      CertificationType.HAZARDOUS_WASTE,
      CertificationType.ISO_45001,
      CertificationType.CHAS
    ],
    serviceAreas: ['UK', 'Wales', 'Southwest'],
    vehicleTypes: ['ADR vehicles', 'Vacuum tankers', 'Secure containers'],
    specialties: [MaterialType.HAZARDOUS, MaterialType.CHEMICAL, MaterialType.MEDICAL],
    contact: {
      phone: '+44 29 2087 6543',
      email: 'ops@safewaste.co.uk',
      website: 'www.safewaste.co.uk'
    },
    stats: {
      fleetSize: 30,
      yearsInBusiness: 25,
      monthlyCapacity: '1,000 tonnes'
    },
    rating: 4.9,
    verified: true
  },
  {
    id: '4',
    name: 'Urban Collection Services',
    description: 'Micro-collection specialist with electric vehicles for city centers',
    capabilities: [
      CapabilityType.MICRO_COLLECTION,
      CapabilityType.ELECTRIC_VEHICLES,
      CapabilityType.REAL_TIME_TRACKING,
      CapabilityType.FLEXIBLE_SCHEDULING
    ],
    certifications: [
      CertificationType.FORS_SILVER,
      CertificationType.ULTRA_LOW_EMISSION,
      CertificationType.ISO_14001
    ],
    serviceAreas: ['London', 'Birmingham', 'Manchester', 'Bristol'],
    vehicleTypes: ['Electric vans', 'Cargo bikes', 'Small trucks'],
    specialties: [MaterialType.FOOD_WASTE, MaterialType.UCO, MaterialType.RECYCLABLES],
    contact: {
      phone: '+44 20 7999 8888',
      email: 'hello@urbancollection.co.uk',
      website: 'www.urbancollection.co.uk'
    },
    stats: {
      fleetSize: 80,
      yearsInBusiness: 6,
      monthlyCapacity: '800 tonnes'
    },
    rating: 4.7,
    verified: true
  },
  {
    id: '5',
    name: 'Circular Transport Solutions',
    description: 'End-to-end circular economy logistics with processing partnerships',
    capabilities: [
      CapabilityType.BULK_TRANSPORT,
      CapabilityType.TEMPERATURE_CONTROL,
      CapabilityType.PROCESSING_PARTNER,
      CapabilityType.CARBON_TRACKING
    ],
    certifications: [
      CertificationType.ISO_14001,
      CertificationType.ISO_9001,
      CertificationType.ISCC_EU,
      CertificationType.B_CORP
    ],
    serviceAreas: ['UK', 'Ireland', 'France', 'Netherlands'],
    vehicleTypes: ['Multi-compartment tankers', 'Temperature-controlled units', 'Flatbeds'],
    specialties: [MaterialType.UCO, MaterialType.BULK_LIQUID, MaterialType.INDUSTRIAL],
    contact: {
      phone: '+44 161 234 5678',
      email: 'enquiries@circulartransport.eu',
      website: 'www.circulartransport.eu'
    },
    stats: {
      fleetSize: 55,
      yearsInBusiness: 10,
      monthlyCapacity: '3,500 tonnes'
    },
    rating: 4.5,
    verified: true
  }
]

// Helper function to get carriers by capability
export function getCarriersByCapability(capability: CapabilityType): Carrier[] {
  return mockCarriers.filter(carrier => 
    carrier.capabilities.includes(capability)
  )
}

// Helper function to get carriers by service area
export function getCarriersByArea(area: string): Carrier[] {
  return mockCarriers.filter(carrier =>
    carrier.serviceAreas.some(serviceArea => 
      serviceArea.toLowerCase().includes(area.toLowerCase()) ||
      area.toLowerCase().includes(serviceArea.toLowerCase())
    )
  )
}

// Helper function to get carriers by specialty
export function getCarriersBySpecialty(specialty: MaterialType): Carrier[] {
  return mockCarriers.filter(carrier =>
    carrier.specialties.includes(specialty)
  )
}
