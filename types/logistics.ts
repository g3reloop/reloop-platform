// Logistics TypeScript interfaces and types

export interface Carrier {
  id: string
  name: string
  logo?: string
  description: string
  capabilities: string[]
  certifications: string[]
  serviceAreas: string[]
  vehicleTypes: string[]
  specialties: string[]
  contact: {
    phone?: string
    email?: string
    website?: string
  }
  stats: {
    fleetSize: number
    yearsInBusiness: number
    monthlyCapacity: string
  }
  rating: number
  verified: boolean
}

export interface RouteStop {
  id: string
  name: string
  lat: number
  lng: number
  address: string
  timeWindow?: {
    start: string // HH:MM
    end: string   // HH:MM
  }
  serviceDuration?: number // minutes
  demand?: number // quantity to pick up/deliver in kg
  volume?: number // for marketplace integration
  notes?: string
}

export interface RouteConstraints {
  vehicleCapacity?: number // kg
  maxDrivingTime?: number // minutes
  maxDistance?: number // km
  adrClass?: string
  temperatureControl?: boolean
  tunnelRestrictions?: string[]
  avoidAreas?: Array<{ lat: number; lng: number; radius: number }>
  avoidTolls?: boolean
  avoidHighways?: boolean
  vehicleType?: string
}

export interface RouteResult {
  stops: RouteStop[]
  totalDistance: number
  totalTime: number
  totalCO2: number
  segments: RouteSegment[]
  warnings: string[]
}

export interface RouteSegment {
  from: RouteStop
  to: RouteStop
  distance: number
  duration: number
  co2Emissions: number
  mode: 'road' | 'rail' | 'sea'
}

export interface CarrierSuggestion {
  name: string
  capabilities: string[]
  certifications: string[]
  serviceAreas: string[]
  score: number
  reasons: string[]
}

export interface SavedRoute {
  id: string
  name: string
  waypoints: {
    id: string
    name: string
    address: string
    volume: number
    order: number
  }[]
  totals: {
    distance: number
    duration: number
    emissions: number
    cost: number
    volume: number
  }
  carrier?: {
    id: string
    name: string
    rating: number
    price: number
    responseTime: string
  }
  createdAt: string
  lastUsed: string
}

export interface OptimizationRequest {
  stops: RouteStop[]
  constraints: RouteConstraints
  materialType?: string
  region?: string
}

export interface OptimizationResponse {
  route: RouteResult
  carriers: CarrierSuggestion[]
}

// Enums
export enum MaterialType {
  FOOD_WASTE = 'food_waste',
  UCO = 'uco',
  BULK_LIQUID = 'bulk_liquid',
  HAZARDOUS = 'hazardous',
  INDUSTRIAL = 'industrial',
  AGRICULTURAL = 'agricultural',
  RECYCLABLES = 'recyclables',
  MEDICAL = 'medical',
  CHEMICAL = 'chemical'
}

export enum CapabilityType {
  TEMPERATURE_CONTROL = 'temperature_control',
  ADR_CERTIFIED = 'adr_certified',
  REAL_TIME_TRACKING = 'real_time_tracking',
  BULK_TRANSPORT = 'bulk_transport',
  HAZARDOUS_WASTE = 'hazardous_waste',
  RAIL_ACCESS = 'rail_access',
  CARBON_NEUTRAL = 'carbon_neutral',
  TWENTY_FOUR_SEVEN = '24_7_service',
  EMERGENCY_RESPONSE = 'emergency_response',
  MICRO_COLLECTION = 'micro_collection',
  ELECTRIC_VEHICLES = 'electric_vehicles',
  FLEXIBLE_SCHEDULING = 'flexible_scheduling',
  PROCESSING_PARTNER = 'processing_partner',
  CARBON_TRACKING = 'carbon_tracking'
}

export enum CertificationType {
  ISO_14001 = 'ISO 14001',
  ISO_9001 = 'ISO 9001',
  ISO_45001 = 'ISO 45001',
  FORS_GOLD = 'FORS Gold',
  FORS_SILVER = 'FORS Silver',
  ADR_LICENSE = 'ADR License',
  WAMITAB = 'WAMITAB',
  ISCC = 'ISCC',
  ISCC_EU = 'ISCC EU',
  CARBON_TRUST = 'Carbon Trust Standard',
  RHA_MEMBER = 'RHA Member',
  HAZARDOUS_WASTE = 'Hazardous Waste License',
  CHAS = 'CHAS',
  ULTRA_LOW_EMISSION = 'Ultra Low Emission',
  B_CORP = 'B Corp Certified'
}
