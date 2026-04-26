import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Badge, Button, Card, Input } from '@/components/ui'
import { useAuthStore } from '@/store/auth.store'
import { ROUTES } from '@/router/routes'
import { cn } from '@/utils/cn'

const STEPS = ['Profile', 'Skills', 'Goals', 'Summary'] as const

export default function OnboardingPage() {
  const navigate = useNavigate()
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const [step, setStep] = useState(0)
  const [bio, setBio] = useState('')
  const [goal, setGoal] = useState('')

  const next = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1)
    else {
      updateProfile({ bio: bio || undefined })
      toast.success('Onboarding complete.')
      navigate(ROUTES.DASHBOARD, { replace: true })
    }
  }

  const back = () => setStep((s) => Math.max(0, s - 1))

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-3 p-4">
      <Card className="w-full max-w-xl">
        <div className="mb-6 flex justify-between gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                  i === step && 'bg-primary text-fg-inverse',
                  i < step && 'bg-accent text-accent-dark',
                  i > step && 'bg-surface-2 text-fg-muted',
                )}
              >
                {i + 1}
              </span>
              <span className="hidden text-xs text-fg-muted sm:block">
                {label}
              </span>
            </div>
          ))}
        </div>

        {step === 0 ? (
          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-fg">
              Personal information
            </h2>
            <Input label="First name" defaultValue="" readOnly />
            <Input label="Last name" defaultValue="" readOnly />
            <label className="block text-sm font-medium text-fg">Bio</label>
            <textarea
              className="w-full rounded-md border border-border bg-surface p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              rows={4}
              maxLength={300}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Short introduction (max 300 characters)"
            />
            <p className="text-xs text-fg-muted">{bio.length}/300</p>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-fg">
              Skills setup
            </h2>
            <p className="text-sm text-fg-secondary">
              Mock: your skills are loaded from your profile. In production you
              would search the skill library here.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">React</Badge>
              <Badge variant="primary">TypeScript</Badge>
              <Badge variant="muted">Add skill…</Badge>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-fg">
              Career goals
            </h2>
            <label className="block text-sm font-medium text-fg">
              Where do you want to be in one year?
            </label>
            <textarea
              className="w-full rounded-md border border-border bg-surface p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              rows={3}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-3 text-sm text-fg-secondary">
            <h2 className="font-display text-lg font-semibold text-fg">
              Summary
            </h2>
            <p>
              <strong className="text-fg">Bio:</strong> {bio || '—'}
            </p>
            <p>
              <strong className="text-fg">Goal:</strong> {goal || '—'}
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-2">
          <Button variant="ghost" type="button" onClick={back} disabled={step === 0}>
            Back
          </Button>
          <div className="flex gap-2">
            {step > 0 && step < STEPS.length - 1 ? (
              <Button variant="ghost" type="button" onClick={next}>
                Skip this step
              </Button>
            ) : null}
            <Button type="button" onClick={next}>
              {step === STEPS.length - 1 ? 'Complete setup' : 'Next'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
