'use client'

import { useState } from 'react'
import { MapPin, Clock, Package, Trash2, GripVertical } from 'lucide-react'
import { RouteStop as RouteStopType } from '@/types/logistics'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface RouteStopProps {
  stop: RouteStopType
  index: number
  onUpdate: (stop: RouteStopType) => void
  onRemove: () => void
  isDragging?: boolean
}

export function RouteStop({ stop, index, onUpdate, onRemove, isDragging }: RouteStopProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTimeWindowChange = (field: 'start' | 'end', value: string) => {
    onUpdate({
      ...stop,
      timeWindow: {
        ...stop.timeWindow,
        [field]: value
      } as { start: string; end: string }
    })
  }

  return (
    <div 
      className={`border rounded-lg p-4 bg-card transition-all ${
        isDragging ? 'opacity-50 shadow-lg' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="cursor-move">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
              {index + 1}
            </div>
            <h4 className="font-medium">{stop.name}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="ml-auto"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {stop.address}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Service Duration</label>
              <Select
                value={stop.serviceDuration?.toString() || '30'}
                onValueChange={(value) => onUpdate({ ...stop, serviceDuration: parseInt(value) })}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Demand (kg)</label>
              <Input
                type="number"
                value={stop.demand || ''}
                onChange={(e) => onUpdate({ ...stop, demand: parseInt(e.target.value) || undefined })}
                placeholder="0"
                className="h-9"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2"
          >
            {isExpanded ? 'Less options' : 'More options'}
          </Button>

          {isExpanded && (
            <div className="mt-4 space-y-4 border-t pt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Time Window</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">From</label>
                    <Input
                      type="time"
                      value={stop.timeWindow?.start || ''}
                      onChange={(e) => handleTimeWindowChange('start', e.target.value)}
                      className="h-9"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">To</label>
                    <Input
                      type="time"
                      value={stop.timeWindow?.end || ''}
                      onChange={(e) => handleTimeWindowChange('end', e.target.value)}
                      className="h-9"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Special Instructions</label>
                <Input
                  value={stop.notes || ''}
                  onChange={(e) => onUpdate({ ...stop, notes: e.target.value })}
                  placeholder="Loading dock B, call before arrival..."
                  className="h-9"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
