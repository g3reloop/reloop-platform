'use client'

import { MapPin, Clock, Ruler, Leaf, AlertTriangle, Download, Share2 } from 'lucide-react'
import { RouteResult, CarrierSuggestion } from '@/types/logistics'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface RouteResultsProps {
  result: RouteResult
  carriers?: CarrierSuggestion[]
  onShare?: () => void
  onExport?: () => void
}

export function RouteResults({ result, carriers, onShare, onExport }: RouteResultsProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Route Summary</CardTitle>
              <CardDescription>Optimized route with {result.stops.length} stops</CardDescription>
            </div>
            <div className="flex gap-2">
              {onExport && (
                <Button variant="outline" size="sm" onClick={onExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              )}
              {onShare && (
                <Button size="sm" onClick={onShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Ruler className="h-4 w-4" />
                <span className="text-sm">Total Distance</span>
              </div>
              <p className="text-2xl font-bold">{result.totalDistance.toFixed(1)} km</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Total Time</span>
              </div>
              <p className="text-2xl font-bold">{formatDuration(result.totalTime)}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Leaf className="h-4 w-4" />
                <span className="text-sm">CO2 Emissions</span>
              </div>
              <p className="text-2xl font-bold">{result.totalCO2.toFixed(1)} kg</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Segments</span>
              </div>
              <p className="text-2xl font-bold">{result.segments.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {result.warnings && result.warnings.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {result.warnings.map((warning, i) => (
                <li key={i}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Route Details */}
      <Card>
        <CardHeader>
          <CardTitle>Route Details</CardTitle>
          <CardDescription>Stop-by-stop breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.stops.map((stop, index) => (
              <div key={index}>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{stop.name}</h4>
                    <p className="text-sm text-muted-foreground">{stop.address}</p>
                    {stop.timeWindow && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Time window: {stop.timeWindow.start} - {stop.timeWindow.end}
                      </p>
                    )}
                  </div>
                  {index < result.segments.length && (
                    <div className="text-right text-sm">
                      <p className="font-medium">{result.segments[index].distance.toFixed(1)} km</p>
                      <p className="text-muted-foreground">{formatDuration(result.segments[index].duration)}</p>
                    </div>
                  )}
                </div>
                {index < result.stops.length - 1 && (
                  <div className="ml-4 my-2 border-l-2 border-dashed h-8" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Carrier Suggestions */}
      {carriers && carriers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Suggested Carriers</CardTitle>
            <CardDescription>Carriers that match your route requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {carriers.map((carrier, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{carrier.name}</h4>
                    <Badge variant="secondary">Score: {carrier.score}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Service Areas: </span>
                      {carrier.serviceAreas.join(', ')}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Why recommended: </span>
                      {carrier.reasons.join(', ')}
                    </div>
                  </div>
                  <Button size="sm" className="mt-3">
                    Contact Carrier
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
