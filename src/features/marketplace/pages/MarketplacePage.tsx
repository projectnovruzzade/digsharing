import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Badge, Button, Card, Input, Modal, Progress } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { useDebounce } from '@/hooks/useDebounce'
import { useAuthStore } from '@/store/auth.store'
import { applyToListing, getListings, getListingAIAnalysis } from '@/services/marketplace.service'
import type { Listing } from '@/types/marketplace.types'
import { cn } from '@/utils/cn'
import { Bot, Sparkles, Loader2 } from 'lucide-react'

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
  
  // Real-time AI Analysis State
  const [aiAnalysis, setAiAnalysis] = useState<{ score: number; explanation: string } | null>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)

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

  // Fetch AI analysis when a listing is selected
  useEffect(() => {
    if (selected && user) {
      setAiAnalysis(null)
      setIsAiLoading(true)
      getListingAIAnalysis(selected.id, user.id)
        .then(res => {
          setAiAnalysis(res)
        })
        .catch(err => {
          console.error("AI Analysis failed", err)
          setAiAnalysis({ score: selected.aiMatchScore || 70, explanation: "AI analysis is currently unavailable." })
        })
        .finally(() => setIsAiLoading(false))
    }
  }, [selected, user])

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
          </Card>
          
          <Card className="p-4 bg-primary/5 border-primary/20">
             <div className="flex items-center gap-2 text-primary font-semibold text-sm">
               <Bot size={16} />
               <span>AI Advisor</span>
             </div>
             <p className="mt-2 text-xs text-fg-secondary leading-relaxed">
               Our Groq-powered AI analyzes your skills against job requirements in real-time.
             </p>
          </Card>
        </aside>

        <div className="min-w-0 flex-1">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[1,2,3,4].map(i => (
                <Card key={i} className="h-48 animate-pulse bg-surface-2" />
              ))}
            </div>
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
                        <Badge variant={m.variant} className="flex items-center gap-1">
                          <Sparkles size={10} />
                          {m.text}
                        </Badge>
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
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                      <span className="text-xs text-fg-muted">
                        {l.applicants} applicants
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          type="button"
                          onClick={() => setSelected(l)}
                        >
                          Details & AI Analysis
                        </Button>
                        <Button
                          size="sm"
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
        onClose={() => {
          setSelected(null)
          setAiAnalysis(null)
        }}
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
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-fg-muted mb-2">Description</h4>
              <p className="text-fg-secondary text-sm leading-relaxed">{selected.description}</p>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Sparkles size={18} />
                  <span>Groq AI Match Analysis</span>
                </div>
                {isAiLoading && <Loader2 className="animate-spin text-primary" size={18} />}
              </div>

              {isAiLoading ? (
                <div className="space-y-3">
                  <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-[shimmer_1.5s_infinite] w-1/3" />
                  </div>
                  <div className="h-4 w-3/4 bg-primary/10 rounded animate-pulse" />
                </div>
              ) : aiAnalysis ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-primary">{aiAnalysis.score}%</div>
                    <Progress value={aiAnalysis.score} className="flex-1 h-2 bg-primary/10" />
                  </div>
                  <p className="text-sm text-fg-secondary italic font-medium leading-relaxed">
                    "{aiAnalysis.explanation}"
                  </p>
                </div>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-fg-muted mb-2">
                Motivation Note
              </label>
              <textarea
                className={cn(
                  'w-full rounded-md border border-border p-3 text-sm',
                  'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
                )}
                rows={3}
                placeholder="Why are you a good fit for this role?"
                maxLength={500}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <p className="text-right text-[10px] text-fg-muted mt-1">{note.length}/500</p>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
