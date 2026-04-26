# MASTER PROMPT — Smart Workforce Exchange System
## Frontend Engineering Specification for Claude AI

---

## 0. READ BEFORE STARTING — PRIORITY RULES

This prompt covers the complete frontend of a **holding-scale HR SaaS platform**.
The following rules MUST be applied to every component without exception:

1. **No backend** — everything runs on mock data + local state
2. **No AI-look** — components must NOT have a generic AI template appearance
3. **Fixed color system** — only the defined design tokens are used
4. **TypeScript** — strict mode in every file
5. **Responsive** — mobile-first, but desktop is the primary target
6. **Accessibility** — WCAG 2.1 AA minimum compliance

---

## 1. FULL PROJECT CONTEXT

### What is this system?
**Smart Workforce Exchange System** — a B2B SaaS platform for large holding companies
like Azcon Holding that dynamically shares employees between subsidiaries using AI,
finds skill matches, and manages an internal talent marketplace for open positions.

### What is the problem?
- Company A has an idle employee; Company B needs that exact skill set
- The HR system cannot see this, so they search externally → wasted time + money
- No visibility into where employee skills exist across the holding

### What is the solution?
An AI-powered **Internal Talent Marketplace** — analyzes employees and matches them
to suitable projects, roles, and gig tasks within the holding's companies.

### User roles (5 distinct dashboards):
| Role | Description | Primary responsibility |
|---|---|---|
| `employee` | Staff member | Profile, marketplace, career |
| `hr_manager` | HR Manager | Workforce management, swaps, gap analysis |
| `dept_manager` | Department Head | Team oversight, posting tasks |
| `cfo` | CFO / Finance | Cost analysis, savings |
| `admin` | Super Admin | System, companies, users |

---

## 2. TECH STACK (non-negotiable)

```
Framework:        React 18 + TypeScript (strict)
Build tool:       Vite 5
Routing:          React Router v6 (createBrowserRouter)
State:            Zustand (global) + TanStack Query v5 (server/async state)
Forms:            React Hook Form + Zod (validation)
UI base:          Tailwind CSS v3 (utility-first)
Component lib:    shadcn/ui (selective usage, fully overridden)
Icons:            Lucide React
Charts:           Recharts
Tables:           TanStack Table v8
Notifications:    React Toastify
Date utilities:   date-fns
Animations:       Framer Motion (micro-interactions only)
Drag & Drop:      @dnd-kit/core (marketplace kanban board)
Export:           react-to-pdf / xlsx (CFO reports)
```

---

## 3. DESIGN SYSTEM (Design Tokens)

### 3.1 Color Palette

```css
/* Add to tailwind.config.ts and index.css */
:root {
  /* === PRIMARY BRAND === */
  --color-primary:       #427AB5;   /* Primary blue — CTA, links, active state */
  --color-primary-dark:  #124170;   /* Deep navy — header, sidebar, hover */
  --color-accent:        #AAFFC7;   /* Mint green — success, badges, highlights */

  /* === NEUTRAL === */
  --color-bg:            #FAFAFA;   /* Page background — near-white, NOT pure white */
  --color-surface:       #FFFFFF;   /* Card, panel background */
  --color-surface-2:     #F4F6F9;   /* Secondary surface (table rows, input bg) */
  --color-border:        #E2E8F0;   /* Default border */
  --color-border-focus:  #427AB5;   /* Focus ring color */

  /* === TEXT === */
  --color-text-primary:  #0F172A;   /* Primary text */
  --color-text-secondary:#475569;   /* Secondary / helper text */
  --color-text-muted:    #94A3B8;   /* Placeholder, disabled text */
  --color-text-inverse:  #FFFFFF;   /* Text on dark backgrounds */

  /* === SEMANTIC === */
  --color-success:       #16A34A;
  --color-success-bg:    #F0FDF4;
  --color-warning:       #D97706;
  --color-warning-bg:    #FFFBEB;
  --color-danger:        #DC2626;
  --color-danger-bg:     #FEF2F2;
  --color-info:          #0284C7;
  --color-info-bg:       #F0F9FF;

  /* === BRAND GRADIENTS (use sparingly) === */
  --gradient-brand:  linear-gradient(135deg, #427AB5 0%, #124170 100%);
  --gradient-accent: linear-gradient(135deg, #AAFFC7 0%, #427AB5 100%);
}
```

### 3.2 Tailwind Config

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#427AB5',
          dark:    '#124170',
          light:   '#EBF2FB',
        },
        accent: {
          DEFAULT: '#AAFFC7',
          dark:    '#16A34A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          2:       '#F4F6F9',
          3:       '#FAFAFA',
        },
        brand: {
          navy:  '#124170',
          blue:  '#427AB5',
          mint:  '#AAFFC7',
        },
      },
      fontFamily: {
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        display: ['Sora', 'sans-serif'],
      },
      borderRadius: {
        'xs':  '4px',
        'sm':  '6px',
        'md':  '8px',
        'lg':  '12px',
        'xl':  '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'card-lg': '0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)',
        'inner':   'inset 0 1px 2px rgba(0,0,0,0.06)',
        'focus':   '0 0 0 3px rgba(66,122,181,0.2)',
        'none':    'none',
      },
    },
  },
  plugins: [],
} satisfies Config
```

### 3.3 Typography

```
Google Fonts (add to index.html <head>):
  DM Sans        — 300, 400, 500, 600   (body text, UI labels)
  Sora           — 600, 700             (headings, display text)
  JetBrains Mono — 400, 500             (code blocks, IDs, metric numbers)
