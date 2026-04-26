import { cn } from '@/utils/cn'

export interface ProgressProps {
  value: number
  className?: string
  barClassName?: string
}

export function Progress({ value, className, barClassName }: ProgressProps) {
  const v = Math.min(100, Math.max(0, value))
  return (
    <div
      className={cn('h-2 w-full overflow-hidden rounded-sm bg-surface-2', className)}
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn('h-full rounded-sm bg-primary transition-all', barClassName)}
        style={{ width: `${v}%` }}
      />
    </div>
  )
}
