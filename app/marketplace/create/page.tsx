'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CreateListingPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('ReLoop is currently in private beta. Join our waitlist to start listing!')
    router.push('/join')
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-2xl">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-mythic-text-muted hover:text-mythic-text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-8">
          <h1 className="text-3xl font-bold text-mythic-text-primary mb-6">Create New Listing</h1>
          
          <div className="space-y-6">
            <div className="bg-mythic-primary-500/10 border border-mythic-primary-500/20 rounded-lg p-4">
              <p className="text-mythic-text-primary">
                <strong>Coming Soon!</strong> ReLoop marketplace is currently in private beta.
              </p>
              <p className="text-mythic-text-muted mt-2">
                We're building the world's first decentralized waste-to-value platform. Join our waitlist to be notified when you can start listing your waste streams or recycled products.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-mythic-text-primary">What you'll be able to list:</h2>
              <ul className="space-y-2 text-mythic-text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Food waste streams from restaurants, hotels, and food processors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Used cooking oil and grease trap waste</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Recycled products like biodiesel and biogas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Verified carbon credits from waste diversion</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-mythic-primary-500 text-white rounded-lg hover:bg-mythic-primary-600 transition-all font-medium"
            >
              Join Waitlist to Start Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
