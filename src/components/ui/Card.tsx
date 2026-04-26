import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function Card({
  className,
  interactive,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface p-5 shadow-card',
        interactive &&
          'cursor-pointer transition-shadow hover:border-primary/30 hover:shadow-card-md',
        className,
      )}
      {...props}
    />
  )
}