```

### 3.4 Spacing & Layout

```
Page padding:    px-6 (mobile: px-4)
Section gap:     gap-6
Card padding:    p-5 (compact: p-4, spacious: p-6)
Max content width: max-w-7xl mx-auto
Sidebar width:   w-64 (collapsed: w-16)
Header height:   h-16
```

---

## 4. COMPONENT DESIGN PRINCIPLES

### 4.1 WHAT NOT TO DO (Anti-patterns)

```
❌ Gradient backgrounds (especially purple/blue mesh backgrounds)
❌ Glassmorphism (backdrop-blur + semi-transparent cards)
❌ Neon glow effects on any element
❌ Generic "AI dashboard" look (dark sidebar + neon accents)
❌ Full pill buttons (border-radius: 9999px) used everywhere
❌ Inter / Roboto / Arial font families
❌ Shimmer gradient on loading skeletons
❌ Cards that scale(1.05) on hover — use background color instead
❌ Oversized icons next to text labels
❌ Purple as a primary brand color
❌ Animated gradient text effects
```

### 4.2 WHAT TO DO (Positive patterns)

```
✅ Sharp, clear borders (1px solid var(--color-border))
✅ Content-appropriate whitespace (generous but not wasteful)
✅ Deep navy sidebar (#124170) — professional, trusted feel
✅ Mint accent (#AAFFC7) — reserved for success states and highlights only
✅ Blue (#427AB5) — CTAs, active states, links
✅ DM Sans body text + Sora headings combination
✅ Hover triggers background-color change (NOT transform)
✅ Clear text hierarchy (size + weight + color variation)
✅ Dense, compact layout for data-heavy interfaces
✅ Color encodes meaning (status, priority, match score)
✅ Alternating row colors in tables (surface / surface-2)
```

### 4.3 Component Anatomy

#### Button

```tsx
// Variants:
// primary:   bg-primary text-white hover:bg-primary-dark
// secondary: bg-surface border border-border hover:bg-surface-2
// ghost:     transparent hover:bg-surface-2
// danger:    bg-danger-bg text-danger border border-danger hover:bg-red-100
// success:   bg-accent/30 text-accent-dark border border-accent hover:bg-accent/50

// Sizes: sm (h-8 px-3 text-sm), md (h-10 px-4), lg (h-12 px-6)

// Rules:
//   - border-radius: rounded-md (8px) — NO pill shape
//   - font-weight: 500 (medium)
//   - transition: background-color 150ms ease (no transform)
//   - loading state: spinner on left, text stays visible
//   - disabled: opacity-50 cursor-not-allowed
//   - icon + text: gap-2, icon size always 16px

<Button variant="primary" size="md" isLoading={false} leftIcon={<Plus size={16}/>}>
  New Listing
</Button>
```

#### Input

```tsx
// Rules:
//   - h-10 (standard), h-9 (compact)
//   - border: 1px solid border color
//   - focus: border-primary + box-shadow focus ring (shadow-focus)
//   - error: border-danger, error message below (text-xs text-danger)
//   - prefix/suffix slots for icons or text
//   - label above field, placeholder inside
//   - background: white
//   - border-radius: rounded-md
//   - NO animated typewriter placeholder (generic AI look)

<Input
  label="Employee Name"
  placeholder="e.g. John Smith"
  error="This field is required"
  prefix={<Search size={16}/>}
/>
```

#### Badge / Tag

```tsx
// Skill badges:
//   - compact: px-2 py-0.5 text-xs rounded-sm
//   - border: 1px solid, matching color family
//   - background: color/10 (very light tint)
//   - level variants: entry / mid / senior / expert
//   - level colors: gray / blue / primary / accent-dark

// Status badges:
//   - active:    accent-dark text + accent/20 background
//   - pending:   warning-bg + warning text
//   - inactive:  surface-2 + text-muted
//   - critical:  danger-bg + danger text
//   - on-transfer: info-bg + info text

// AI Match score badges (used in marketplace):
//   - 85-100%: accent-dark bg + white text ("Excellent Match")
//   - 65-84%:  primary/20 bg + primary text ("Good Match")
//   - 40-64%:  warning-bg + warning text ("Partial Match")
//   - <40%:    surface-2 + text-muted ("Low Match")
```

#### Card

```tsx
// Base card:
//   - bg-surface rounded-lg border border-border p-5
//   - shadow-card (very subtle)
//   - Interactive variant: hover:shadow-card-md hover:border-primary/30
//   - NO glass effect, NO gradient backgrounds
//   - NO transform on hover

// Metric card (for CFO / dashboard stats):
//   - Left accent: border-l-4 with semantic color
//   - Number: font-display text-2xl font-semibold (JetBrains Mono)
//   - Label: text-sm text-secondary
//   - Trend badge: colored arrow + % change (green = positive, red = negative)

// Employee card (in lists, talent pool):
//   - Avatar (initials fallback, deterministic color by name hash)
//   - Name + position
//   - Company badge
//   - Top 3 skill tags
//   - Workload bar (colored by percentage: green <60%, amber 60-85%, red >85%)
//   - Status badge
```

---

## 5. FOLDER STRUCTURE

```
src/
├── assets/
│   ├── fonts/              → Local font fallbacks (if needed)
│   └── images/             → Logo, placeholder avatars

├── components/
│   ├── ui/                 → Base components (shadcn/ui fully overridden)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Tabs.tsx
│   │   ├── Progress.tsx
│   │   ├── Avatar.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Switch.tsx
│   │   ├── Checkbox.tsx
│   │   ├── RadioGroup.tsx
│   │   └── index.ts
│   │
│   ├── layout/             → Structural layout components
│   │   ├── AppLayout.tsx         → Sidebar + Header + Content wrapper
│   │   ├── AuthLayout.tsx        → Login / Register wrapper
│   │   ├── Sidebar.tsx           → Navigation menu (role-based)
│   │   ├── Header.tsx            → Top bar (search, notifications, user menu)
│   │   ├── PageHeader.tsx        → Per-page title block with actions
│   │   └── EmptyState.tsx        → Empty data state component
│   │
│   └── shared/             → Domain-level reusable components
│       ├── EmployeeCard.tsx      → Employee mini card
│       ├── SkillTag.tsx          → Skill badge with level
│       ├── WorkloadBar.tsx       → Capacity progress bar
│       ├── MatchScore.tsx        → AI match % circular indicator
│       ├── AllocationChart.tsx   → 60/40 split pie or bar chart
│       ├── CompanyBadge.tsx      → Company logo + name chip
│       ├── RoleBadge.tsx         → User role badge
│       └── AITag.tsx             → "AI-powered" indicator chip

├── features/               → Feature-based modules (self-contained)
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── OnboardingWizard.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── OnboardingPage.tsx
│   │   └── auth.store.ts
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── StatCard.tsx
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── WelcomeBanner.tsx
│   │   └── pages/
│   │       ├── EmployeeDashboard.tsx
│   │       ├── HRDashboard.tsx
│   │       ├── DeptManagerDashboard.tsx
│   │       ├── CFODashboard.tsx
│   │       └── AdminDashboard.tsx
│   │
│   ├── employee/
│   │   ├── components/
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── SkillEditor.tsx
│   │   │   ├── ExperienceTimeline.tsx
│   │   │   ├── AllocationView.tsx
│   │   │   └── PerformanceChart.tsx
│   │   ├── hooks/
│   │   │   └── useEmployee.ts
│   │   └── pages/
│   │       ├── ProfilePage.tsx
│   │       ├── MyAllocationsPage.tsx
│   │       └── SwapProposalsPage.tsx
│   │
│   ├── marketplace/
│   │   ├── components/
│   │   │   ├── ListingCard.tsx
│   │   │   ├── ListingFilters.tsx
│   │   │   ├── AIMatchBadge.tsx
│   │   │   ├── ApplyModal.tsx
│   │   │   ├── ListingDetail.tsx
│   │   │   └── PostListingForm.tsx
│   │   ├── hooks/
│   │   │   ├── useMarketplace.ts
│   │   │   └── useAIMatch.ts
│   │   └── pages/
│   │       ├── MarketplacePage.tsx
│   │       ├── MyApplicationsPage.tsx
│   │       └── PostRolePage.tsx
│   │
│   ├── ai-advisor/
│   │   ├── components/
│   │   │   ├── CareerPathMap.tsx
│   │   │   ├── SkillGapVisual.tsx
│   │   │   ├── RecommendationCard.tsx
│   │   │   └── ProgressTracker.tsx
│   │   └── pages/
│   │       └── AIAdvisorPage.tsx
│   │
│   ├── hr-panel/
│   │   ├── components/
│   │   │   ├── WorkforceTable.tsx
│   │   │   ├── SwapCard.tsx
│   │   │   ├── GapChart.tsx
│   │   │   ├── ReplacementEngine.tsx
│   │   │   ├── TransferRequestCard.tsx
│   │   │   └── TrainingSuggestion.tsx
│   │   └── pages/
│   │       ├── HRWorkforcePage.tsx
│   │       ├── TalentPoolPage.tsx
│   │       ├── SkillGapPage.tsx
│   │       ├── SwapManagementPage.tsx
│   │       ├── InstantReplacementPage.tsx
│   │       └── TransferRequestsPage.tsx
│   │
│   ├── cost-dashboard/
│   │   ├── components/
│   │   │   ├── CostMetricCard.tsx
│   │   │   ├── SavingsCalculator.tsx
│   │   │   ├── CostBreakdownChart.tsx
│   │   │   └── ExportButton.tsx
│   │   └── pages/
│   │       ├── CFODashboardPage.tsx
│   │       ├── SavingsPage.tsx
│   │       └── ReportsPage.tsx
│   │
│   └── admin/
│       ├── components/
│       │   ├── CompanyTree.tsx
│       │   ├── UserTable.tsx
│       │   └── SystemHealth.tsx
│       └── pages/
│           ├── AdminDashboardPage.tsx
│           ├── CompanyManagementPage.tsx
│           ├── UserManagementPage.tsx
│           └── AIConfigPage.tsx

├── hooks/                  → Global shared hooks
│   ├── usePermission.ts
│   ├── useRole.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── useMediaQuery.ts

├── router/
│   ├── index.tsx           → Route definitions (createBrowserRouter)
│   ├── ProtectedRoute.tsx  → Role-based guard component
│   └── routes.ts           → Route path constants

├── services/               → API layer (mock-ready, backend-agnostic)
│   ├── api.ts              → Axios instance (currently mocked)
│   ├── mock/
│   │   ├── employees.mock.ts
│   │   ├── marketplace.mock.ts
│   │   ├── companies.mock.ts
│   │   └── analytics.mock.ts
│   ├── auth.service.ts
│   ├── employee.service.ts
│   ├── marketplace.service.ts
│   ├── hr.service.ts
│   ├── ai.service.ts
│   └── cost.service.ts

├── store/                  → Zustand stores
│   ├── auth.store.ts
│   ├── ui.store.ts         → Sidebar collapsed, modals, theme
│   └── notification.store.ts

├── types/                  → TypeScript interfaces (shared)
│   ├── employee.types.ts
│   ├── marketplace.types.ts
│   ├── company.types.ts
│   ├── ai.types.ts
│   └── common.types.ts

├── utils/
│   ├── formatters.ts       → Date, currency, percentage formatting
│   ├── validators.ts       → Zod schemas
│   ├── cn.ts               → clsx + twMerge utility
│   └── constants.ts

├── App.tsx
└── main.tsx
```

---

## 6. TYPE SYSTEM (TypeScript Interfaces)

```typescript
// types/employee.types.ts
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  company: Company;
  department: string;
  role: 'employee' | 'dept_manager' | 'hr_manager' | 'cfo' | 'admin';
  position: string;
  skills: Skill[];
  performanceScore: number;        // 0–100
  workloadPercent: number;         // 0–100
  status: 'active' | 'on-transfer' | 'on-leave' | 'inactive';
  allocation: Allocation[];
  joinedAt: string;                // ISO date string
  bio?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'domain';
  level: 'entry' | 'mid' | 'senior' | 'expert';
  yearsOfExperience: number;
  verified: boolean;
}

export interface Allocation {
  companyId: string;
  companyName: string;
  projectName: string;
  percent: number;                 // e.g. 60 (60% here), 40 (40% elsewhere)
  startDate: string;
  endDate?: string;
}

// types/marketplace.types.ts
export interface Listing {
  id: string;
  title: string;
  description: string;
  company: Company;
  department: string;
  type: 'task' | 'project' | 'temporary-role' | 'permanent-role';
  requiredSkills: Skill[];
  duration?: string;               // e.g. "3 months", "6 weeks"
  workloadPercent: number;         // 50 = part-time, 100 = full-time
  allocationSplit?: boolean;       // true = part-time, can be split
  compensation?: string;
  status: 'open' | 'in-review' | 'filled' | 'closed';
  postedBy: string;                // Employee ID
  postedAt: string;
  applicants: number;
  aiMatchScore?: number;           // 0–100, computed for current user
}

export interface Application {
  id: string;
  listingId: string;
  listing: Listing;
  applicantId: string;
  status: 'pending' | 'shortlisted' | 'approved' | 'rejected';
  appliedAt: string;
  note?: string;
}

export interface SwapProposal {
  id: string;
  fromEmployee: Employee;
  toEmployee: Employee;
  fromCompany: Company;
  toCompany: Company;
  skillMatchScore: number;         // 0–100
  proposedBy: 'ai' | 'hr' | 'manager';
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  duration: string;
  salarySplit: { companyA: number; companyB: number }; // percentages
  createdAt: string;
}

// types/company.types.ts
export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  employeeCount: number;
  holdingId: string;
}

// types/ai.types.ts
export interface AICareerRecommendation {
  type: 'role-change' | 'skill-gap' | 'training' | 'transfer';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  estimatedTimeline: string;
  potentialImpact: string;
  actions: string[];
}

export interface SkillGapAnalysis {
  departmentId: string;
  missingSkills: {
    skill: Skill;
    urgency: 'critical' | 'moderate' | 'low';
    headcountNeeded: number;
  }[];
  trainingCandidates: Employee[];
  estimatedHiringCost: number;
  estimatedTrainingCost: number;
  recommendation: 'train' | 'hire' | 'transfer';
}
```

---

## 7. MOCK DATA

```typescript
// services/mock/employees.mock.ts
export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'emp_001',
    firstName: 'Ayten',
    lastName: 'Mammadova',
    email: 'ayten.m@azcon-tech.az',
    avatar: undefined,
    company: {
      id: 'co_001',
      name: 'Azcon Tech',
      industry: 'Information Technology',
      employeeCount: 45,
      holdingId: 'holding_001',
    },
    department: 'Frontend Engineering',
    role: 'employee',
    position: 'Senior Frontend Developer',
    skills: [
      { id: 'sk_001', name: 'React',       category: 'technical', level: 'senior', yearsOfExperience: 4, verified: true  },
      { id: 'sk_002', name: 'TypeScript',  category: 'technical', level: 'senior', yearsOfExperience: 3, verified: true  },
      { id: 'sk_003', name: 'Node.js',     category: 'technical', level: 'mid',    yearsOfExperience: 2, verified: false },
      { id: 'sk_004', name: 'UI/UX Design',category: 'domain',    level: 'mid',    yearsOfExperience: 2, verified: true  },
    ],
    performanceScore: 87,
    workloadPercent: 40,
    status: 'active',
    allocation: [
      {
        companyId: 'co_001',
        companyName: 'Azcon Tech',
        projectName: 'ERP Modernization',
        percent: 100,
        startDate: '2024-01-15',
      },
    ],
    joinedAt: '2021-03-10',
    bio: 'Frontend developer with 5 years of experience. Deep expertise in the React ecosystem.',
  },
  {
    id: 'emp_002',
    firstName: 'Rashad',
    lastName: 'Aliyev',
    email: 'rashad.a@azcon-construction.az',
    company: {
      id: 'co_002',
      name: 'Azcon Construction',
      industry: 'Construction',
      employeeCount: 120,
      holdingId: 'holding_001',
    },
    department: 'IT Department',
    role: 'dept_manager',
    position: 'IT Manager',
    skills: [
      { id: 'sk_005', name: 'Project Management', category: 'soft',      level: 'expert', yearsOfExperience: 7, verified: true  },
      { id: 'sk_006', name: 'JavaScript',          category: 'technical', level: 'mid',    yearsOfExperience: 3, verified: false },
    ],
    performanceScore: 92,
    workloadPercent: 75,
    status: 'active',
    allocation: [
      {
        companyId: 'co_002',
        companyName: 'Azcon Construction',
        projectName: 'Digital Transformation',
        percent: 100,
        startDate: '2022-06-01',
      },
    ],
    joinedAt: '2019-09-15',
  },
  // Add at least 15 more employees from different companies and roles
];

