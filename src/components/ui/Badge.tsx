import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'muted'
    | 'primary'
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      role="status"
      className={cn(
        'inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium',
        variant === 'default' && 'border-border bg-surface-2 text-fg-secondary',
        variant === 'success' &&
          'border-accent-dark/30 bg-accent/20 text-accent-dark',
        variant === 'warning' && 'border-warning/30 bg-warning-bg text-warning',
        variant === 'danger' && 'border-danger/30 bg-danger-bg text-danger',
        variant === 'info' && 'border-info/30 bg-info-bg text-info',
        variant === 'muted' && 'border-border bg-surface-2 text-fg-muted',
        variant === 'primary' &&
          'border-primary/30 bg-primary-light text-primary-dark',
        className,
      )}
      {...props}
    />
  )
}
