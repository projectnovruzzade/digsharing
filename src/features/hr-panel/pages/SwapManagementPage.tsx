import { useQuery } from '@tanstack/react-query'
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useEffect, useState, type ReactNode } from 'react'
import { toast } from 'react-toastify'
import { Badge } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { employeeById } from '@/services/mock/employees.mock'
import { getSwaps, updateSwapStatus } from '@/services/hr.service'
import type { SwapProposal } from '@/types/marketplace.types'

type Col = 'pending' | 'active' | 'completed'

const COLS: { id: Col; title: string; headerClass: string }[] = [
  { id: 'pending', title: 'Pending', headerClass: 'bg-warning-bg text-warning' },
  { id: 'active', title: 'Active', headerClass: 'bg-success-bg text-success' },
  { id: 'completed', title: 'Completed', headerClass: 'bg-surface-2 text-fg-muted' },
]

function DroppableCol({
  id,
  title,
  headerClass,
  children,
}: {
  id: Col
  title: string
  headerClass: string
  children: ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div
      ref={setNodeRef}
      className={`min-h-[200px] rounded-lg border border-border bg-surface p-2 ${isOver ? 'ring-2 ring-primary' : ''}`}
    >
      <div className={`mb-2 rounded-md px-2 py-1 text-xs font-semibold ${headerClass}`}>
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function SwapCard({ swap, disabled }: { swap: SwapProposal; disabled?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: swap.id,
    disabled,
  })
  const a = employeeById(swap.fromEmployeeId)
  const b = employeeById(swap.toEmployeeId)
  const style = transform
    ? { transform: `translate3d(${transform.x}px,${transform.y}px,0)` }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-md border border-border bg-surface p-3 shadow-card ${isDragging ? 'opacity-70' : ''} ${disabled ? 'cursor-default' : 'cursor-grab'}`}
      {...listeners}
      {...attributes}
    >
      <Badge variant="muted" className="mb-2 text-xs">
        {swap.proposedBy === 'ai' ? 'AI suggested' : swap.proposedBy === 'hr' ? 'HR created' : 'Manager'}
      </Badge>
      <p className="text-xs text-fg-secondary">
        {(a?.firstName ?? '?')} {(a?.lastName ?? '')} ↔ {(b?.firstName ?? '?')}{' '}
        {(b?.lastName ?? '')}
      </p>
      <p className="mt-1 font-mono text-sm text-fg">{swap.skillMatchScore}% match</p>
      <p className="text-xs text-fg-muted">{swap.duration}</p>
    </div>
  )
}

export default function SwapManagementPage() {
  const { data = [] } = useQuery({ queryKey: ['swaps'], queryFn: getSwaps })
  const [swaps, setSwaps] = useState<SwapProposal[]>([])
  useEffect(() => setSwaps(data), [data])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over) return
    const col = over.id as Col
    const id = String(active.id)
    const s = swaps.find((x) => x.id === id)
    if (!s || s.status === 'completed') return
    if (col === 'pending' || col === 'active' || col === 'completed') {
      void updateSwapStatus(id, col)
      setSwaps((prev) =>
        prev.map((x) => (x.id === id ? { ...x, status: col } : x)),
      )
      toast.info(`Moved swap to ${col}.`)
    }
  }

  const byCol = (c: Col) => swaps.filter((s) => s.status === c)

  return (
    <div>
      <PageHeader title="Swap management" description="Kanban (mock) — drag cards between columns." />
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="grid gap-4 md:grid-cols-3">
          {COLS.map((c) => (
            <DroppableCol key={c.id} id={c.id} title={c.title} headerClass={c.headerClass}>
              {byCol(c.id).map((s) => (
                <SwapCard key={s.id} swap={s} disabled={s.status === 'completed'} />
              ))}
            </DroppableCol>
          ))}
        </div>
      </DndContext>
    </div>
  )
}