// services/mock/marketplace.mock.ts
export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'lst_001',
    title: 'React Developer — 3-Month Project',
    description:
      'Azcon Construction needs an experienced React developer for their new customer portal. ' +
      'The selected candidate will join the team and deliver a fully functional portal within 3 months.',
    company: {
      id: 'co_002',
      name: 'Azcon Construction',
      industry: 'Construction',
      employeeCount: 120,
      holdingId: 'holding_001',
    },
    department: 'IT Department',
    type: 'project',
    requiredSkills: [
      { id: 'sk_001', name: 'React',      category: 'technical', level: 'senior', yearsOfExperience: 3, verified: true },
      { id: 'sk_002', name: 'TypeScript', category: 'technical', level: 'mid',    yearsOfExperience: 2, verified: true },
    ],
    duration: '3 months',
    workloadPercent: 100,
    allocationSplit: false,
    status: 'open',
    postedBy: 'emp_002',
    postedAt: '2024-11-20',
    applicants: 2,
    aiMatchScore: 94,
  },
  {
    id: 'lst_002',
    title: 'Data Analyst — Part-time (50%)',
    description:
      'Azcon Retail is looking for a part-time data analyst for sales analytics. ' +
      'Employees currently on other projects may apply since this is a 50% allocation.',
    company: {
      id: 'co_003',
      name: 'Azcon Retail',
      industry: 'Retail',
      employeeCount: 80,
      holdingId: 'holding_001',
    },
    department: 'Finance',
    type: 'task',
    requiredSkills: [
      { id: 'sk_007', name: 'SQL',      category: 'technical', level: 'mid', yearsOfExperience: 2, verified: true  },
      { id: 'sk_008', name: 'Power BI', category: 'technical', level: 'mid', yearsOfExperience: 1, verified: false },
    ],
    duration: '2 months',
    workloadPercent: 50,
    allocationSplit: true,
    status: 'open',
    postedBy: 'emp_003',
    postedAt: '2024-11-18',
    applicants: 5,
    aiMatchScore: 71,
  },
  // Add at least 12 more listings with varied types, companies, and skills
];

