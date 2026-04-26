import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Button, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { runSkillGapAnalysis } from '@/services/ai.service'

export default function SkillGapPage() {
  const mut = useMutation({
    mutationFn: () => runSkillGapAnalysis('co_001'),
    onMutate: () => toast.loading('Running analysis…', { toastId: 'gap' }),
    onSuccess: (d) => {
      toast.update('gap', {
        render: `Found ${d.missingSkills.length} gaps.`,
        type: 'success',
        isLoading: false,
        autoClose: 4000,
      })
    },
    onError: () => {
      toast.update('gap', {
        render: 'Analysis failed.',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      })
    },
  })

  return (
    <div>
      <PageHeader
        title="Skill gap analysis"
        actions={
          <Button type="button" onClick={() => void mut.mutate()} isLoading={mut.isPending}>
            Run AI analysis
          </Button>
        }
      />
      {mut.data ? (
        <div className="space-y-4">
          {mut.data.missingSkills.map((g, i) => (
            <Card
              key={i}
              className={`border-l-4 ${g.urgency === 'critical' ? 'border-l-danger' : 'border-l-warning'}`}
            >
              <p className="font-medium text-fg">{g.skill.name}</p>
              <p className="text-sm text-fg-secondary">
                Need {g.headcountNeeded} · {g.urgency}
              </p>
            </Card>
          ))}
          <Card>
            <p className="text-sm text-fg-secondary">
              Recommendation: <strong className="text-fg">{mut.data.recommendation}</strong>{' '}
              — hire est. ₼{mut.data.estimatedHiringCost}, train est. ₼
              {mut.data.estimatedTrainingCost}
            </p>
          </Card>
        </div>
      ) : (
        <Card>
          <p className="text-sm text-fg-secondary">Run analysis to view gaps.</p>
        </Card>
      )}
    </div>
  )
}
