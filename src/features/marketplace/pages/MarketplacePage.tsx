import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Badge, Button, Card, Input, Modal, Progress } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { useDebounce } from '@/hooks/useDebounce'
import { useAuthStore } from '@/store/auth.store'
import { applyToListing, getListings } from '@/services/marketplace.service'
import type { Listing } from '@/types/marketplace.types'
import { cn } from '@/utils/cn'

function matchLabel(score?: number): { text: string; variant: 'success' | 'primary' | 'warning' | 'muted' } {
  if (score == null || score < 40) return { text: 'Low match', variant: 'muted' }
  if (score >= 85) return { text: 'Excellent match', variant: 'success' }
  if (score >= 65) return { text: 'Good match', variant: 'primary' }
  return { text: 'Partial match', variant: 'warning' }
}

export default function MarketplacePage() {
  const user = useAuthStore((s) => s.user)
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const debounced = useDebounce(search, 300)
  const [highMatchOnly, setHighMatchOnly] = useState(false)
  const [selected, setSelected] = useState<Listing | null>(null)
  const [note, setNote] = useState('')

  const filters = useMemo(
    () => ({
      search: debounced || undefined,
      minMatch: highMatchOnly ? 70 : undefined,
    }),
    [debounced, highMatchOnly],
  )

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['listings', filters],
    queryFn: () => getListings(filters),
  })

  const applyMut = useMutation({
    mutationFn: () => {
      if (!user || !selected) throw new Error('Missing')
      return applyToListing({
        listingId: selected.id,
        applicantId: user.id,
        note: note || undefined,
      })
    },
    onSuccess: () => {
      toast.success('Application submitted.')
      setSelected(null)
      setNote('')
      void qc.invalidateQueries({ queryKey: ['listings'] })
    },
    onError: () => toast.error('Could not submit application.'),
  })

  return (
    <div>
      <PageHeader
        title="Internal marketplace"
        description="Open roles, tasks, and projects across the holding."
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full shrink-0 space-y-4 lg:w-64">
          <Card className="p-4">
            <h2 className="text-sm font-semibold text-fg">Filters</h2>
            <Input
              label="Search"
              className="mt-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Title, skills…"
            />
            <label className="mt-4 flex items-center gap-2 text-sm text-fg-secondary">
              <input
                type="checkbox"
                checked={highMatchOnly}
                onChange={(e) => setHighMatchOnly(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              AI match 70%+
            </label>
            <p className="mt-2 text-xs text-fg-muted">
              {listings.length} results (mock filter)
            </p>
          </Card>
        </aside>

        <div className="min-w-0 flex-1">
          {isLoading ? (
            <p className="text-sm text-fg-secondary">Loading listings…</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {listings.map((l) => {
                const m = matchLabel(l.aiMatchScore)
                return (
                  <Card
                    key={l.id}
                    interactive
                    className="flex flex-col"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <span className="text-xs font-medium text-fg-secondary">
                        {l.company.name}
                      </span>
                      {l.aiMatchScore != null && l.aiMatchScore >= 40 ? (
                        <Badge variant={m.variant}>{m.text}</Badge>
                      ) : null}
                    </div>
                    <h3 className="font-display text-base font-semibold text-fg">
                      {l.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Badge variant="muted">{l.type}</Badge>
                      {l.duration ? (
                        <Badge variant="muted">{l.duration}</Badge>
                      ) : null}
                      <Badge variant="muted">{l.workloadPercent}%</Badge>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-fg-secondary">
                      {l.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {l.requiredSkills.slice(0, 3).map((s) => (
                        <Badge key={s.id} variant="primary" className="text-xs">
                          {s.name}
                        </Badge>
                      ))}
                      {l.requiredSkills.length > 3 ? (
                        <span className="text-xs text-fg-muted">
                          +{l.requiredSkills.length - 3}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                      <span className="text-xs text-fg-muted">
                        {l.applicants} applicants
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          type="button"
                          onClick={() => setSelected(l)}
                        >
                          Details
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setSelected(l)
                            setNote('')
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ''}
        className="max-w-2xl"
        footer={
          <>
            <Button variant="secondary" type="button" onClick={() => setSelected(null)}>
              Close
            </Button>
            <Button
              type="button"
              isLoading={applyMut.isPending}
              onClick={() => void applyMut.mutate()}
            >
              Submit application
            </Button>
          </>
        }
      >
        {selected ? (
          <div className="space-y-4">
            <p className="text-fg-secondary">{selected.description}</p>
            {user && selected.aiMatchScore != null ? (
              <div>
                <p className="text-sm font-medium text-fg">
                  Your match: {selected.aiMatchScore}%
                </p>
                <Progress value={selected.aiMatchScore} className="mt-2" />
              </div>
            ) : null}
            <label className="block text-sm font-medium text-fg">
              Motivation (max 500)
            </label>
            <textarea
              className={cn(
                'w-full rounded-md border border-border p-3 text-sm',
                'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
              )}
              rows={4}
              maxLength={500}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <p className="text-xs text-fg-muted">{note.length}/500</p>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