// services/mock/companies.mock.ts
export const MOCK_COMPANIES: Company[] = [
  { id: 'co_001', name: 'Azcon Tech',         industry: 'Information Technology', employeeCount: 45,  holdingId: 'holding_001' },
  { id: 'co_002', name: 'Azcon Construction', industry: 'Construction',            employeeCount: 120, holdingId: 'holding_001' },
  { id: 'co_003', name: 'Azcon Retail',       industry: 'Retail',                 employeeCount: 80,  holdingId: 'holding_001' },
  { id: 'co_004', name: 'Azcon Energy',       industry: 'Energy',                 employeeCount: 60,  holdingId: 'holding_001' },
  { id: 'co_005', name: 'Azcon Finance',      industry: 'Financial Services',     employeeCount: 35,  holdingId: 'holding_001' },
];
```

---

## 8. ROUTING AND ROLE GUARD

```typescript
// router/routes.ts
export const ROUTES = {
  // Auth (public)
  LOGIN:           '/login',
  REGISTER:        '/register',
  ONBOARDING:      '/onboarding',

  // Shared (all authenticated roles)
  DASHBOARD:       '/dashboard',
  NOTIFICATIONS:   '/notifications',
  SETTINGS:        '/settings',

  // Employee
  PROFILE:         '/profile',
  ADVISOR:         '/advisor',
  MARKETPLACE:     '/marketplace',
  APPLICATIONS:    '/marketplace/applications',
  ALLOCATIONS:     '/allocations',
  SWAP_PROPOSALS:  '/swap-proposals',

  // Department Manager
  DEPT_TEAM:       '/dept/team',
  POST_ROLE:       '/marketplace/post',

  // HR Manager
  HR_WORKFORCE:    '/hr/workforce',
  HR_TALENT_POOL:  '/hr/talent-pool',
  HR_SKILL_GAP:    '/hr/skill-gap',
  HR_SWAP:         '/hr/swap',
  HR_REPLACEMENT:  '/hr/replacement',
  HR_TRANSFERS:    '/hr/transfers',
  HR_TRAINING:     '/hr/training',

  // CFO / Finance
  COST_DASHBOARD:  '/finance/cost',
  SAVINGS:         '/finance/savings',
  REPORTS:         '/finance/reports',
  ROI_TRACKER:     '/finance/roi',

  // Admin
  ADMIN:           '/admin',
  ADMIN_COMPANIES: '/admin/companies',
  ADMIN_USERS:     '/admin/users',
  ADMIN_AI_CONFIG: '/admin/ai-config',
} as const;

// router/ProtectedRoute.tsx
// Props: roles?: UserRole[]
// - If user is not authenticated → redirect to /login
// - If user's role is not in the allowed roles array → redirect to /dashboard
// - Renders children if authorized

// Demo authentication (localStorage-based simulation):
// The Login page includes a "Demo Login" section with 5 pre-built accounts:
//   employee@demo.az  / demo123  → logs in as Ayten (employee)
//   hr@demo.az        / demo123  → logs in as HR Manager
//   manager@demo.az   / demo123  → logs in as Dept Manager
//   cfo@demo.az       / demo123  → logs in as CFO
//   admin@demo.az     / demo123  → logs in as Super Admin

