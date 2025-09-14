'use client'

import { useState, useRef } from 'react'
import { X, Upload, Camera, MapPin, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'react-hot-toast'

interface WTNFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function WTNFormModal({ isOpen, onClose, onSubmit }: WTNFormModalProps) {
  const [formData, setFormData] = useState({
    wasteType: '',
    origin: '',
    destination: '',
    quantity: '',
    collectionDate: '',
    collectionTime: '',
    vehicleReg: '',
    driverName: '',
    notes: '',
    ewcCode: '',
    sicCode: '',
  })

  const [photos, setPhotos] = useState<{ collection: File | null; delivery: File | null }>({
    collection: null,
    delivery: null,
  })

  const [location, setLocation] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  })

  const collectionPhotoRef = useRef<HTMLInputElement>(null)
  const deliveryPhotoRef = useRef<HTMLInputElement>(null)

  const handlePhotoChange = (type: 'collection' | 'delivery', file: File | null) => {
    setPhotos(prev => ({ ...prev, [type]: file }))
  }

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          toast.success('Location captured successfully')
        },
        (error) => {
          toast.error('Failed to get location. Please enable location services.')
        }
      )
    } else {
      toast.error('Geolocation is not supported by your browser')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.wasteType || !formData.origin || !formData.destination || !formData.quantity) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!photos.collection) {
      toast.error('Collection photo is required for chain of custody')
      return
    }

    if (!location.lat || !location.lng) {
      toast.error('Location data is required')
      return
    }

    // Submit data
    const submitData = {
      ...formData,
      photos,
      location,
      timestamp: new Date().toISOString(),
    }

    onSubmit(submitData)
    toast.success('WTN created successfully')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-mythic-dark-800 rounded-xl border border-mythic-primary-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-mythic-primary-500/20">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-mythic-text-primary">Create Waste Transfer Note</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-mythic-primary-500/10 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-mythic-text-muted" />
            </button>
          </div>
          <p className="text-mythic-text-muted mt-2">
            Complete all fields to ensure regulatory compliance
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Waste Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-mythic-text-primary">Waste Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="wasteType">Waste Type*</Label>
                <Select
                  value={formData.wasteType}
                  onValueChange={(value) => setFormData({ ...formData, wasteType: value })}
                >
                  <SelectTrigger className="bg-mythic-dark-700 border-mythic-primary-500/20">
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food-waste">Food Waste</SelectItem>
                    <SelectItem value="uco">Used Cooking Oil</SelectItem>
                    <SelectItem value="grease-trap">Grease Trap Waste</SelectItem>
                    <SelectItem value="mixed-organic">Mixed Organic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity (kg)*</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="bg-mythic-dark-700 border-mythic-primary-500/20"
                  placeholder="Enter quantity"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ewcCode">EWC Code</Label>
                <Input
                  id="ewcCode"
                  value={formData.ewcCode}
                  onChange={(e) => setFormData({ ...formData, ewcCode: e.target.value })}
                  className="bg-mythic-dark-700 border-mythic-primary-500/20"
                  placeholder="e.g., 20 01 08"
                />
              </div>

              <div>
                <Label htmlFor="sicCode">SIC Code</Label>
                <Input
                  id="sicCode"
                  value={formData.sicCode}
                  onChange={(e) => setFormData({ ...formData, sicCode: e.target.value })}
                  className="bg-mythic-dark-700 border-mythic-primary-500/20"
                  placeholder="e.g., 56101"
                />
              </div>
            </div>
          </div>

          {/* Collection Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-mythic-text-primary">Collection Details</h3>
            
            <div>
              <Label htmlFor="origin">Collection Point*</Label>
              <Input
                id="origin"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="bg-mythic-dark-700 border-mythic-primary-500/20"
                placeholder="Enter collection address"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="collectionDate">Collection Date*</Label>
                <Input
                  id="collectionDate"
                  type="date"
                  value={formData.collectionDate}
                  onChange={(e) => setFormData({ ...formData, collectionDate: e.target.value })}
                  className="bg-mythic-dark-700 border-mythic-primary-500/20"
                  required
                />
              </div>

              <div>
                <Label htmlFor="collectionTime">Collection Time*</Label>
                <Input
                  id="collectionTime"
                  type="time"
                  value={formData.collectionTime}
                  onChange={(e) => setFormData({ ...formData, collectionTime: e.target.value })}
                  className="bg-mythic-dark-700 border-mythic-primary-500/20"
                  required
                />
              </div>
            </div>
          </div>

          {/* Transport Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-mythic-text-primary">Transport Details</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vehicleReg">Vehicle Registration*</Label>
                <Input
                  id="vehicleReg"
                  value={formData.vehicleReg}
                  onChange={(e) => setFormData({ ...formData, vehicleReg: e.target.value })}
                  className="bg-mythic-dark-700 border-mythic-primary-500/20"
                  placeholder="e.g., AB12 CDE"
                  required
                />
              </div>

              <div>
                <Label htmlFor="driverName">Driver Name*</Label>
                <Input
                  id="driverName"
                  value={formData.driverName}
                  onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                  className="bg-mythic-dark-700 border-mythic-primary-500/20"
                  placeholder="Enter driver name"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="destination">Delivery Destination*</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="bg-mythic-dark-700 border-mythic-primary-500/20"
                placeholder="Enter destination address"
                required
              />
            </div>
          </div>

          {/* Evidence Collection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-mythic-text-primary">Evidence Collection</h3>
            
            {/* Photo Upload */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Collection Photo*</Label>
                <div
                  onClick={() => collectionPhotoRef.current?.click()}
                  className="mt-2 border-2 border-dashed border-mythic-primary-500/20 rounded-lg p-4 text-center cursor-pointer hover:border-mythic-primary-500/40 transition-colors"
                >
                  <input
                    ref={collectionPhotoRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoChange('collection', e.target.files?.[0] || null)}
                  />
                  {photos.collection ? (
                    <div className="space-y-2">
                      <Check className="h-8 w-8 text-green-500 mx-auto" />
                      <p className="text-sm text-mythic-text-primary">{photos.collection.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Camera className="h-8 w-8 text-mythic-text-muted mx-auto" />
                      <p className="text-sm text-mythic-text-muted">Click to upload photo</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Delivery Photo (Optional)</Label>
                <div
                  onClick={() => deliveryPhotoRef.current?.click()}
                  className="mt-2 border-2 border-dashed border-mythic-primary-500/20 rounded-lg p-4 text-center cursor-pointer hover:border-mythic-primary-500/40 transition-colors"
                >
                  <input
                    ref={deliveryPhotoRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoChange('delivery', e.target.files?.[0] || null)}
                  />
                  {photos.delivery ? (
                    <div className="space-y-2">
                      <Check className="h-8 w-8 text-green-500 mx-auto" />
                      <p className="text-sm text-mythic-text-primary">{photos.delivery.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Camera className="h-8 w-8 text-mythic-text-muted mx-auto" />
                      <p className="text-sm text-mythic-text-muted">Click to upload photo</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <Label>GPS Location*</Label>
              <div className="mt-2 flex items-center gap-4">
                <Button
                  type="button"
                  onClick={handleGetLocation}
                  className="bg-mythic-primary-500 hover:bg-mythic-primary-600 text-white"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Capture Location
                </Button>
                {location.lat && location.lng && (
                  <span className="text-sm text-green-500">
                    ✓ Location captured: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="bg-mythic-dark-700 border-mythic-primary-500/20"
              placeholder="Any additional information..."
              rows={3}
            />
          </div>

          {/* Regulatory Notice */}
          <div className="bg-mythic-primary-500/10 border border-mythic-primary-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-mythic-primary-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-mythic-text-muted">
                <p className="font-semibold text-mythic-text-primary mb-1">Regulatory Compliance</p>
                <p>
                  This Waste Transfer Note complies with UK Environmental Protection Act 1990, Section 34. 
                  All information must be accurate and retained for 2 years.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-mythic-primary-500 hover:bg-mythic-primary-600 text-white"
            >
              Create WTN
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-mythic-primary-500/20 text-mythic-text-muted hover:text-mythic-text-primary"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
