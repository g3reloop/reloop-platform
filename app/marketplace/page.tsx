'use client'

import { useState } from 'react'
import { FiPlus, FiTruck, FiPackage, FiDollarSign, FiShield, FiAward, FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { marketplaceContent } from '@/data/marketplaceContent'

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showJoinModal, setShowJoinModal] = useState(false)

  const handleJoinNetwork = (type: 'producer' | 'processor') => {
    // Navigate to registration with type parameter
    window.location.href = `/join?type=${type}`
    toast.success(`Let's get you started as a ${type}!`)
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-mythic-primary-500 to-mythic-accent-300 bg-clip-text text-transparent">
              {marketplaceContent.hero.title}
            </span>
          </h1>
          <p className="text-xl text-mythic-text-muted max-w-3xl mx-auto mb-4">
            {marketplaceContent.hero.subtitle}
          </p>
          <p className="text-lg text-mythic-text-muted max-w-2xl mx-auto mb-8">
            {marketplaceContent.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace/browse"
              className="inline-flex items-center gap-2 px-6 py-3 bg-mythic-primary-500 text-white rounded-lg hover:bg-mythic-primary-600 transition-all font-medium"
            >
              <FiPackage className="h-5 w-5" />
              Browse All Listings
            </Link>
            <Link
              href="/marketplace/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-mythic-dark-800 text-mythic-text-primary rounded-lg hover:bg-mythic-dark-700 transition-all font-medium border border-mythic-primary-500/20"
            >
              <FiPlus className="h-5 w-5" />
              Create Listing
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-mythic-text-primary">
            {marketplaceContent.stats.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {marketplaceContent.stats.metrics.map((stat, index) => (
              <div key={index} className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-6 text-center hover:border-mythic-primary-500/40 transition-all">
                <div className="text-3xl font-bold text-mythic-primary-500 mb-2">{stat.value}</div>
                <div className="text-sm text-mythic-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why ReLoop Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-mythic-text-primary">
            {marketplaceContent.uniquePosition.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketplaceContent.uniquePosition.points.map((point, index) => (
              <div key={index} className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-6 hover:border-mythic-primary-500/40 transition-all">
                <h3 className="text-lg font-semibold text-mythic-text-primary mb-3">{point.title}</h3>
                <p className="text-mythic-text-muted text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-mythic-text-primary">
            Transform Waste into Value
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(marketplaceContent.categories).map(([key, category]) => (
              <div key={key} className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 overflow-hidden hover:border-mythic-primary-500/40 transition-all">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-mythic-text-primary">{category.title}</h3>
                    {key === 'food-waste' && <FiPackage className="h-6 w-6 text-mythic-primary-500" />}
                    {key === 'cooking-oil' && <FiTruck className="h-6 w-6 text-mythic-accent-500" />}
                    {key === 'carbon-credits' && <FiShield className="h-6 w-6 text-mythic-secondary-500" />}
                  </div>
                  <p className="text-mythic-text-muted mb-4">{category.description}</p>
                  <ul className="space-y-2 mb-6">
                    {category.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-mythic-text-muted">
                        <span className="text-mythic-primary-500 mt-0.5">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleJoinNetwork('producer')}
                    className="w-full px-4 py-2 bg-mythic-primary-500/10 text-mythic-primary-500 rounded-lg hover:bg-mythic-primary-500/20 transition-all border border-mythic-primary-500/20"
                  >
                    {category.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(marketplaceContent.callToAction).map(([key, cta]) => (
            <div key={key} className="bg-gradient-to-br from-mythic-dark-800 to-mythic-dark-700 rounded-xl border border-mythic-primary-500/30 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-mythic-primary-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-mythic-text-primary mb-3">{cta.title}</h3>
                <p className="text-mythic-text-muted mb-6">{cta.description}</p>
                <ul className="space-y-2 mb-6">
                  {cta.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-mythic-text-primary">
                      <FiAward className="h-4 w-4 text-mythic-primary-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleJoinNetwork(key as 'producer' | 'processor')}
                  className="flex items-center gap-2 px-6 py-3 bg-mythic-primary-500 text-white rounded-lg hover:bg-mythic-primary-600 transition-all font-medium"
                >
                  {cta.buttonText}
                  <FiArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