// After login, redirect based on role:
//   employee     → /dashboard
//   hr_manager   → /hr/workforce
//   dept_manager → /dept/team
//   cfo          → /finance/cost
//   admin        → /admin
```

---

## 9. PAGE-BY-PAGE SPECIFICATION

### 9.1 Login Page

```
Layout (split screen):
  Left panel (40% width):
    · Background: brand navy (#124170)
    · "Smart Workforce Exchange" title in Sora font (white)
    · 3 key system benefits with icon + text
    · Holding logo placeholder
    · Subtle mint (#AAFFC7) accent on title/icon elements

  Right panel (60% width):
    · White background
    · Centered form (max-width: 400px)
    · "Sign in to your account" heading (Sora, 24px)
    · Email input + Password input (with show/hide toggle)
    · "Remember me" checkbox
    · Primary CTA: "Sign In" button (full width)
    · "Forgot password?" link (right-aligned, text-primary)
    · Divider: "or sign in with a demo account"
    · 5 demo role cards in a grid:
        Each card: role icon + role name + email shown
        Click → auto-fills credentials and logs in
        Colors: each role has a distinct left border color

UI behavior:
  - Wrong credentials: toast.error() + shake animation on form
  - Loading: button shows spinner, form inputs disabled
  - Success: redirect based on role (see routing section)
  - Form validation: Zod schema, inline error messages
```

### 9.2 Onboarding Wizard (new employee first login)

```
4-step wizard with progress indicator at top:

  Step 1 — Personal Information
    · First name, Last name, Phone (optional)
    · Department (select from company departments)
    · Current position (text input)
    · Short bio (textarea, max 300 chars)

  Step 2 — Skills Setup
    · Predefined skill categories: Technical / Soft / Language / Domain
    · Search + checkbox selection from skill library
    · Add custom skill (text input)
    · For each selected skill:
        Level selector: entry → mid → senior → expert (segmented control)
        Years of experience (number input, 0–20)
    · AI suggestion banner: "Based on your role, you might also have..."

  Step 3 — Career Goals
    · "Where do you want to be in 1 year?" (textarea)
    · Target role (select)
    · Target company / department within holding (select)
    · Mobility preference toggle: "Open to internal transfers"
    · Part-time availability toggle: "Available for split allocation"

  Step 4 — Summary
    · Read-only review of all entered data
    · Edit links for each section
    · "Complete Setup" primary button → redirect to dashboard

Layout rules:
  - Step indicator: numbered circles (active = primary blue, completed = accent green)
  - "Back" and "Next" navigation buttons
  - "Skip this step" ghost link on steps 2–3
  - Each step card: white surface, card shadow, max-width 600px, centered
```

### 9.3 Employee Dashboard

```
Layout (main grid):

  Welcome Banner (full width):
    · "Good morning, Ayten! You have 2 new AI-matched listings today."
    · Soft mint/primary tinted background (not white, not colored solid)
    · AI match count badge (accent color)
    · "View Listings" ghost button

  Stats Row (4 metric cards):
    · Current Workload: X% with progress bar + color coding
    · Active Allocations: count
    · Total Skills: count + "View profile" link
    · Performance Score: X/100 with circular progress (Recharts RadialBar)

  Main Content (2-column grid, 2/3 + 1/3):

    Left column (2/3):
      · "Recommended for You" section:
          3 ListingCard components (from marketplace)
          "View all listings" link at bottom
      · "AI Career Recommendation":
          Single recommendation card with priority badge
          Action button
      · "Active Tasks" (if any allocations active):
          Compact task list with company, project, % allocation

    Right column (1/3):
      · Mini profile card:
          Avatar + name + company + position
          "Edit Profile" link
          Performance score pill
      · Skill Radar Chart (Recharts RadarChart):
          Top 5 skills by category
          Branded colors
      · Pending Swap Proposals (if any):
          Compact card with employee names + status
      · Recent Notifications:
          Last 4 notifications, "View all" link
```

### 9.4 Employee Profile Page

```
Layout:

  Profile Header:
    · Navy gradient cover band (not image — pure CSS gradient)
    · Avatar: 80px circle, initials fallback, deterministic background color
    · Full name (Sora, 22px, white)
    · Position + Company (white, 14px)
    · Status badge (active/on-transfer/on-leave)
    · "Edit Profile" button (top right)
    · Stats row below avatar: Skills count | Performance | Joined date

  Tab Navigation: Skills / Experience / Allocations / Performance

  [Skills Tab]:
    · Grouped by category: Technical / Soft / Domain / Language
    · Each category: section heading + skill badges in flex-wrap
    · Each badge: name + level dots (4 dots, filled = current level) + verified checkmark
    · "+ Add Skill" button → modal with search + level selector
    · "AI Skill Suggestions" collapsible banner:
        "Our AI detected you may also have these skills based on your experience"
        Suggestion cards with "Add" button

  [Experience Tab]:
    · Vertical timeline (left border line)
    · Each entry: company logo placeholder | position | date range | bullet achievements
    · "Add Experience" button at bottom

  [Allocations Tab]:
    · Current allocation pie chart (Recharts PieChart):
        Each slice = a company/project with label + %
        Brand colors
    · Allocation table:
        Company | Project | % | Start Date | End Date | Status
    · Transfer history accordion (collapsible)

  [Performance Tab]:
    · Monthly performance line chart (last 12 months, Recharts LineChart)
    · KPI breakdown cards: Punctuality | Quality | Teamwork | Initiative
    · Manager feedback list (last 3 entries)
```

### 9.5 Marketplace Page

```
Layout (sidebar + main):

  Filter Sidebar (left, 260px fixed):
    · Search input (debounced 300ms, searches title + description + skills)
    · Listing type: checkbox group (Task / Project / Temporary Role / Permanent Role)
    · Company: multi-select dropdown (all holding companies)
    · Workload %: range slider (0–100, step 10)
    · Required skills: tag-based multi-select with search
    · Duration: select (< 1 month / 1–3 months / 3–6 months / 6+ months)
    · "AI Match 70%+" toggle: filters to high-match listings only
    · Active filter count badge on "Filters" heading
    · "Clear all filters" link (only shown when filters are active)

  Main Area (right):
    · Sort bar:
        Result count: "14 listings found"
        Sort options: "Newest / AI Match / Company / Workload"
    · Listing cards grid (2 columns desktop, 1 column mobile)

  [ListingCard Component]:
    · Top row: Company name + logo placeholder (left) | AI Match badge (right)
      Match badge colors:
        ≥85%: green badge "Excellent Match"
        65–84%: blue badge "Good Match"
        40–64%: amber badge "Partial Match"
        <40%: gray, no badge shown
    · Title (Sora, 16px, semibold)
    · Type chip + Duration chip + Workload chip (compact badges)
    · Description preview (2 lines, text-secondary, text-sm)
    · Required skills: first 3 shown as tags, "+N more" if excess
    · Bottom row: Applicants count (left) | "Apply" primary button + "Details" ghost button (right)
    · Hover: border-primary/40 + shadow-card-md

  [Listing Detail Modal — full spec]:
    · Full-width modal, max-width 720px
    · Header: title + company + type badge
    · Description: full text, properly formatted
    · Company section: name + industry + employee count
    · Required skills: all skills with level indicators
    · Current user skill match section:
        "Your match: 94%" progress bar
        Matched skills (green checkmark) vs missing skills (amber warning)
    · Application form:
        Motivation note (textarea, max 500 chars, live counter)
        "Submit Application" primary button
        On success: modal closes + toast.success()
```

### 9.6 AI Career Advisor Page

```
Layout (two-column):

  Left Panel (1/3):
    · Employee profile summary (avatar + name + current role)
    · Current skill summary (top 5 skills as tags)
    · Career goal display (editable inline):
        "Your goal: Senior Full-Stack Developer"
        Edit pencil icon → textarea opens
    · "Analyze My Career" primary button
    · On click: 2-second simulated loading (animated pulse + progress bar)

  Right Panel (2/3):
    · Career Path Visualization:
        Current position node (navy) → branching to 3 possible paths
        Each path node: role title + estimated time + key skills needed
        Visual: SVG-based or Recharts custom shape
        Colors: primary blue (current) → accent (recommended path) → gray (alternatives)
    · Skill Gap Section:
        Heading: "To reach your goal, you need:"
        Progress bars: Current skill level → Required level
        (e.g., "Node.js: Mid [▓▓░░] → Senior required")
        Training resource links (mock external links)
    · AI Recommendations (card list):
        Priority badge (high = red, medium = amber, low = gray)
        Icon + title + description
        Action button: "Explore transfer" / "Start learning" / "Apply now"
        Example: "Work on the Azcon Retail data project for 3 months → promoted to Senior"
```

### 9.7 HR Dashboard

```
Top Metrics Row (5 cards with colored left border):
  · Total Workforce: N employees across holding
  · Active Transfers/Swaps: N in progress
  · Average Workload: X% (color coded: green <70%, amber 70–85%, red >85%)
  · Open Positions: N unfilled listings in marketplace
  · This Month's Internal Hires: N (from marketplace, not external)

Main Grid (2/3 + 1/3):

  Left Column (2/3):
    · Workload Distribution Chart (Recharts BarChart):
        X-axis: companies, Y-axis: avg workload %
        Colored bars: green/amber/red based on thresholds
        Horizontal reference line at 80%
    · Pending Transfers Table (TanStack Table, compact):
        Columns: Employee | From Company → To Company | Skill Match | Duration | Status | Actions
        Actions: Approve / Reject buttons (compact)
        Max 5 rows, "View all" link to full transfers page
    · Recent Swap Proposals (card list):
        Last 3 swap proposals, each with AI/HR origin badge + status + actions

  Right Column (1/3):
    · Quick Actions panel:
        "Create New Swap" button
        "Run Skill Gap Analysis" button
        "View Talent Pool" button
    · Critical Skill Shortage Alerts:
        Skills where gap is critical (red border-l-4)
        Skill name + department + urgency
    · Upcoming Allocation Endings (within 2 weeks):
        Employee name + project + end date
        "Reassign" action link
```

### 9.8 HR Workforce Page (Full Table)

```
TanStack Table v8 with full feature set:

Columns:
  · Avatar + Full Name (sortable, searchable)
  · Company (filterable via column header dropdown)
  · Department (filterable)
  · Position (searchable)
  · Top Skills (3 badge max, "+N" overflow)
  · Workload % (inline progress bar, color coded)
  · Status (badge: active / on-transfer / on-leave / inactive)
  · Performance Score (number, colored: green ≥80, amber 60–79, red <60)
  · Actions (3-dot dropdown: View Profile / Propose Transfer / Create Swap)

Table features:
  · Global search bar (debounced 300ms) — above table
  · Per-column filter dropdowns (company, department, status)
  · Multi-column sort (click header, shift+click for secondary sort)
  · Row checkboxes for batch operations:
      Batch actions bar appears when rows selected:
        "Export selected" / "Send notification" / "Bulk status update"
  · Pagination: rows per page selector (10 / 25 / 50) + page navigation
  · Column visibility toggle (hide/show columns)
  · "Export to Excel" button (xlsx library) — exports current filtered view
  · "Switch to Card View" toggle → renders same data as EmployeeCard grid
  · Loading: skeleton rows (no shimmer gradient, use simple bg-surface-2 pulse)
  · Empty state: illustration + "No employees match your filters"
```

### 9.9 Skill Gap Analysis Page

```
Controls Row (top):
  · Company selector (dropdown, single)
  · Department selector (depends on company)
  · Time horizon: "Next 3 months / 6 months / 1 year" (segmented)
  · "Run AI Analysis" primary button → 2s simulated loading

Results Section (after analysis runs):

  Critical Gaps (red border-l-4 cards):
    Each card: skill name | "X people needed" | urgency badge | department
    Expand: list of current employees with partial skill match

  Moderate Gaps (amber cards):
    Same structure, lower urgency styling

  Training Candidates Table:
    Who can be trained internally?
    Columns: Employee | Current Level | Target Level | Estimated Training Time | Cost
    "Suggest Training" action per row

  Cost Comparison Chart (Recharts GroupedBarChart):
    3 bars per skill: External Hire Cost | Internal Training Cost | Internal Transfer (₼0)
    Clear visual showing where savings are

  AI Recommendation Banner (full width):
    "Recommendation: Train 2 internal candidates for React Senior.
     Estimated saving: ₼8,400 vs external hire."
    CTA: "Create Training Plan" / "Post Internal Listing"
```

### 9.10 Swap Management Page

```
3-column Kanban Board (@dnd-kit):
  Column 1: Pending    (amber header, bg-warning-bg/30)
  Column 2: Active     (green header, bg-success-bg/30)
  Column 3: Completed  (gray header, bg-surface-2)

[SwapCard Component]:
  · Header: "AI Suggested" or "HR Created" badge (small, left aligned)
  · Employee A ↔ Employee B:
      Both with avatar + name + company in compact layout
      Arrow icon between them
  · Skill Match Score: circular progress indicator (Recharts RadialBar)
    Color: accent (≥85%) / primary (65–84%) / amber (<65%)
  · Duration chip
  · Salary split: "70% / 30%" chip
  · Status badge
  · Action buttons (Pending column only):
      "Approve" (accent/success) + "Reject" (ghost danger)
  · "View Details" link → detail modal

"Create New Swap" button (top right, primary):
  Opens a modal:
    · "Employee A" searchable select (name + company + workload shown)
    · "Employee B" searchable select
    · On both selected: AI match score appears instantly (mock calculation)
    · Duration: select (1 week / 2 weeks / 1 month / 3 months / custom)
    · Salary split: two sliders (A% and B%, must sum to 100)
    · Notes textarea
    · "Create Swap Proposal" → adds to Pending column + toast.success()

Drag-and-drop:
  Cards can be dragged between columns
  On drop: status updates (optimistic update) + toast.info()
  Drag restricted: Completed cards cannot be moved
```

### 9.11 Instant Replacement Page

```
Trigger Section:
  · "Who is leaving?" employee search/select (searchable, shows avatar + name + role)
  · Departure date picker (date-fns + custom input)
  · Urgency: "Immediately / Within 1 week / Within 1 month" (radio group)
  · "Find Replacements" primary button

Loading State:
  · 2-second animated loading:
      "Analyzing 245 employees across 5 companies..."
      Animated progress bar (mock, not real progress)
      "Checking skill compatibility..."

Results Section (animated fade-in after loading):
  Top 3 Replacement Candidates (rank 1, 2, 3):
    Each card: rank badge (1st/2nd/3rd) | avatar + name + company + position
    · Skill match score (large, colored number) — e.g., "94% match"
    · Matched skills: checkmarks for each required skill
    · Current workload: X% (available capacity shown)
    · Transfer time: "Available immediately" / "Available in 2 weeks"
    · "Select This Employee" primary button
      → opens transfer flow modal (duration, salary, approvals needed)

  Skill Gap Warning (if best match < 100%):
    Amber banner: "Note: This candidate is missing [Skill X]. Suggest adding training."

  "See All Candidates" ghost button → expands to full ranked list (TanStack Table)
```

### 9.12 CFO Cost Dashboard Page

```
Top Metrics Row (4 cards with border-l-4):
  · This Month's Hiring Cost: $X | trend badge (-12% ↓ green)
  · Internal Transfer Savings: $Y (vs what external hire would have cost)
  · Active Allocation Cost: $Z / month (total salary cost across allocations)
  · External Hire Count: N | trend (-3 ↓ green = fewer external hires = good)

Charts Section (2-column grid):

  Left:
    · Monthly Hiring Cost Trend (Recharts LineChart, last 12 months):
        Line: total hiring cost
        Reference line: company budget
        Tooltip with month breakdown
    · Chart colors: primary blue line, danger-bg fill below line if over budget

  Right:
    · Internal vs External Headcount (Recharts PieChart):
        "X% internal marketplace, Y% external hires"
        Colors: accent for internal (good), gray for external
    · Per-company Workforce Cost (Recharts BarChart, compact):
        Each bar = one company
        Hover tooltip with breakdown

Savings Calculator (full-width card):
  · Heading: "What if you hadn't hired internally?"
  · Inputs: Role type | Seniority level | Duration | Estimated salary
  · "Calculate Potential Savings" button
  · Result (animated number reveal):
      "By using internal transfers instead, you saved an estimated $12,400"
  · "Add to Report" button

Reports Section:
  · Date range picker (start → end)
  · Report type: dropdown (Cost Summary / Transfer ROI / Skill Investment / Full Report)
  · "Generate PDF" button (react-to-pdf)
  · "Export Excel" button (xlsx)
  · Preview: summary stats shown below as read-only
```

### 9.13 Admin Pages

```
Company Management:
  · Holding structure tree (collapsible, indented):
      Azcon Holding (root)
        ├── Azcon Tech
        ├── Azcon Construction
        ├── Azcon Retail
        └── ...
  · Per company: employee count | active transfers | edit | deactivate
  · "Add New Company" → slide-over form panel (not modal)
  · Edit → inline form within the tree row

User Management (TanStack Table):
  · Columns: Avatar + Name | Email | Company | Role | Status | Last Active | Actions
  · Role change: inline select dropdown (saves immediately + toast)
  · Activate/Deactivate: toggle switch (optimistic update)
  · "Reset Password" in actions dropdown → toast.info("Reset link sent")
  · Bulk actions: select rows → "Bulk deactivate" / "Export"

AI Configuration:
  · "Match Algorithm Weights" section:
      4 sliders (must total 100%):
        Skill Match:    [====------] 40%
        Workload:       [===-------] 25%
        Performance:    [===-------] 20%
        Career Fit:     [==--------] 15%
      Live preview: "With these weights, a React Developer would match..."
  · Model settings (mock dropdowns): "AI Model Version", "Confidence Threshold"
  · "Save Configuration" primary button
  · "Reset to Defaults" ghost danger button → confirm dialog before resetting
```

---

## 10. LAYOUT COMPONENT SPECIFICATION

```tsx
// components/layout/Sidebar.tsx

// Visual design:
//   background: #124170 (brand navy)
//   text: white for nav labels
//   active item: bg-primary (#427AB5) rounded-md px-3
//   hover: bg-white/10 transition
//   logo section: top, "SWE" monogram + mint (#AAFFC7) dot or underline
//   collapsed state: w-16, show icons only (tooltip on hover)
//   collapse toggle: chevron button on right edge of sidebar
//   bottom section: user avatar + name + role + logout button
//   nav items filtered by useRole() hook

// Full nav item map (role-based):
const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  employee: [
    { icon: LayoutDashboard, label: 'Dashboard',       path: '/dashboard'              },
    { icon: User,            label: 'My Profile',      path: '/profile'                },
    { icon: Bot,             label: 'AI Advisor',      path: '/advisor'                },
    { icon: Briefcase,       label: 'Marketplace',     path: '/marketplace'            },
    { icon: FileText,        label: 'My Applications', path: '/marketplace/applications'},
    { icon: ArrowLeftRight,  label: 'Swap Proposals',  path: '/swap-proposals'         },
    { icon: PieChart,        label: 'My Allocations',  path: '/allocations'            },
  ],
  hr_manager: [
    { icon: LayoutDashboard, label: 'Dashboard',       path: '/dashboard'      },
    { icon: Users,           label: 'Workforce',       path: '/hr/workforce'   },
    { icon: Star,            label: 'Talent Pool',     path: '/hr/talent-pool' },
    { icon: TrendingUp,      label: 'Skill Gap',       path: '/hr/skill-gap'   },
    { icon: ArrowLeftRight,  label: 'Swap Management', path: '/hr/swap'        },
    { icon: Zap,             label: 'Instant Replace', path: '/hr/replacement' },
    { icon: FileCheck,       label: 'Transfer Requests',path: '/hr/transfers'  },
    { icon: BookOpen,        label: 'Training',        path: '/hr/training'    },
  ],
  dept_manager: [
    { icon: LayoutDashboard, label: 'Dashboard',       path: '/dashboard'       },
    { icon: Users,           label: 'My Team',         path: '/dept/team'       },
    { icon: PlusSquare,      label: 'Post a Role',     path: '/marketplace/post'},
    { icon: FileCheck,       label: 'Approve Requests',path: '/hr/transfers'    },
  ],
  cfo: [
    { icon: LayoutDashboard, label: 'Dashboard',    path: '/dashboard'    },
    { icon: DollarSign,      label: 'Cost Analysis', path: '/finance/cost' },
    { icon: Calculator,      label: 'Savings',       path: '/finance/savings'},
    { icon: BarChart2,       label: 'Reports',       path: '/finance/reports'},
    { icon: TrendingUp,      label: 'ROI Tracker',   path: '/finance/roi'  },
  ],
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard',    path: '/admin'               },
    { icon: Building2,       label: 'Companies',    path: '/admin/companies'     },
    { icon: Users,           label: 'Users',        path: '/admin/users'         },
    { icon: Settings,        label: 'AI Config',    path: '/admin/ai-config'     },
  ],
};

