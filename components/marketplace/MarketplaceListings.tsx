'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  Search, Filter, MapPin, Package, Calendar, 
  TrendingUp, DollarSign, Truck, ArrowUpDown,
  Eye, Heart, Share2, Badge
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge as BadgeUI } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface Listing {
  id: string
  title: string
  type: 'supply' | 'demand' | 'service'
  category: string
  quantity: number
  unit: string
  location: string
  price?: number
  priceUnit?: string
  frequency: string
  description: string
  certifications?: string[]
  postedBy: string
  postedDate: string
  views: number
  saved: number
  verified: boolean
  imageUrl?: string
}

// Mock data for demonstration
const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Premium Used Cooking Oil - Brighton Area',
    type: 'supply',
    category: 'uco',
    quantity: 500,
    unit: 'liters',
    location: 'Brighton, UK',
    price: 0.85,
    priceUnit: 'liter',
    frequency: 'weekly',
    description: 'High-quality UCO from established restaurant chain. ISCC certified collection process.',
    certifications: ['ISCC', 'ISO 14001'],
    postedBy: 'Brighton Restaurant Group',
    postedDate: '2024-01-24',
    views: 234,
    saved: 12,
    verified: true,
    imageUrl: '/api/placeholder/400/300'
  },
  {
    id: '2',
    title: 'Food Waste Collection Service - London',
    type: 'service',
    category: 'transport',
    quantity: 1000,
    unit: 'kg',
    location: 'Greater London',
    price: 45,
    priceUnit: 'tonne',
    frequency: 'daily',
    description: 'Professional waste collection with full chain of custody tracking. All vehicles ADR certified.',
    certifications: ['ADR', 'Waste Carrier License'],
    postedBy: 'EcoFleet Logistics',
    postedDate: '2024-01-23',
    views: 189,
    saved: 8,
    verified: true
  },
  {
    id: '3',
    title: 'Seeking Biodiesel Supplier - Bristol',
    type: 'demand',
    category: 'biodiesel',
    quantity: 5000,
    unit: 'liters',
    location: 'Bristol, UK',
    frequency: 'monthly',
    description: 'Local transport company seeking reliable biodiesel supplier. Long-term contract available.',
    postedBy: 'Bristol Transport Co',
    postedDate: '2024-01-22',
    views: 156,
    saved: 5,
    verified: false
  },
  {
    id: '4',
    title: 'Organic Food Waste - Hotel Chain',
    type: 'supply',
    category: 'food-waste',
    quantity: 2.5,
    unit: 'tonnes',
    location: 'Manchester, UK',
    price: 0,
    priceUnit: 'free',
    frequency: 'weekly',
    description: 'Clean source-separated food waste from 5-star hotel. Available for collection 7 days/week.',
    certifications: ['PAS 100'],
    postedBy: 'Luxury Hotels Group',
    postedDate: '2024-01-21',
    views: 298,
    saved: 15,
    verified: true
  },
  {
    id: '5',
    title: 'AD Facility Accepting Food Waste',
    type: 'demand',
    category: 'food-waste',
    quantity: 100,
    unit: 'tonnes',
    location: 'Birmingham, UK',
    price: 25,
    priceUnit: 'tonne',
    frequency: 'daily',
    description: 'Modern AD facility with spare capacity. Competitive gate fees and carbon credits available.',
    certifications: ['EA Permit', 'REAL CCS'],
    postedBy: 'Midlands Biogas Ltd',
    postedDate: '2024-01-20',
    views: 412,
    saved: 22,
    verified: true
  },
  {
    id: '6',
    title: 'Grease Trap Waste Collection',
    type: 'supply',
    category: 'grease-trap',
    quantity: 300,
    unit: 'gallons',
    location: 'Leeds, UK',
    frequency: 'monthly',
    description: 'Regular grease trap waste from shopping center food court. Needs reliable collection partner.',
    postedBy: 'Trinity Leeds',
    postedDate: '2024-01-19',
    views: 87,
    saved: 3,
    verified: false
  }
]

