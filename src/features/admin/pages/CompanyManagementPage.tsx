import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Badge, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { MOCK_COMPANIES } from '@/services/mock/companies.mock'

export default function CompanyManagementPage() {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <PageHeader title="Companies" description="Holding structure (mock)." />
      <Card>
        <button
          type="button"
          className="flex w-full items-center gap-2 text-left font-display font-semibold text-fg"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          Azərbaycan Holding
        </button>
        {open ? (
          <ul className="mt-3 space-y-2 border-l border-border pl-4">
            {MOCK_COMPANIES.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium text-fg">{c.name}</span>
                <Badge variant="muted">{c.industry}</Badge>
                <span className="text-fg-muted">{c.employeeCount} employees</span>
              </li>
            ))}
          </ul>
        ) : null}
      </Card>
    </div>
  )
}