// components/layout/Header.tsx
// Height: h-16
// Background: white, border-bottom: 1px solid border
// Left: page breadcrumb (dynamic via useLocation)
// Center: global search bar (opens command palette on focus — optional)
// Right: notification bell (with badge count) | user avatar dropdown
//   Avatar dropdown: "My Profile" | "Settings" | divider | "Sign Out"
```

---

## 11. STATE MANAGEMENT

```typescript
// store/auth.store.ts
interface AuthStore {
  user: Employee | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Employee>) => void;
}

// Implementation: Zustand with persist middleware (localStorage)
// On app load: check localStorage for saved session → restore user
// On logout: clear localStorage + redirect to /login

// store/ui.store.ts
interface UIStore {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;
  activeModal: string | null;
  openModal: (id: string, data?: unknown) => void;
  closeModal: () => void;
  modalData: unknown;
}

// TanStack Query usage pattern:
// Each service function returns Promise<T> (currently with mock data)
// Feature hooks wrap these in useQuery / useMutation:

// Example:
export function useListings(filters?: ListingFilters) {
  return useQuery({
    queryKey: ['listings', filters],
    queryFn: () => marketplaceService.getListings(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useApplyToListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ApplicationPayload) => marketplaceService.apply(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast.success('Your application was submitted successfully!');
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });
}
```

---

## 12. TOAST NOTIFICATIONS (React Toastify)

```typescript
// main.tsx or App.tsx — ToastContainer configuration:
<ToastContainer
  position="top-right"
  autoClose={4000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable={false}
  theme="light"
  toastStyle={{
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '14px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    border: '1px solid var(--color-border)',
  }}
/>

// Usage examples across the app:
toast.success('Application submitted successfully!');
toast.error('Failed to save changes. Please try again.');
toast.info('AI analysis started. Results ready in ~2 seconds...');
toast.warning("This employee's workload is already at 85%.");
toast.success('Swap proposal created and sent for approval.');
toast.info('Password reset link sent to user email.');
toast.error('You do not have permission to perform this action.');

// For long operations (AI analysis simulation):
const toastId = toast.loading('Running AI skill gap analysis...');
await simulateDelay(2000);
toast.update(toastId, {
  render: 'Analysis complete! 3 critical gaps found.',
  type: 'success',
  isLoading: false,
  autoClose: 4000,
});
```

---

## 13. ANIMATION PRINCIPLES (Framer Motion)

```typescript
// RULE: Animations must be purposeful. No decoration for decoration's sake.

// 1. Page transitions (on every route change):
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.1 } },
};
// Wrap each page in: <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">

