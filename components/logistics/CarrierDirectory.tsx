'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Truck,
  Shield,
  Award,
  MapPin,
  Package,
  Thermometer,
  AlertTriangle,
  Users,
  ArrowRight,
  Star
} from 'lucide-react'

export function CarrierDirectory() {
  const router = useRouter()
  const [showJoinModal, setShowJoinModal] = useState(false)

  const handleJoinAsCarrier = () => {
    setShowJoinModal(true)
    toast.success('Let\'s get you set up as a ReLoop carrier partner!')
  }

  const handleContactCarrier = () => {
    toast('Join our network to connect with verified carriers')
    router.push('/join')
  }

  const carrierBenefits = [
    {
      icon: <Package className="h-6 w-6" />,
      title: "Consistent Loads",
      description: "AI-optimized route planning ensures steady work flow"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Guaranteed Payment",
      description: "Smart contracts ensure instant payment on delivery"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Reputation Building",
      description: "Build your trust score and unlock premium routes"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Route Optimization",
      description: "Minimize empty miles with intelligent backhaul matching"
    }
  ]

  const capabilities = [
    {
      type: "Temperature Controlled",
      icon: <Thermometer className="h-5 w-5" />,
      description: "For food waste requiring cold chain"
    },
    {
      type: "ADR Certified",
      icon: <AlertTriangle className="h-5 w-5" />,
      description: "For hazardous waste transport"
    },
    {
      type: "Bulk Liquid",
      icon: <Truck className="h-5 w-5" />,
      description: "Specialized tankers for UCO"
    },
    {
      type: "Multi-Modal",
      icon: <Package className="h-5 w-5" />,
      description: "Rail and sea freight options"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-mythic-text-primary mb-4">
          ReLoop Carrier Network
        </h2>
        <p className="text-lg text-mythic-text-muted max-w-2xl mx-auto">
          Join the world's first decentralized logistics network for the circular economy. 
          We're building the infrastructure to move waste efficiently and profitably.
        </p>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-mythic-primary-500/20">
          <CardContent className="text-center p-6">
            <div className="text-3xl font-bold text-mythic-primary-500">0</div>
            <div className="text-sm text-mythic-text-muted">Active Carriers</div>
            <div className="text-xs text-mythic-primary-500 mt-1">Launching Soon</div>
          </CardContent>
        </Card>
        <Card className="border-mythic-primary-500/20">
          <CardContent className="text-center p-6">
            <div className="text-3xl font-bold text-mythic-primary-500">15+</div>
            <div className="text-sm text-mythic-text-muted">AI Agents</div>
            <div className="text-xs text-mythic-primary-500 mt-1">Ready to Optimize</div>
          </CardContent>
        </Card>
        <Card className="border-mythic-primary-500/20">
          <CardContent className="text-center p-6">
            <div className="text-3xl font-bold text-mythic-primary-500">∞</div>
            <div className="text-sm text-mythic-text-muted">Route Potential</div>
            <div className="text-xs text-mythic-primary-500 mt-1">Zero Empty Miles</div>
          </CardContent>
        </Card>
        <Card className="border-mythic-primary-500/20">
          <CardContent className="text-center p-6">
            <div className="text-3xl font-bold text-mythic-primary-500">24/7</div>
            <div className="text-sm text-mythic-text-muted">AI Support</div>
            <div className="text-xs text-mythic-primary-500 mt-1">Always Optimizing</div>
          </CardContent>
        </Card>
      </div>

      {/* Why Join Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Why Carriers Choose ReLoop
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carrierBenefits.map((benefit, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-mythic-primary-500/10 text-mythic-primary-500">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-mythic-text-primary">{benefit.title}</h3>
                </div>
                <p className="text-sm text-mythic-text-muted">{benefit.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Capabilities Section */}
      <Card>
        <CardHeader>
          <CardTitle>Required Capabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {capabilities.map((cap, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-mythic-primary-500/20">
                <div className="p-2 rounded bg-mythic-primary-500/10 text-mythic-primary-500">
                  {cap.icon}
                </div>
                <div>
                  <h4 className="font-medium text-mythic-text-primary">{cap.type}</h4>
                  <p className="text-sm text-mythic-text-muted">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-br from-mythic-dark-800 to-mythic-dark-700 border-mythic-primary-500/30">
        <CardContent className="text-center py-12">
          <Truck className="h-16 w-16 text-mythic-primary-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-mythic-text-primary mb-4">
            Become a ReLoop Carrier Partner
          </h3>
          <p className="text-mythic-text-muted max-w-2xl mx-auto mb-8">
            Join our waitlist to be among the first carriers in the ReLoop network. 
            Get early access to routes, preferential rates, and shape the future of sustainable logistics.
          </p>
          <Button 
            onClick={handleJoinAsCarrier}
            className="px-8 py-3 text-lg"
          >
            Join as a Carrier
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-mythic-text-primary mb-4">Join as a Carrier Partner</h3>
            <p className="text-mythic-text-muted mb-6">
              ReLoop is currently onboarding select carrier partners for our beta launch. 
              Join our waitlist to secure your spot in the network.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => router.push('/join')}
                className="w-full"
              >
                Complete Application
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowJoinModal(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
