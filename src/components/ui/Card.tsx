import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-border bg-surface p-5 shadow-card',
          interactive && 'transition-all duration-200 hover:shadow-card-md hover:border-primary/30',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'