// 2. Card list stagger (for marketplace, talent pool, notifications):
const containerVariants = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
};

// 3. Modal open/close:
const modalVariants = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.15, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.96, y: 4, transition: { duration: 0.1 } },
};

// 4. AI analysis loading simulation:
// Animated dots: "Analyzing..." with 3 bouncing dots (CSS keyframes, no Framer)
// Progress bar: grows from 0 to 100% over 2 seconds (Framer motion value)
// Results fade in: staggered card entrance after loading completes

// 5. Metric number animation (dashboard stat cards):
// Use Framer Motion useMotionValue + animate on mount
// Numbers count up from 0 to final value over 600ms

// BANNED animations:
// ❌ Continuous rotating decorative elements
// ❌ Background particle systems
// ❌ Heavy parallax on scroll
// ❌ 3D CSS transforms (perspective, rotateX/Y)
// ❌ Animated gradient backgrounds
// ❌ Typewriter text effects on functional UI
```

---

## 14. ACCESSIBILITY REQUIREMENTS

```
Forms:
  - Every input has an associated <label> (htmlFor linked to input id)
  - Error messages are associated via aria-describedby
  - Required fields marked with aria-required="true"
  - Form submission errors announced via aria-live="polite"

Keyboard Navigation:
  - All interactive elements reachable and operable via keyboard
  - Tab order follows visual reading order
  - Modals: focus trapped inside, Escape closes, focus returns to trigger
  - Dropdowns: Arrow keys navigate options, Enter selects, Escape closes
  - Data tables: arrow key navigation within cells

Focus Styles:
  - Never remove outline (never use outline: none without replacement)
  - Custom focus ring: outline: 3px solid #427AB5; outline-offset: 2px;
  - Apply to all focusable elements via Tailwind: focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2

Semantic HTML:
  - <main>, <nav>, <aside>, <header>, <footer> used correctly
  - Headings follow hierarchy (h1 → h2 → h3, no skipping)
  - Tables use <th scope="col"> and <caption>
  - Icon-only buttons have aria-label
  - Status badges have role="status" where appropriate

