'use client'

import { useState } from 'react'
import { Share2, Mail, MessageSquare, Link, Check, Copy } from 'lucide-react'
import { RouteResult } from '@/types/logistics'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'

interface ShareRouteModalProps {
  isOpen: boolean
  onClose: () => void
  route: RouteResult
  routeId?: string
}

export function ShareRouteModal({ isOpen, onClose, route, routeId = 'route-123' }: ShareRouteModalProps) {
  const { toast } = useToast()
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const shareUrl = `${window.location.origin}/logistics/shared-routes/${routeId}`
  
  const defaultMessage = `Here's the optimized route for ${new Date().toLocaleDateString()}:
- ${route.stops.length} stops
- Total distance: ${route.totalDistance.toFixed(1)}km
- Estimated time: ${Math.round(route.totalTime / 60)}h ${Math.round(route.totalTime % 60)}m
- CO2 emissions: ${route.totalCO2.toFixed(1)}kg

View the full route details: ${shareUrl}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Link copied",
      description: "Route link has been copied to clipboard"
    })
  }

  const handleSendEmail = () => {
    if (!recipient) {
      toast({
        title: "Missing recipient",
        description: "Please enter an email address",
        variant: "destructive"
      })
      return
    }

    // In a real implementation, this would send via API
    const mailtoLink = `mailto:${recipient}?subject=ReLoop Route ${new Date().toLocaleDateString()}&body=${encodeURIComponent(message || defaultMessage)}`
    window.open(mailtoLink)
    
    toast({
      title: "Email client opened",
      description: "Complete sending in your email client"
    })
    onClose()
  }

  const handleSendSMS = () => {
    if (!recipient) {
      toast({
        title: "Missing recipient",
        description: "Please enter a phone number",
        variant: "destructive"
      })
      return
    }

    // In a real implementation, this would use an SMS API
    toast({
      title: "SMS sent",
      description: `Route details sent to ${recipient}`
    })
    onClose()
  }

  const handleSendWhatsApp = () => {
    if (!recipient) {
      toast({
        title: "Missing recipient",
        description: "Please enter a phone number",
        variant: "destructive"
      })
      return
    }

    const whatsappUrl = `https://wa.me/${recipient.replace(/\D/g, '')}?text=${encodeURIComponent(message || defaultMessage)}`
    window.open(whatsappUrl, '_blank')
    
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Share Route</DialogTitle>
          <DialogDescription>
            Share this route with drivers, partners, or team members
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <Label>Shareable Link</Label>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Anyone with this link can view the route details
              </p>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-recipient">Recipient Email</Label>
              <Input
                id="email-recipient"
                type="email"
                placeholder="driver@example.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                placeholder="Add a custom message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
              />
              <p className="text-sm text-muted-foreground">
                Leave empty to use default message
              </p>
            </div>
            <Button onClick={handleSendEmail} className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sms-recipient">Phone Number</Label>
              <Input
                id="sms-recipient"
                type="tel"
                placeholder="+44 7XXX XXXXXX"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sms-message">Message</Label>
              <Textarea
                id="sms-message"
                placeholder="Add a custom message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                maxLength={160}
              />
              <p className="text-sm text-muted-foreground">
                {message.length}/160 characters
              </p>
            </div>
            <Button onClick={handleSendSMS} className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send SMS
            </Button>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-recipient">WhatsApp Number</Label>
              <Input
                id="whatsapp-recipient"
                type="tel"
                placeholder="+44 7XXX XXXXXX"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp-message">Message</Label>
              <Textarea
                id="whatsapp-message"
                placeholder="Add a custom message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
              />
              <p className="text-sm text-muted-foreground">
                Leave empty to use default message
              </p>
            </div>
            <Button onClick={handleSendWhatsApp} className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send via WhatsApp
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
