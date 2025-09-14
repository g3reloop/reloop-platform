import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  hasAccess?: boolean
  disabled?: boolean
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  hasAccess = true,
  disabled = false,
  className
}: FeatureCardProps) {
  return (
    <Card 
      className={cn(
        "bg-mythic-dark-800 border-mythic-primary-500/20 hover:border-mythic-primary-500/40 transition-all duration-300",
        !hasAccess && "opacity-50",
        className
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-lg bg-mythic-primary-500/10">
            <Icon className="h-6 w-6 text-mythic-primary-500" />
          </div>
          {hasAccess && !disabled && (
            <ArrowRight className="h-5 w-5 text-mythic-text-muted" />
          )}
        </div>
        <CardTitle className="mt-4 text-mythic-text-primary">{title}</CardTitle>
        <CardDescription className="text-mythic-text-muted">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {hasAccess && !disabled ? (
          <Link href={href}>
            <Button className="w-full bg-mythic-primary-500 hover:bg-mythic-primary-600 text-white">
              Access {title}
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-full">
            No Access
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
