'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, MapPin, Package, Truck, DollarSign } from 'lucide-react'
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

export function ListingForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    category: '',
    quantity: '',
    unit: '',
    location: '',
    price: '',
    priceUnit: '',
    frequency: '',
    description: '',
    certifications: '',
    contactMethod: '',
  })

  const [images, setImages] = useState<File[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setImages(prev => [...prev, ...newImages].slice(0, 5)) // Max 5 images
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate required fields
    if (!formData.title || !formData.type || !formData.category || !formData.quantity || !formData.location) {
      toast.error('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    try {
      // In a real implementation, this would send data to your backend
      console.log('Listing data:', formData)
      console.log('Images:', images)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Listing created successfully!')
      router.push('/marketplace')
    } catch (error) {
      toast.error('Failed to create listing. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-mythic-text-primary">Basic Information</h3>
        
        <div>
          <Label htmlFor="title">Listing Title*</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Premium Used Cooking Oil - Brighton Area"
            className="bg-mythic-dark-700 border-mythic-primary-500/20"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Listing Type*</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="bg-mythic-dark-700 border-mythic-primary-500/20">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supply">Supply (I have waste)</SelectItem>
                <SelectItem value="demand">Demand (I need waste)</SelectItem>
                <SelectItem value="service">Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category*</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="bg-mythic-dark-700 border-mythic-primary-500/20">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food-waste">Food Waste</SelectItem>
                <SelectItem value="uco">Used Cooking Oil</SelectItem>
                <SelectItem value="grease-trap">Grease Trap Waste</SelectItem>
                <SelectItem value="biodiesel">Biodiesel</SelectItem>
                <SelectItem value="biogas">Biogas</SelectItem>
                <SelectItem value="compost">Compost/Digestate</SelectItem>
                <SelectItem value="transport">Transport Service</SelectItem>
                <SelectItem value="processing">Processing Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Quantity & Pricing */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-mythic-text-primary">Quantity & Pricing</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="quantity">Quantity*</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="Amount available"
              className="bg-mythic-dark-700 border-mythic-primary-500/20"
              required
            />
          </div>

          <div>
            <Label htmlFor="unit">Unit*</Label>
            <Select
              value={formData.unit}
              onValueChange={(value) => setFormData({ ...formData, unit: value })}
            >
              <SelectTrigger className="bg-mythic-dark-700 border-mythic-primary-500/20">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                <SelectItem value="tonnes">Tonnes</SelectItem>
                <SelectItem value="liters">Liters</SelectItem>
                <SelectItem value="gallons">Gallons</SelectItem>
                <SelectItem value="m3">Cubic Meters (m³)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="price">Price (Optional)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mythic-text-muted" />
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className="pl-10 bg-mythic-dark-700 border-mythic-primary-500/20"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="priceUnit">Per</Label>
            <Select
              value={formData.priceUnit}
              onValueChange={(value) => setFormData({ ...formData, priceUnit: value })}
            >
              <SelectTrigger className="bg-mythic-dark-700 border-mythic-primary-500/20">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Per kg</SelectItem>
                <SelectItem value="tonne">Per tonne</SelectItem>
                <SelectItem value="liter">Per liter</SelectItem>
                <SelectItem value="load">Per load</SelectItem>
                <SelectItem value="negotiable">Negotiable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="frequency">Availability Frequency</Label>
          <Select
            value={formData.frequency}
            onValueChange={(value) => setFormData({ ...formData, frequency: value })}
          >
            <SelectTrigger className="bg-mythic-dark-700 border-mythic-primary-500/20">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="as-needed">As needed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-mythic-text-primary">Location</h3>
        
        <div>
          <Label htmlFor="location">Collection/Delivery Location*</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mythic-text-muted" />
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, Region or Postcode"
              className="pl-10 bg-mythic-dark-700 border-mythic-primary-500/20"
              required
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-mythic-text-primary">Description</h3>
        
        <div>
          <Label htmlFor="description">Detailed Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Provide details about quality, source, collection requirements, etc."
            className="bg-mythic-dark-700 border-mythic-primary-500/20"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="certifications">Certifications (Optional)</Label>
          <Input
            id="certifications"
            value={formData.certifications}
            onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
            placeholder="e.g., ISCC certified, PAS 110 compliant"
            className="bg-mythic-dark-700 border-mythic-primary-500/20"
          />
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-mythic-text-primary">Images</h3>
        
        <div>
          <Label>Upload Images (Max 5)</Label>
          <div className="mt-2">
            <label className="block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-mythic-primary-500/20 rounded-lg p-6 text-center cursor-pointer hover:border-mythic-primary-500/40 transition-colors">
                <Upload className="h-8 w-8 text-mythic-text-muted mx-auto mb-2" />
                <p className="text-sm text-mythic-text-muted">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-mythic-text-muted mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </label>
          </div>
          
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-5 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-mythic-text-primary">Contact Preferences</h3>
        
        <div>
          <Label htmlFor="contactMethod">Preferred Contact Method</Label>
          <Select
            value={formData.contactMethod}
            onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
          >
            <SelectTrigger className="bg-mythic-dark-700 border-mythic-primary-500/20">
              <SelectValue placeholder="Select contact method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="platform">Through ReLoop Platform</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-mythic-primary-500 hover:bg-mythic-primary-600 text-white"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Listing...
            </>
          ) : (
            <>
              <Package className="h-4 w-4 mr-2" />
              Create Listing
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
