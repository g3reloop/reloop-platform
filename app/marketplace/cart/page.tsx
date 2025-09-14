'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const router = useRouter()

  const handleCheckout = () => {
    toast.success('Join our waitlist to start transacting on ReLoop!')
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

        <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-8 text-center">
          <ShoppingCart className="h-16 w-16 text-mythic-primary-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-mythic-text-primary mb-4">Your Cart</h1>
          
          <div className="space-y-6">
            <div className="bg-mythic-primary-500/10 border border-mythic-primary-500/20 rounded-lg p-6">
              <p className="text-mythic-text-primary mb-2">
                <strong>Cart functionality coming soon!</strong>
              </p>
              <p className="text-mythic-text-muted">
                ReLoop is building the infrastructure for seamless waste-to-value transactions. 
                Join our waitlist to be notified when you can start buying and selling on the platform.
              </p>
            </div>

            <div className="space-y-4 text-left">
              <h2 className="text-xl font-semibold text-mythic-text-primary">What's coming:</h2>
              <ul className="space-y-2 text-mythic-text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Smart contract-based escrow for secure transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Real-time pricing based on quality and demand</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Integrated logistics and route optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mythic-primary-500 mt-0.5">•</span>
                  <span>Automatic carbon credit generation</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full px-6 py-3 bg-mythic-primary-500 text-white rounded-lg hover:bg-mythic-primary-600 transition-all font-medium"
            >
              Join Waitlist for Early Access
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
