'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ListingDetailPage() {
  const router = useRouter()

  const handleContact = () => {
    toast.success('Join our network to connect with suppliers!')
    router.push('/join')
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-mythic-text-muted hover:text-mythic-text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-mythic-text-primary mb-6">
              Listing Details
            </h1>
            
            <div className="bg-mythic-primary-500/10 border border-mythic-primary-500/20 rounded-lg p-6 mb-8">
              <p className="text-mythic-text-primary font-medium mb-2">
                Individual listings coming soon!
              </p>
              <p className="text-mythic-text-muted">
                ReLoop marketplace is currently in private beta. Soon you'll be able to view detailed information about:
              </p>
              <ul className="mt-4 space-y-2 text-mythic-text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Real-time availability and pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Quality certifications and test results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Supplier reputation and reviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Carbon credit potential</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleContact}
              className="w-full px-6 py-3 bg-mythic-primary-500 text-white rounded-lg hover:bg-mythic-primary-600 transition-all font-medium"
            >
              Join Waitlist for Market Access
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
