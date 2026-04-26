import type { ReactNode } from 'react'
import { Card } from '@/components/ui'

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <Card className="flex flex-col items-center justify-center py-12 text-center">
      <p className="font-display text-lg font-semibold text-fg">{title}</p>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-fg-secondary">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  )
}
