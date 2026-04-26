import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, Input } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'

export default function SavingsPage() {
  const [salary, setSalary] = useState('120000')

  return (
    <div>
      <PageHeader title="Savings calculator" />
      <Card className="max-w-md space-y-4">
        <Input
          label="Estimated annual salary (USD)"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <Button
          type="button"
          onClick={() =>
            toast.success(
              `Estimated savings vs external hire: $${(Number(salary) * 0.12).toFixed(0)} (mock).`,
            )
          }
        >
          Calculate
        </Button>
      </Card>
    </div>
  )
}
