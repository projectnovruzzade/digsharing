import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge, Button, Card, Progress } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { useAuthStore } from '@/store/auth.store'
import { getEmployees } from '@/services/employee.service'
import { getListings } from '@/services/marketplace.service'
import { getCostSummary } from '@/services/cost.service'
import { ROUTES } from '@/router/routes'
import { formatPercent } from '@/utils/formatters'

const pageTransition = { duration: 0.2, ease: [0, 0, 0.2, 1] as const }

function EmployeeHome() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const { data: listings = [] } = useQuery({
    queryKey: ['listings', 'dash'],
    queryFn: () => getListings({ minMatch: 70 }),
  })
  const recommended = listings.slice(0, 3)
  const radialData = [
    { name: 'score', value: user?.performanceScore ?? 0, fill: '#427AB5' },
  ]

  if (!user) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={pageTransition}
    >
      <PageHeader
        title={`Welcome back, ${user.firstName}`}
        description="Your internal mobility hub — matched roles, workload, and career signals."
      />

      <div className="mb-6 rounded-lg border border-border bg-primary-light/50 p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-fg-secondary">
            You have{' '}
            <Badge variant="success" className="mx-1">
              {recommended.length}
            </Badge>{' '}
            high-match listings today.
          </p>
          <Button
            variant="ghost"
            type="button"
            onClick={() => navigate(ROUTES.MARKETPLACE)}
          >
            View listings
          </Button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm text-fg-secondary">Current workload</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-fg">
            {formatPercent(user.workloadPercent)}
          </p>
          <Progress
            value={user.workloadPercent}
            className="mt-3"
            barClassName={
              user.workloadPercent > 85
                ? 'bg-danger'
                : user.workloadPercent > 60
                  ? 'bg-warning'
                  : 'bg-accent-dark'
            }
          />
        </Card>
        <Card>
          <p className="text-sm text-fg-secondary">Active allocations</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-fg">
            {user.allocation.length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-fg-secondary">Skills</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-fg">
            {user.skills.length}
          </p>
          <Link
            className="mt-2 inline-block text-sm text-primary hover:underline"
            to={ROUTES.PROFILE}
          >
            View profile
          </Link>
        </Card>
        <Card>
          <p className="text-sm text-fg-secondary">Performance</p>
          <div className="mt-2 h-28">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="55%"
                outerRadius="100%"
                data={radialData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar dataKey="value" cornerRadius={4} />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-fg text-sm font-mono font-semibold"
                >
                  {user.performanceScore}
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <h2 className="font-display text-base font-semibold text-fg">
            Recommended for you
          </h2>
          <div className="grid min-w-0 gap-3 md:grid-cols-2">
            {recommended.map((l) => (
              <Card key={l.id} interactive className="min-w-0">
                <p className="line-clamp-2 break-words font-display text-sm font-semibold text-fg">
                  {l.title}
                </p>
                <p className="mt-1 break-words text-xs text-fg-secondary">
                  {l.company.name} · {l.aiMatchScore ?? 0}% match
                </p>
              </Card>
            ))}
          </div>
          <Link className="text-sm text-primary" to={ROUTES.MARKETPLACE}>
            View all listings →
          </Link>
        </div>
        <div className="min-w-0 space-y-4">
          <Card className="min-w-0">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-fg-inverse">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>
              <div className="min-w-0 overflow-hidden">
                <p className="truncate font-medium text-fg">
                  {user.firstName} {user.lastName}
                </p>
                <p className="truncate text-xs text-fg-secondary">
                  {user.position} · {user.company.name}
                </p>
              </div>
            </div>
            <Link
              className="mt-3 inline-block text-sm text-primary"
              to={ROUTES.PROFILE}
            >
              Edit profile
            </Link>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}

function HRHome() {
  const navigate = useNavigate()
  const { data: employees = [] } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  })
  const avgLoad =
    employees.reduce((a, e) => a + e.workloadPercent, 0) /
    Math.max(1, employees.length)
  const chartData = employees.slice(0, 6).map((e) => ({
    name: e.company.name.slice(0, 8),
    load: e.workloadPercent,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={pageTransition}
    >
      <PageHeader
        title="HR dashboard"
        description="Workforce health, transfers, and critical skill signals."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: 'Workforce', value: employees.length, border: 'border-l-primary' },
          { label: 'Avg workload', value: `${Math.round(avgLoad)}%`, border: 'border-l-accent-dark' },
          { label: 'Open listings', value: '14', border: 'border-l-info' },
          { label: 'Transfers', value: '3', border: 'border-l-warning' },
          { label: 'Internal hires (mo)', value: '6', border: 'border-l-success' },
        ].map((m) => (
          <Card key={m.label} className={`border-l-4 ${m.border}`}>
            <p className="text-sm text-fg-secondary">{m.label}</p>
            <p className="mt-1 font-mono text-xl font-semibold text-fg">
              {m.value}
            </p>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-display text-base font-semibold text-fg">
            Workload sample
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="load" fill="#427AB5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 font-display text-base font-semibold text-fg">
            Quick actions
          </h2>
          <div className="flex flex-col gap-2">
            <Button type="button" onClick={() => navigate(ROUTES.HR_SWAP)}>
              Swap management
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate(ROUTES.HR_TALENT_POOL)}
            >
              Talent pool
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

function CFOHome() {
  const { data } = useQuery({
    queryKey: ['cost-summary'],
    queryFn: getCostSummary,
  })

  if (!data) return <p className="text-sm text-fg-secondary">Loading…</p>

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={pageTransition}
    >
      <PageHeader title="Finance overview" description="Cost and headcount mix." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Hiring cost (mo)', value: `$${(data.monthlyHiringCost / 1000).toFixed(0)}k`, b: 'border-l-primary' },
          { label: 'Internal savings', value: `$${(data.internalSavings / 1000).toFixed(0)}k`, b: 'border-l-accent-dark' },
          { label: 'Allocation cost', value: `$${(data.allocationCost / 1000).toFixed(0)}k`, b: 'border-l-info' },
          { label: 'External hires', value: String(data.externalHireCount), b: 'border-l-warning' },
        ].map((x) => (
          <Card key={x.label} className={`border-l-4 ${x.b}`}>
            <p className="text-sm text-fg-secondary">{x.label}</p>
            <p className="mt-1 font-mono text-xl font-semibold">{x.value}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-2 font-display text-base font-semibold">Hiring trend</h2>
          <div className="h-56">
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
          <h2 className="mb-2 font-display text-base font-semibold">Internal vs external</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.headcountSplit}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  label
                >
                  {data.headcountSplit.map((e, i) => (
                    <Cell key={i} fill={e.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

function AdminHome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={pageTransition}
    >
      <PageHeader
        title="Admin"
        description="Companies, users, and AI configuration."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card interactive>
          <Link to={ROUTES.ADMIN_COMPANIES} className="font-medium text-fg">
            Companies →
          </Link>
        </Card>
        <Card interactive>
          <Link to={ROUTES.ADMIN_USERS} className="font-medium text-fg">
            Users →
          </Link>
        </Card>
        <Card interactive>
          <Link to={ROUTES.ADMIN_AI_CONFIG} className="font-medium text-fg">
            AI config →
          </Link>
        </Card>
      </div>
    </motion.div>
  )
}

function DeptManagerHome() {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={pageTransition}
    >
      <PageHeader
        title="Department dashboard"
        description="Team capacity and internal postings."
      />
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => navigate(ROUTES.DEPT_TEAM)}>
          My team
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => navigate(ROUTES.POST_ROLE)}
        >
          Post a role
        </Button>
      </div>
    </motion.div>
  )
}

export default function DashboardPage() {
  const role = useAuthStore((s) => s.user?.role)
  if (role === 'employee') return <EmployeeHome />
  if (role === 'hr_manager') return <HRHome />
  if (role === 'cfo') return <CFOHome />
  if (role === 'admin') return <AdminHome />
  if (role === 'dept_manager') return <DeptManagerHome />
  return null
}
