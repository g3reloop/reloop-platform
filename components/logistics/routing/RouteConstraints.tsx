'use client'

import { Truck, Clock, Ruler, Package, Thermometer, AlertTriangle } from 'lucide-react'
import { RouteConstraints as RouteConstraintsType } from '@/types/logistics'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
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

interface RouteConstraintsProps {
  constraints: RouteConstraintsType
  onChange: (constraints: RouteConstraintsType) => void
}

export function RouteConstraints({ constraints, onChange }: RouteConstraintsProps) {
  const handleChange = (field: keyof RouteConstraintsType, value: any) => {
    onChange({
      ...constraints,
      [field]: value
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Constraints</CardTitle>
        <CardDescription>
          Set limits and requirements for route optimization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxDistance" className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                Maximum Distance (km)
              </Label>
              <Input
                id="maxDistance"
                type="number"
                value={constraints.maxDistance || ''}
                onChange={(e) => handleChange('maxDistance', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="No limit"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxDrivingTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Max Driving Time (hours)
              </Label>
              <Input
                id="maxDrivingTime"
                type="number"
                value={constraints.maxDrivingTime ? constraints.maxDrivingTime / 60 : ''}
                onChange={(e) => handleChange('maxDrivingTime', e.target.value ? parseInt(e.target.value) * 60 : undefined)}
                placeholder="No limit"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleCapacity" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Vehicle Capacity (kg)
            </Label>
            <Input
              id="vehicleCapacity"
              type="number"
              value={constraints.vehicleCapacity || ''}
              onChange={(e) => handleChange('vehicleCapacity', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="No limit"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperatureControl" className="flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Temperature Controlled
              </Label>
              <Switch
                id="temperatureControl"
                checked={constraints.temperatureControl || false}
                onCheckedChange={(checked) => handleChange('temperatureControl', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="avoidTolls">
                Avoid Toll Roads
              </Label>
              <Switch
                id="avoidTolls"
                checked={constraints.avoidTolls || false}
                onCheckedChange={(checked) => handleChange('avoidTolls', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="avoidHighways">
                Avoid Highways
              </Label>
              <Switch
                id="avoidHighways"
                checked={constraints.avoidHighways || false}
                onCheckedChange={(checked) => handleChange('avoidHighways', checked)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adrClass" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              ADR Class (Dangerous Goods)
            </Label>
            <Select
              value={constraints.adrClass || 'none'}
              onValueChange={(value) => handleChange('adrClass', value === 'none' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No dangerous goods</SelectItem>
                <SelectItem value="1">Class 1: Explosives</SelectItem>
                <SelectItem value="2">Class 2: Gases</SelectItem>
                <SelectItem value="3">Class 3: Flammable liquids</SelectItem>
                <SelectItem value="4">Class 4: Flammable solids</SelectItem>
                <SelectItem value="5">Class 5: Oxidizing substances</SelectItem>
                <SelectItem value="6">Class 6: Toxic substances</SelectItem>
                <SelectItem value="7">Class 7: Radioactive</SelectItem>
                <SelectItem value="8">Class 8: Corrosive</SelectItem>
                <SelectItem value="9">Class 9: Miscellaneous</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleType" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Vehicle Type
            </Label>
            <Select
              value={constraints.vehicleType || 'standard'}
              onValueChange={(value) => handleChange('vehicleType', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Truck</SelectItem>
                <SelectItem value="refrigerated">Refrigerated Truck</SelectItem>
                <SelectItem value="tanker">Tanker</SelectItem>
                <SelectItem value="flatbed">Flatbed</SelectItem>
                <SelectItem value="container">Container Truck</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
