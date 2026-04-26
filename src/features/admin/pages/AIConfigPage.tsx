import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'

export default function AIConfigPage() {
  const [w, setW] = useState({ skill: 40, workload: 25, performance: 20, career: 15 })

  const total = w.skill + w.workload + w.performance + w.career

  const save = () => {
    if (total !== 100) {
      toast.error('Weights must total 100%.')
      return
    }
    toast.success('Configuration saved (mock).')
  }

  return (
    <div>
      <PageHeader title="AI configuration" />
      <Card className="max-w-xl space-y-4">
        <p className="text-sm text-fg-secondary">
          Match algorithm weights — total:{' '}
          <strong className={total === 100 ? 'text-success' : 'text-danger'}>{total}%</strong>
        </p>
        {(
          [
            ['skill', 'Skill match', w.skill],
            ['workload', 'Workload', w.workload],
            ['performance', 'Performance', w.performance],
            ['career', 'Career fit', w.career],
          ] as const
        ).map(([key, label, val]) => (
          <label key={key} className="block text-sm">
            <span className="text-fg">{label}</span>
            <input
              type="range"
              min={0}
              max={100}
              value={val}
              onChange={(e) =>
                setW((p) => ({ ...p, [key]: Number(e.target.value) }))
              }
              className="mt-1 w-full accent-primary"
            />
            <span className="text-fg-muted">{val}%</span>
          </label>
        ))}
        <div className="flex gap-2">
          <Button type="button" onClick={save}>
            Save configuration
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => {
              setW({ skill: 40, workload: 25, performance: 20, career: 15 })
              toast.info('Reset to defaults.')
            }}
          >
            Reset
          </Button>
        </div>
      </Card>
    </div>
  )
}
