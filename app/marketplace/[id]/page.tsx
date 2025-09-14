'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { 
  ArrowLeft, MapPin, Calendar, Shield, Award, 
  Phone, Mail, Globe, MessageCircle, ShoppingCart,
  TrendingUp, Eye, Heart, Share2, Badge
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge as BadgeUI } from '@/components/ui/badge'

// Mock data for a single listing - in production this would come from API
const mockListing = {
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
  description: `High-quality used cooking oil from an established restaurant chain in Brighton. 
  
  We maintain strict quality controls with regular testing for FFA levels and contamination. Our UCO is collected fresh weekly and stored in food-grade containers. Perfect for biodiesel production with consistent quality metrics.
  
  Collection available 7 days a week with flexible scheduling. We can accommodate regular weekly pickups or on-demand collection based on your needs.`,
  certifications: ['ISCC', 'ISO 14001', 'UK Waste Carrier License'],
  postedBy: 'Brighton Restaurant Group',
  postedDate: '2024-01-24',
  views: 234,
  saved: 12,
  verified: true,
  contactName: 'James Wilson',
  contactRole: 'Sustainability Manager',
  memberSince: '2023',
  responseRate: '98%',
  images: [
    '/api/placeholder/600/400',
    '/api/placeholder/600/400',
    '/api/placeholder/600/400'
  ],
  specifications: {
    'FFA Level': '< 3%',
    'Water Content': '< 0.5%',
    'Storage': 'Food-grade IBC containers',
    'Min Order': '200 liters',
    'Lead Time': '24 hours'
  }
}

export default function ListingDetailPage() {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const handleAddToCart = () => {
    toast.success('Added to cart!')
    // In production, this would add to cart state/context
  }

  const handleContact = () => {
    // In production, this would open contact modal or initiate chat
    toast.success('Contact request sent to supplier')
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Removed from saved items' : 'Saved to your list')
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'supply': return 'bg-green-500/20 text-green-400 border-green-500/20'
      case 'demand': return 'bg-blue-500/20 text-blue-400 border-blue-500/20'
      case 'service': return 'bg-purple-500/20 text-purple-400 border-purple-500/20'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        <Link
          href="/marketplace/browse"
          className="inline-flex items-center gap-2 text-mythic-text-muted hover:text-mythic-text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 overflow-hidden">
              <div className="aspect-video bg-mythic-dark-700">
                <img 
                  src={mockListing.images[selectedImage]} 
                  alt={mockListing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex gap-2">
                {mockListing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx 
                        ? 'border-mythic-primary-500' 
                        : 'border-mythic-primary-500/20'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <BadgeUI className={`${getTypeColor(mockListing.type)} text-xs`}>
                      {mockListing.type.toUpperCase()}
                    </BadgeUI>
                    {mockListing.verified && (
                      <div className="flex items-center gap-1 text-mythic-primary-500">
                        <Badge className="h-4 w-4" />
                        <span className="text-sm">Verified</span>
                      </div>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-mythic-text-primary mb-2">
                    {mockListing.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-mythic-text-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {mockListing.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {mockListing.frequency}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className={`p-2 rounded-lg transition-colors ${
                      isSaved 
                        ? 'bg-mythic-primary-500/20 text-mythic-primary-500' 
                        : 'hover:bg-mythic-primary-500/10 text-mythic-text-muted'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 hover:bg-mythic-primary-500/10 rounded-lg transition-colors text-mythic-text-muted">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-mythic-text-primary mb-3">Description</h3>
                <p className="text-mythic-text-muted whitespace-pre-line">
                  {mockListing.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-mythic-text-primary mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(mockListing.specifications).map(([key, value]) => (
                    <div key={key} className="bg-mythic-dark-700 rounded-lg p-3">
                      <p className="text-sm text-mythic-text-muted">{key}</p>
                      <p className="font-semibold text-mythic-text-primary">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-mythic-text-primary mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {mockListing.certifications.map((cert, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-mythic-primary-500/10 text-mythic-primary-500 rounded-full text-sm flex items-center gap-1"
                    >
                      <Shield className="h-3 w-3" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pricing & Action */}
            <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-6">
              <div className="mb-6">
                <p className="text-sm text-mythic-text-muted mb-1">Price</p>
                <p className="text-3xl font-bold text-mythic-accent-300">
                  £{mockListing.price}
                  <span className="text-lg text-mythic-text-muted">/{mockListing.priceUnit}</span>
                </p>
                <p className="text-sm text-mythic-text-muted mt-1">
                  {mockListing.quantity} {mockListing.unit} available {mockListing.frequency}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-mythic-primary-500 hover:bg-mythic-primary-600 text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleContact}
                  variant="outline"
                  className="w-full border-mythic-primary-500/20"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Supplier
                </Button>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-mythic-text-muted">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {mockListing.views} views
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {mockListing.saved} saved
                </span>
              </div>
            </div>

            {/* Supplier Info */}
            <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-6">
              <h3 className="text-lg font-semibold text-mythic-text-primary mb-4">Supplier Information</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-mythic-text-muted">Company</p>
                  <p className="font-semibold text-mythic-text-primary">{mockListing.postedBy}</p>
                </div>
                
                <div>
                  <p className="text-sm text-mythic-text-muted">Contact Person</p>
                  <p className="font-semibold text-mythic-text-primary">{mockListing.contactName}</p>
                  <p className="text-sm text-mythic-text-muted">{mockListing.contactRole}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-mythic-primary-500/10">
                  <div>
                    <p className="text-sm text-mythic-text-muted">Member Since</p>
                    <p className="font-semibold text-mythic-text-primary">{mockListing.memberSince}</p>
                  </div>
                  <div>
                    <p className="text-sm text-mythic-text-muted">Response Rate</p>
                    <p className="font-semibold text-green-400">{mockListing.responseRate}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-mythic-primary-500/10 space-y-2">
                  <button className="w-full text-left flex items-center gap-2 text-sm text-mythic-text-muted hover:text-mythic-text-primary transition-colors">
                    <Globe className="h-4 w-4" />
                    View Company Profile
                  </button>
                  <button className="w-full text-left flex items-center gap-2 text-sm text-mythic-text-muted hover:text-mythic-text-primary transition-colors">
                    <Award className="h-4 w-4" />
                    View All Listings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
