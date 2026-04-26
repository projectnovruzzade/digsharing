import { cn } from '@/utils/cn'

function hashName(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i)
  return Math.abs(h)
}

const BG = [
  'bg-primary',
  'bg-primary-dark',
  'bg-info',
  'bg-warning',
  'bg-accent-dark',
]

export interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
  const bg = BG[hashName(name) % BG.length]
  const sz =
    size === 'sm' ? 'h-8 w-8 text-xs' : size === 'lg' ? 'h-20 w-20 text-xl' : 'h-10 w-10 text-sm'

  if (src) {
    return (
      <img
        src={src}
        alt=""
        className={cn('rounded-full object-cover', sz, className)}
        loading="lazy"
      />
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium text-fg-inverse',
        bg,
        sz,
        className,
      )}
      aria-hidden
    >
      {initials || '?'}
    </span>
  )
}
