import { useQuery } from '@tanstack/react-query'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { getCostSummary } from '@/services/cost.service'

export default function CFODashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['cost-summary'],
    queryFn: getCostSummary,
  })

  if (isLoading || !data) {
    return <p className="text-sm text-fg-secondary">Loading…</p>
  }

  return (
    <div>
      <PageHeader
        title="Cost dashboard"
        description="Hiring cost, savings, and company breakdown."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Monthly hiring', value: `$${(data.monthlyHiringCost / 1000).toFixed(0)}k` },
          { label: 'Internal savings', value: `$${(data.internalSavings / 1000).toFixed(0)}k` },
          { label: 'Allocation cost', value: `$${(data.allocationCost / 1000).toFixed(0)}k` },
          { label: 'External hires', value: String(data.externalHireCount) },
        ].map((m) => (
          <Card key={m.label} className="border-l-4 border-l-primary">
            <p className="text-sm text-fg-secondary">{m.label}</p>
            <p className="mt-1 font-mono text-xl font-semibold text-fg">{m.value}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-2 font-display text-base font-semibold">12-month trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#427AB5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h2 className="mb-2 font-display text-base font-semibold">Cost by company</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.companyCosts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="company" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#124170" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <div className="mt-6">
        <Button type="button" variant="secondary">
          Generate PDF (placeholder)
        </Button>
      </div>
    </div>
  )
}
