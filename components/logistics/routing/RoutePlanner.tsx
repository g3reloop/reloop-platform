'use client'

import { useState } from 'react'
import { Plus, Route, Loader2, MapPin } from 'lucide-react'
import { RouteStop as RouteStopType, RouteConstraints as RouteConstraintsType, RouteResult, MaterialType } from '@/types/logistics'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RouteStop } from './RouteStop'
import { RouteConstraints } from './RouteConstraints'
import { RouteResults } from './RouteResults'
import { ShareRouteModal } from '../ShareRouteModal'
import { routingOptimization } from '@/lib/agents/routing-optimization'
import { useToast } from '@/components/ui/use-toast'

interface AddStopForm {
  name: string
  address: string
  lat: string
  lng: string
}

export function RoutePlanner() {
  const { toast } = useToast()
  const [stops, setStops] = useState<RouteStopType[]>([])
  const [constraints, setConstraints] = useState<RouteConstraintsType>({})
  const [materialType, setMaterialType] = useState<MaterialType>(MaterialType.FOOD_WASTE)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null)
  const [carriers, setCarriers] = useState<any[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  
  const [showAddStop, setShowAddStop] = useState(false)
  const [newStop, setNewStop] = useState<AddStopForm>({
    name: '',
    address: '',
    lat: '',
    lng: ''
  })

  const handleAddStop = () => {
    if (!newStop.name || !newStop.address || !newStop.lat || !newStop.lng) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields for the stop",
        variant: "destructive"
      })
      return
    }

    const stop: RouteStopType = {
      id: `stop-${Date.now()}`,
      name: newStop.name,
      address: newStop.address,
      lat: parseFloat(newStop.lat),
      lng: parseFloat(newStop.lng),
      serviceDuration: 30
    }

    setStops([...stops, stop])
    setNewStop({ name: '', address: '', lat: '', lng: '' })
    setShowAddStop(false)
  }

  const handleUpdateStop = (index: number, updatedStop: RouteStopType) => {
    const newStops = [...stops]
    newStops[index] = updatedStop
    setStops(newStops)
  }

  const handleRemoveStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index))
  }

  const handleOptimizeRoute = async () => {
    if (stops.length < 2) {
      toast({
        title: "Not Enough Stops",
        description: "Please add at least 2 stops to optimize a route",
        variant: "destructive"
      })
      return
    }

    setIsOptimizing(true)
    setRouteResult(null)

    try {
      // Optimize route
      const result = await routingOptimization.optimizeRoute(stops, constraints)
      setRouteResult(result)

      // Get carrier suggestions
      const region = stops[0].address.split(',').pop()?.trim() || 'UK'
      const carrierSuggestions = await routingOptimization.getSuggestedCarriers(
        materialType,
        constraints,
        region
      )
      setCarriers(carrierSuggestions)

      toast({
        title: "Route Optimized",
        description: `Found optimal route covering ${result.totalDistance.toFixed(1)}km in ${Math.round(result.totalTime / 60)}h ${Math.round(result.totalTime % 60)}m`
      })
    } catch (error) {
      console.error('Route optimization error:', error)
      toast({
        title: "Optimization Failed",
        description: "Unable to optimize route. Please check your stops and try again.",
        variant: "destructive"
      })
    } finally {
      setIsOptimizing(false)
    }
  }

  const handleShareRoute = () => {
    if (!routeResult) return
    setShowShareModal(true)
  }

  const handleExportRoute = () => {
    if (!routeResult) return

    // Create CSV export
    const csv = [
      ['Stop', 'Name', 'Address', 'Latitude', 'Longitude', 'Service Time', 'Notes'],
      ...routeResult.stops.map((stop, i) => [
        i + 1,
        stop.name,
        stop.address,
        stop.lat,
        stop.lng,
        stop.serviceDuration || 30,
        stop.notes || ''
      ])
    ].map(row => row.join(',')).join('\n')

    // Download file
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `route-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Material Type Selection */}
      <Card className="bg-mythic-dark-800 border-mythic-primary-500/20">
        <CardHeader>
          <CardTitle className="text-mythic-text-primary">Route Configuration</CardTitle>
          <CardDescription className="text-mythic-text-muted">Set up your route parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="materialType">Material Type</Label>
            <Select
              value={materialType}
              onValueChange={(value) => setMaterialType(value as MaterialType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={MaterialType.FOOD_WASTE}>Food Waste</SelectItem>
                <SelectItem value={MaterialType.UCO}>Used Cooking Oil</SelectItem>
                <SelectItem value={MaterialType.BULK_LIQUID}>Bulk Liquid</SelectItem>
                <SelectItem value={MaterialType.AGRICULTURAL}>Agricultural</SelectItem>
                <SelectItem value={MaterialType.RECYCLABLES}>Recyclables</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stops Management */}
      <Card className="bg-mythic-dark-800 border-mythic-primary-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-mythic-text-primary">Route Stops</CardTitle>
              <CardDescription className="text-mythic-text-muted">Add and arrange your collection/delivery points</CardDescription>
            </div>
            <Button 
              onClick={() => setShowAddStop(!showAddStop)}
              className="bg-mythic-primary-500 hover:bg-mythic-primary-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Stop
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddStop && (
            <div className="mb-6 p-4 border border-mythic-primary-500/20 rounded-lg bg-mythic-dark-700">
              <h4 className="font-medium mb-4 text-mythic-text-primary">Add New Stop</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stopName">Location Name</Label>
                  <Input
                    id="stopName"
                    value={newStop.name}
                    onChange={(e) => setNewStop({ ...newStop, name: e.target.value })}
                    placeholder="Restaurant Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stopAddress">Address</Label>
                  <Input
                    id="stopAddress"
                    value={newStop.address}
                    onChange={(e) => setNewStop({ ...newStop, address: e.target.value })}
                    placeholder="123 Main St, London"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stopLat">Latitude</Label>
                  <Input
                    id="stopLat"
                    type="number"
                    step="any"
                    value={newStop.lat}
                    onChange={(e) => setNewStop({ ...newStop, lat: e.target.value })}
                    placeholder="51.5074"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stopLng">Longitude</Label>
                  <Input
                    id="stopLng"
                    type="number"
                    step="any"
                    value={newStop.lng}
                    onChange={(e) => setNewStop({ ...newStop, lng: e.target.value })}
                    placeholder="-0.1278"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={handleAddStop}
                  className="bg-mythic-primary-500 hover:bg-mythic-primary-600 text-white"
                >
                  Add Stop
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddStop(false)}
                  className="border-mythic-primary-500/20 text-mythic-text-muted hover:text-mythic-text-primary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {stops.length === 0 ? (
            <div className="text-center py-12 text-mythic-text-muted">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No stops added yet. Click "Add Stop" to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stops.map((stop, index) => (
                <RouteStop
                  key={stop.id}
                  stop={stop}
                  index={index}
                  onUpdate={(updatedStop) => handleUpdateStop(index, updatedStop)}
                  onRemove={() => handleRemoveStop(index)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Route Constraints */}
      <RouteConstraints
        constraints={constraints}
        onChange={setConstraints}
      />

      {/* Optimize Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleOptimizeRoute}
          disabled={stops.length < 2 || isOptimizing}
          className="bg-mythic-primary-500 hover:bg-mythic-primary-600 text-white"
        >
          {isOptimizing ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Optimizing Route...
            </>
          ) : (
            <>
              <Route className="h-5 w-5 mr-2" />
              Optimize Route
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      {routeResult && (
        <RouteResults
          result={routeResult}
          carriers={carriers}
          onShare={handleShareRoute}
          onExport={handleExportRoute}
        />
      )}

      {/* Share Modal */}
      {routeResult && (
        <ShareRouteModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          route={routeResult}
          routeId={`route-${Date.now()}`}
        />
      )}
    </div>
  )
}