export function MarketplaceListings() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'supply' | 'demand' | 'service'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'views' | 'price'>('recent')
  const [showFilters, setShowFilters] = useState(true)

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    let filtered = mockListings

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(listing => listing.type === typeFilter)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(listing => listing.category === categoryFilter)
    }

    // Sort
    switch (sortBy) {
      case 'views':
        filtered = [...filtered].sort((a, b) => b.views - a.views)
        break
      case 'price':
        filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case 'recent':
      default:
        filtered = [...filtered].sort((a, b) => 
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        )
    }

    return filtered
  }, [searchTerm, typeFilter, categoryFilter, sortBy])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'supply': return 'bg-green-500/20 text-green-400 border-green-500/20'
      case 'demand': return 'bg-blue-500/20 text-blue-400 border-blue-500/20'
      case 'service': return 'bg-purple-500/20 text-purple-400 border-purple-500/20'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food-waste': return <Package className="h-5 w-5" />
      case 'uco': return <Truck className="h-5 w-5" />
      case 'transport': return <Truck className="h-5 w-5" />
      case 'biodiesel': return <Package className="h-5 w-5" />
      default: return <Package className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-mythic-text-muted" />
              <Input
                type="text"
                placeholder="Search listings by title, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-mythic-dark-700 border-mythic-primary-500/20"
              />
            </div>
          </div>

          {/* Filters Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-mythic-primary-500/20"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-mythic-primary-500/10"
          >
            <div className="grid md:grid-cols-3 gap-4">
              {/* Type Filter */}
              <div>
                <label className="text-sm text-mythic-text-muted mb-1 block">Type</label>
                <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
                  <SelectTrigger className="bg-mythic-dark-700 border-mythic-primary-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="supply">Supply</SelectItem>
                    <SelectItem value="demand">Demand</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-sm text-mythic-text-muted mb-1 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-mythic-dark-700 border-mythic-primary-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="food-waste">Food Waste</SelectItem>
                    <SelectItem value="uco">Used Cooking Oil</SelectItem>
                    <SelectItem value="grease-trap">Grease Trap</SelectItem>
                    <SelectItem value="biodiesel">Biodiesel</SelectItem>
                    <SelectItem value="biogas">Biogas</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-sm text-mythic-text-muted mb-1 block">Sort By</label>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="bg-mythic-dark-700 border-mythic-primary-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="views">Most Viewed</SelectItem>
                    <SelectItem value="price">Price (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-mythic-text-muted">
          Found <span className="text-mythic-text-primary font-semibold">{filteredListings.length}</span> listings
        </p>
        <Link
          href="/marketplace/create"
          className="flex items-center gap-2 px-4 py-2 bg-mythic-primary-500 text-white rounded-lg hover:bg-mythic-primary-600 transition-all"
        >
          <Package className="h-4 w-4" />
          Create Listing
        </Link>
      </div>

      {/* Listings Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 overflow-hidden hover:border-mythic-primary-500/40 transition-all"
          >
            {/* Image (if available) */}
            {listing.imageUrl && (
              <div className="aspect-video bg-mythic-dark-700">
                <img 
                  src={listing.imageUrl} 
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeUI className={`${getTypeColor(listing.type)} text-xs`}>
                      {listing.type.toUpperCase()}
                    </BadgeUI>
                    {listing.verified && (
                      <Badge className="h-4 w-4 text-mythic-primary-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-mythic-text-primary line-clamp-2">
                    {listing.title}
                  </h3>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-mythic-text-muted">
                  <MapPin className="h-4 w-4" />
                  {listing.location}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-mythic-text-primary font-semibold">
                    {listing.quantity} {listing.unit}
                  </span>
                  {listing.price !== undefined && (
                    <span className="text-mythic-accent-300">
                      {listing.price === 0 ? 'Free' : `£${listing.price}/${listing.priceUnit}`}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-mythic-text-muted">
                  <Calendar className="h-4 w-4" />
                  {listing.frequency}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-mythic-text-muted line-clamp-2 mb-4">
                {listing.description}
              </p>

              {/* Certifications */}
              {listing.certifications && listing.certifications.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.certifications.map((cert, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2 py-1 bg-mythic-primary-500/10 text-mythic-primary-500 rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-mythic-primary-500/10">
                <div className="flex items-center gap-4 text-xs text-mythic-text-muted">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {listing.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {listing.saved}
                  </span>
                </div>
                <Link
                  href={`/marketplace/${listing.id}`}
                  className="text-sm text-mythic-primary-500 hover:text-mythic-primary-400 font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-mythic-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mythic-text-primary mb-2">No listings found</h3>
          <p className="text-mythic-text-muted">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  )
}
