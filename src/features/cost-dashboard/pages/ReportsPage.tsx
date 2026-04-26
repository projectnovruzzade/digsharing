import { Button, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { toast } from 'react-toastify'

export default function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" />
      <Card className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={() => toast.info('PDF preview (mock).')}>
          Generate PDF
        </Button>
        <Button type="button" variant="secondary" onClick={() => toast.info('Excel export (mock).')}>
          Export Excel
        </Button>
      </Card>
    </div>
  )
}
