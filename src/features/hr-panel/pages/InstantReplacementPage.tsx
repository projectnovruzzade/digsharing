import { useMutation, useQuery, queryOptions } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Badge, Button, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { findReplacements } from '@/services/ai.service'
import { getEmployees } from '@/services/employee.service'
import type { Employee } from '@/types/employee.types'

export default function InstantReplacementPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data: employees = [] } = useQuery(
    queryOptions({
      queryKey: ['employees'],
      queryFn: () => getEmployees(),
    })
  )
  const mut = useMutation({
    mutationFn: (id: string) => findReplacements(id),
    onMutate: () => toast.loading('Analyzing workforce…', { toastId: 'rep' }),
    onSuccess: () => {
      toast.update('rep', {
        render: 'Candidates ranked.',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    },
  })

  return (
    <div>
      <PageHeader title="Instant replacement" />
      <Card className="mb-6 max-w-lg">
        <label className="block text-sm font-medium text-fg">Who is leaving?</label>
        <select
          className="mt-2 w-full rounded-md border border-border bg-surface p-2 text-sm"
          value={selectedId ?? ''}
          onChange={(e) => setSelectedId(e.target.value || null)}
        >
          <option value="">Select employee</option>
          {(employees as Employee[]).map((e: Employee) => (
            <option key={e.id} value={e.id}>
              {e.firstName} {e.lastName}
            </option>
          ))}
        </select>
        <Button
          type="button"
          className="mt-4"
          disabled={!selectedId}
          isLoading={mut.isPending}
          onClick={() => selectedId && void mut.mutate(selectedId)}
        >
          Find replacements
        </Button>
      </Card>
      {mut.data?.length ? (
        <div className="grid gap-3 md:grid-cols-3">
          {mut.data.map((e: any, i: number) => (
            <Card key={e.id}>
              <Badge variant="primary">Rank {i + 1}</Badge>
              <p className="mt-2 font-medium text-fg">
                {e.firstName} {e.lastName}
              </p>
              <p className="text-sm text-fg-secondary">{e.position}</p>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  )
}