Color & Contrast:
  - Minimum 4.5:1 contrast ratio for body text
  - Minimum 3:1 for large text and UI components
  - Information is NEVER conveyed by color alone (add icon or text)
  - Workload bar: color + percentage number always shown together
  - Match score: color + number always shown together
```

---

## 15. PERFORMANCE REQUIREMENTS

```typescript
// Code splitting — lazy load every feature route:
const LoginPage          = lazy(() => import('./features/auth/pages/LoginPage'));
const MarketplacePage    = lazy(() => import('./features/marketplace/pages/MarketplacePage'));
const HRWorkforcePage    = lazy(() => import('./features/hr-panel/pages/HRWorkforcePage'));
// ... etc for all pages

// Wrap router in <Suspense fallback={<PageSkeleton />}>

// TanStack Query caching:
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,        // 5 minutes default
      gcTime: 1000 * 60 * 30,          // 30 minutes in cache
      retry: 1,                         // 1 retry on failure
      refetchOnWindowFocus: false,      // no refetch on tab switch (mock data)
    },
  },
});

// For mock data, set staleTime: Infinity to prevent unnecessary "refetches"

// Virtual scrolling (for large lists):
// Use TanStack Virtual for Workforce table when > 100 rows
// Use @tanstack/react-virtual for marketplace listings if > 50 items

// Image / Avatar optimization:
// Avatars: always use lazy loading
// Fallback: initials circle (deterministic color by name hash)
// No external image CDN needed (all avatars are initials-based)

// Debouncing:
// Search inputs: 300ms debounce via useDebounce hook
// Filter changes: 150ms debounce before query refetch

// Memoization:
// Use useMemo ONLY for expensive computations (e.g., filter + sort of large arrays)
// Use useCallback ONLY for stable function references passed to memoized children
// Do NOT over-memoize — premature optimization causes bugs
```

---

## 16. MVP BUILD ORDER

```
Phase 1 — Foundation (start here):
  ✅ Project setup (Vite + TS + Tailwind + shadcn)
  ✅ Design token integration (CSS variables + Tailwind config)
  ✅ Font imports (DM Sans, Sora, JetBrains Mono)
  ✅ Base UI components (Button, Input, Badge, Card, Modal, Avatar)
  ✅ Auth store (Zustand + localStorage persistence)
  ✅ Login page (split layout + demo login cards)
  ✅ AppLayout (Sidebar + Header + content area)
  ✅ ProtectedRoute (role-based guard)

Phase 2 — Employee Experience:
  ✅ Onboarding wizard (4 steps)
  ✅ Employee Dashboard
  ✅ Profile page (4 tabs)
  ✅ Marketplace page (filters + listings + apply modal)
  ✅ My Applications page

Phase 3 — HR Core:
  ✅ HR Dashboard
  ✅ Workforce page (TanStack Table, full features)
  ✅ Swap Management (3-column kanban with dnd-kit)
  ✅ Instant Replacement page
  ✅ Transfer Requests page

Phase 4 — AI Features:
  ✅ AI Career Advisor page (career path + skill gap)
  ✅ Skill Gap Analysis page
  ✅ AI match scoring throughout marketplace

Phase 5 — Finance + Admin:
  ✅ CFO Dashboard + charts
  ✅ Savings Calculator
  ✅ Reports + export
  ✅ Admin Company Management
  ✅ Admin User Management
  ✅ AI Config page

Phase 6 — Polish + Completeness:
  ✅ Framer Motion page transitions + stagger animations
  ✅ Toast notifications throughout all user actions
  ✅ Empty states for all data views
  ✅ Error boundaries per feature
  ✅ Mobile responsive pass (all pages)
  ✅ Accessibility audit
  ✅ Performance: code splitting + lazy loading
```

---

## 17. PER-COMPONENT CHECKLIST

```
Before submitting any component, verify:
  □ TypeScript: all props have explicit interfaces, no 'any'
  □ Three states handled: loading skeleton / error state / empty state
  □ Mobile layout: tested at 375px width
  □ Accessibility: labels, aria attributes, keyboard operable
  □ Service decoupling: data fetched via service function, not inline fetch
  □ Tailwind tokens: using defined color tokens (not arbitrary hex values)
  □ No AI-slop aesthetics: no gradient bg, no glass, no pill buttons, no neon
  □ Self-contained: minimal external state dependencies, local state preferred
  □ Toastify: success/error feedback on all user mutations
  □ Framer Motion: purposeful animation only (enter transitions, modals)
```

---

## 18. TARGET UI TONE

```
Aesthetic reference: Notion + Linear + Vercel Dashboard hybrid
  — Data-dense but not claustrophobic
  — Every element has a clear purpose
  — Color carries meaning (not decoration)
  — Whitespace is intentional and generous
  — Buttons are flat, sharp, and functional
  — Tables: alternating rows (white / surface-2)
  — Charts: brand colors (#427AB5 primary, #AAFFC7 highlight/success)
  — Typography does the heavy lifting: size + weight + color hierarchy
  — The interface feels like a tool, not a landing page
  — Professional enough for enterprise, clean enough for daily use

NOT the aesthetic:
  — SaaS startup marketing page
  — Dark-mode AI product (we're light-mode, data-focused)
  — Consumer app (playful, rounded, colorful)
  — Government software (gray, dense, outdated)
```

---

## 19. MOCK SERVICE LAYER PATTERN

```typescript
// All service functions follow this exact pattern.
// When backend is ready: replace the mock body — component code is UNTOUCHED.

// Utility:
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// services/marketplace.service.ts
export async function getListings(filters?: ListingFilters): Promise<Listing[]> {
  // TODO (backend): return apiClient.get('/listings', { params: filters });
  await delay(400); // realistic network simulation
  let results = [...MOCK_LISTINGS];
  if (filters?.type)    results = results.filter(l => filters.type!.includes(l.type));
  if (filters?.company) results = results.filter(l => l.company.id === filters.company);
  if (filters?.minMatch) results = results.filter(l => (l.aiMatchScore ?? 0) >= filters.minMatch!);
  return results;
}

export async function applyToListing(payload: ApplicationPayload): Promise<Application> {
  // TODO (backend): return apiClient.post('/applications', payload);
  await delay(600);
  return {
    id: `app_${Date.now()}`,
    listingId: payload.listingId,
    listing: MOCK_LISTINGS.find(l => l.id === payload.listingId)!,
    applicantId: payload.applicantId,
    status: 'pending',
    appliedAt: new Date().toISOString(),
    note: payload.note,
  };
}

// services/ai.service.ts
export async function analyzeCareerPath(employeeId: string): Promise<AICareerRecommendation[]> {
  // TODO (backend): return apiClient.get(`/ai/career/${employeeId}`);
  await delay(2000); // longer delay to simulate AI processing
  return MOCK_AI_RECOMMENDATIONS;
}

export async function runSkillGapAnalysis(
  companyId: string,
  departmentId?: string
): Promise<SkillGapAnalysis> {
  // TODO (backend): return apiClient.post('/ai/skill-gap', { companyId, departmentId });
  await delay(2000);
  return MOCK_SKILL_GAP_RESULT;
}

export async function findReplacements(employeeId: string): Promise<Employee[]> {
  // TODO (backend): return apiClient.post('/ai/replacement', { employeeId });
  await delay(2000);
  return MOCK_EMPLOYEES
    .filter(e => e.id !== employeeId && e.workloadPercent < 80)
    .slice(0, 3);
}
```

---

**Final note:** There is no backend at this stage. Every service function must return
`Promise<T>` and use mock data internally. When the backend is integrated,
only the files inside `services/` will change — all components and hooks
remain completely untouched. This separation is non-negotiable.