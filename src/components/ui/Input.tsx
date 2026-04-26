import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string
  error?: string
  prefix?: ReactNode
  suffix?: ReactNode
  /** Shorter control (e.g. header search) */
  compact?: boolean
}

export function Input({
  label,
  error,
  id,
  prefix,
  suffix,
  className,
  compact,
  ...props
}: InputProps) {
  const inputId = id ?? props.name ?? 'input-field'
  const h = compact ? 'h-9' : 'h-10'
  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-fg"
        >
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          'flex items-stretch overflow-hidden rounded-md border bg-surface transition-shadow',
          h,
          error ? 'border-danger' : 'border-border',
          'focus-within:border-primary focus-within:shadow-focus',
        )}
      >
        {prefix ? (
          <span className="flex items-center border-r border-border bg-surface-2 px-3 text-fg-muted">
            {prefix}
          </span>
        ) : null}
        <input
          id={inputId}
          className={cn(
            'min-w-0 flex-1 px-3 py-2 text-sm text-fg placeholder:text-fg-muted',
            'focus:outline-none',
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-err` : undefined}
          {...props}
        />
        {suffix ? (
          <span className="flex items-center border-l border-border bg-surface-2 px-3 text-fg-muted">
            {suffix}
          </span>
        ) : null}
      </div>
      {error ? (
        <p id={`${inputId}-err`} className="mt-1 text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
