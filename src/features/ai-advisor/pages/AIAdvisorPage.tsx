import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Badge, Button, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { useAuthStore } from '@/store/auth.store'
import { analyzeCareerPath } from '@/services/ai.service'

export default function AIAdvisorPage() {
  const user = useAuthStore((s) => s.user)
  const mut = useMutation({
    mutationFn: () => analyzeCareerPath(user?.id ?? ''),
    onMutate: () => {
      toast.loading('Analyzing career path…', { toastId: 'ai' })
    },
    onSuccess: (data) => {
      toast.update('ai', {
        render: `Loaded ${data.length} recommendations.`,
        type: 'success',
        isLoading: false,
        autoClose: 4000,
      })
    },
    onError: () => {
      toast.update('ai', {
        render: 'Analysis failed.',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      })
    },
  })

  if (!user) return null

  return (
    <div>
      <PageHeader
        title="AI career advisor"
        description="Mock AI analysis — demonstrates async flow and toasts."
        actions={
          <Button type="button" onClick={() => void mut.mutate()} isLoading={mut.isPending}>
            Analyze my career
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <p className="text-sm font-medium text-fg">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-fg-secondary">{user.position}</p>
          <div className="flex flex-wrap gap-2">
            {(user.skills || []).slice(0, 5).map((s: any) => (
              <Badge key={s.id} variant="primary">
                {s.name}
              </Badge>
            ))}
          </div>
        </Card>
        <Card className="lg:col-span-2">
          {mut.data?.length ? (
            <ul className="space-y-3">
              {mut.data.map((r, i) => (
                <li key={i} className="rounded-md border border-border p-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        r.priority === 'high'
                          ? 'danger'
                          : r.priority === 'medium'
                            ? 'warning'
                            : 'muted'
                      }
                    >
                      {r.priority}
                    </Badge>
                    <span className="font-medium text-fg">{r.title}</span>
                  </div>
                  <p className="mt-1 text-sm text-fg-secondary">{r.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-fg-secondary">
              Run analysis to see recommendations.
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
