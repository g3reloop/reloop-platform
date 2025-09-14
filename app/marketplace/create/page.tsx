'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ListingForm } from '@/components/marketplace/ListingForm'

export default function CreateListingPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-mythic-text-muted hover:text-mythic-text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-8">
          <h1 className="text-3xl font-bold text-mythic-text-primary mb-2">Create New Listing</h1>
          <p className="text-mythic-text-muted mb-8">
            List your waste streams, recycled products, or services on the ReLoop marketplace.
          </p>
          
          <ListingForm />
        </div>
      </div>
    </div>
  )
}
