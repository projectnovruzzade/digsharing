import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Card, Input } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'

interface Form {
  title: string
  description: string
}

export default function PostRolePage() {
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: { title: '', description: '' },
  })

  return (
    <div>
      <PageHeader title="Post a role" description="Internal listing (mock submit)." />
      <Card className="max-w-xl">
        <form
          className="space-y-4"
          onSubmit={handleSubmit(() => toast.success('Listing queued (mock).'))}
        >
          <Input label="Title" {...register('title', { required: true })} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-fg">Description</label>
            <textarea
              className="w-full rounded-md border border-border p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              rows={4}
              {...register('description')}
            />
          </div>
          <Button type="submit">Publish (mock)</Button>
        </form>
      </Card>
    </div>
  )
}
