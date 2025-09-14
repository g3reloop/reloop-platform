'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { MarketplaceListings } from '@/components/marketplace/MarketplaceListings'
import { MythicBackground } from '@/components/MythicBackground'

export default function MarketplaceBrowsePage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Mythic Background */}
      <MythicBackground variant="flow" opacity={0.03} />
      
      <div className="relative pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 text-mythic-text-muted hover:text-mythic-text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace Home
            </Link>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-mythic-primary-500 to-mythic-accent-300 bg-clip-text text-transparent">
                Browse All Listings
              </span>
            </h1>
            <p className="text-xl text-mythic-text-muted max-w-3xl">
              Discover waste streams, recycled products, and services. Connect directly with verified partners in the circular economy.
            </p>
          </motion.div>

          {/* Listings Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <MarketplaceListings />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
