import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  Building2,
  Cpu,
  Shield,
  User,
  UserCog,
  Wallet,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Badge, Button, Input } from '@/components/ui'
import { useAuthStore } from '@/store/auth.store'
import { getPostLoginPath } from '@/router/routes'
import { ROUTES } from '@/router/routes'
import { loginSchema, type LoginFormValues } from '@/utils/validators'
import { cn } from '@/utils/cn'

const DEMO_CARDS = [
  {
    email: 'employee@demo.az',
    label: 'Employee',
    icon: User,
    border: 'border-l-primary',
  },
  {
    email: 'hr@demo.az',
    label: 'HR Manager',
    icon: UserCog,
    border: 'border-l-accent-dark',
  },
  {
    email: 'manager@demo.az',
    label: 'Dept Manager',
    icon: Building2,
    border: 'border-l-info',
  },
  {
    email: 'cfo@demo.az',
    label: 'CFO',
    icon: Wallet,
    border: 'border-l-warning',
  },
  {
    email: 'admin@demo.az',
    label: 'Admin',
    icon: Shield,
    border: 'border-l-danger',
  },
] as const

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const isLoading = useAuthStore((s) => s.isLoading)
  const [shake, setShake] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password)
      const user = useAuthStore.getState().user
      toast.success('Signed in successfully.')
      if (user) navigate(getPostLoginPath(user.role), { replace: true })
    } catch (e) {
      setShake(true)
      setTimeout(() => setShake(false), 400)
      toast.error(e instanceof Error ? e.message : 'Sign in failed.')
    }
  }

  const fillDemo = async (email: string) => {
    setValue('email', email)
    setValue('password', 'demo123')
    try {
      await login(email, 'demo123')
      const user = useAuthStore.getState().user
      toast.success('Signed in with demo account.')
      if (user) navigate(getPostLoginPath(user.role), { replace: true })
    } catch {
      toast.error('Demo sign-in failed.')
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-[40%] flex-col justify-between bg-primary-dark p-10 text-fg-inverse lg:flex">
        <div>
          <div className="mb-8 flex items-center gap-2">
            <Cpu className="h-8 w-8 text-accent" aria-hidden />
            <span className="font-display text-xl font-bold">
              Smart Workforce Exchange
            </span>
          </div>
          <p className="mb-8 text-sm text-fg-inverse/80">
            Internal talent marketplace for Azərbaycan Holding — match skills, share
            capacity, reduce external hire cost.
          </p>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>AI-assisted matching across subsidiaries</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>Workload-aware allocations and swaps</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>Finance-grade visibility into internal mobility savings</span>
            </li>
          </ul>
        </div>
        <p className="text-xs text-fg-inverse/50">Azərbaycan Holding · Demo environment</p>
      </div>

      <div className="flex flex-1 items-center justify-center bg-surface p-6">
        <motion.div
          animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md"
        >
          <h1 className="font-display text-2xl font-semibold text-fg">
            Sign in to your account
          </h1>
          <p className="mt-1 text-sm text-fg-secondary">
            Use your work email or a demo card below.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-fg-secondary">
                <input
                  type="checkbox"
                  className="rounded border-border text-primary focus:ring-primary"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-primary hover:text-primary-dark"
              >
                Forgot password?
              </button>
            </div>
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-fg-secondary">
            No account?{' '}
            <Link to={ROUTES.REGISTER} className="font-medium text-primary">
              Register
            </Link>
          </p>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <p className="relative bg-surface px-2 text-center text-xs text-fg-muted">
              or sign in with a demo account
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {DEMO_CARDS.map((d) => {
              const Icon = d.icon
              return (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => void fillDemo(d.email)}
                  className={cn(
                    'flex items-center gap-3 rounded-md border border-border bg-surface p-3 text-left transition-colors hover:bg-surface-2',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    d.border,
                    'border-l-4',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-fg">
                      {d.label}
                    </span>
                    <span className="block truncate text-xs text-fg-muted">
                      {d.email}
                    </span>
                  </span>
                  <Badge variant="muted" className="shrink-0">
                    Demo
                  </Badge>
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
