<div align="center">

<img src="https://img.shields.io/badge/version-1.0.0-6C63FF?style=for-the-badge" />
<img src="https://img.shields.io/badge/license-MIT-00D9A3?style=for-the-badge" />
<img src="https://img.shields.io/badge/status-hackathon--ready-FF6B6B?style=for-the-badge" />

<br/>
<br/>

```
██████╗ ██╗ ██████╗     ███████╗██╗  ██╗ █████╗ ██████╗ ██╗███╗   ██╗ ██████╗ 
██╔══██╗██║██╔════╝     ██╔════╝██║  ██║██╔══██╗██╔══██╗██║████╗  ██║██╔════╝ 
██║  ██║██║██║  ███╗    ███████╗███████║███████║██████╔╝██║██╔██╗ ██║██║  ███╗
██║  ██║██║██║   ██║    ╚════██║██╔══██║██╔══██║██╔══██╗██║██║╚██╗██║██║   ██║
██████╔╝██║╚██████╔╝    ███████║██║  ██║██║  ██║██║  ██║██║██║ ╚████║╚██████╔╝
╚═════╝ ╚═╝ ╚═════╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
```

### **Smart Workforce Exchange Platform**
*Stop losing talent. Start moving it.*

<br/>

[🚀 Live Demo](https://digsharing.vercel.app/) · [📖 Docs](#) · [🐛 Report a Bug](#) · [💡 Request a Feature](#)

<br/>
</div>

---

## 🧠 What is DigSharing?

> **DigSharing** is an AI-powered internal workforce exchange platform built for large organizations that are sitting on untapped talent — and don't even know it.

Most companies hire externally when their next best employee is already on payroll. DigSharing fixes that. By combining intelligent skill mapping, real-time analytics, and an internal talent marketplace, HR teams can instantly match the right person to the right role — without the cost, delay, or friction of traditional hiring.

Built for the modern enterprise. Designed for speed. Powered by AI.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI-Powered Advisor
Intelligent recommendations for employee upskilling paths and smart replacement strategies. Feed it a role requirement — get back ranked internal candidates with reasoning.

</td>
<td width="50%">

### 📊 HR Intelligence Dashboard
Real-time visibility into workforce distribution, talent pools, and skill gap heatmaps across every department.

</td>
</tr>
<tr>
<td width="50%">

### 🏪 Internal Talent Marketplace
Employees discover and apply for internal opportunities. Managers post roles, swap team members, and fast-track lateral moves — all within one platform.

</td>
<td width="50%">

### 🔄 Automated Swap Management
Workflow engine for instant role replacements and project-based talent swapping. No spreadsheets. No back-and-forth emails. Just done.

</td>
</tr>
<tr>
<td width="50%">

### 💰 ROI & Cost Tracking
Track the real cost of talent decisions. Measure savings from internal moves vs. external hires, and build the business case for smarter HR.

</td>
<td width="50%">

### 🗺️ Skill Gap Analysis
Identify missing capabilities across teams before they become bottlenecks. Proactively plan hiring or upskilling with data-driven clarity.

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                        │
│   React (TypeScript) · Vite · TailwindCSS               │
│   TanStack Query · Framer Motion · Recharts             │
└────────────────────┬────────────────────────────────────┘
                     │ REST API
┌────────────────────▼────────────────────────────────────┐
│                      API LAYER                           │
│              FastAPI (Python 3.11+)                      │
│         JWT Auth · Pydantic · CORS Middleware            │
└──────────┬────────────────────────────┬─────────────────┘
           │                            │
┌──────────▼──────────┐   ┌────────────▼─────────────────┐
│    DATABASE LAYER    │   │         AI SERVICE            │
│  PostgreSQL (prod)  │   │   AI-Powered Replacement &   │
│  SQLite (dev)       │   │   Skill Recommendation Engine │
└─────────────────────┘   └──────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS |
| **UI & Motion** | Framer Motion, Recharts, Shadcn/ui |
| **State Management** | Zustand, TanStack React Query |
| **Backend** | FastAPI, Python 3.11+, Pydantic v2 |
| **Database** | PostgreSQL (prod) / SQLite (dev) |
| **Auth** | JWT (OAuth2 Password Flow) |
| **Deployment** | Vercel (Frontend) · Railway (Backend) |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

```
Node.js  v18+
Python   v3.11+
Git
```

### 1. Clone the Repository

```bash
git clone https://github.com/projectnovruzzade/digsharing.git
cd digsharing
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

> App runs at `http://localhost:5173`

### 3. Backend Setup

```bash
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env

# Start the API server
uvicorn app.main:app --reload
```

> API runs at `http://localhost:8000` · Swagger UI at `http://localhost:8000/docs`

---

## 🔑 Environment Variables

### Frontend (`.env.local`)

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=DigSharing
```

### Backend (`.env`)

```env
# Required
DATABASE_URL=postgresql://user:password@localhost:5432/digsharing
SECRET_KEY=your-super-secret-jwt-key-change-this
AI_SERVICE_API_KEY=your-ai-service-api-key

# Optional
DEBUG=true
ALLOWED_ORIGINS=http://localhost:5173
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## 📡 API Reference

Base URL: `digsharing-production.up.railway.app`

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | Authenticate user and receive JWT token |
| `POST` | `/auth/register` | Register a new organization user |

### 👥 Employees

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/employees` | List all employees with filters (`company_id`, `skill_id`, `min_performance`) |
| `GET` | `/employees/{id}` | Get a specific employee's full profile |
| `PATCH` | `/employees/{id}` | Update employee profile fields |
| `GET` | `/employees/{id}/allocations` | View all project allocations for an employee |

### 🏪 Marketplace

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/marketplace/listings` | Browse all open internal role listings |
| `POST` | `/marketplace/apply` | Submit an application for a role |

### 📊 HR & AI Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/hr/workforce` | Workforce distribution analytics |
| `GET` | `/hr/skill-gaps` | Skill gap report across departments |
| `POST` | `/ai/find-replacements` | AI-powered internal talent replacement suggestions |

<details>
<summary><b>📋 Example: Find Replacements Request</b></summary>

```json
POST /api/v1/ai/find-replacements
{
  "role_id": "senior-backend-engineer",
  "department": "Engineering",
  "required_skills": ["Python", "FastAPI", "PostgreSQL"],
  "min_performance_score": 80
}
```

**Response:**
```json
{
  "candidates": [
    {
      "employee_id": "emp_0042",
      "name": "Alex Chen",
      "match_score": 0.94,
      "missing_skills": ["FastAPI"],
      "upskilling_time_estimate": "2 weeks",
      "current_allocation": "Project Aurora (60%)"
    }
  ]
}
```

</details>

---

## 📁 Project Structure

```
digsharing/
├── 📂 src/                          # Frontend source
│   ├── 📂 components/               # Reusable UI components
│   ├── 📂 pages/                    # Route-level page components
│   ├── 📂 store/                    # Zustand state stores
│   ├── 📂 hooks/                    # Custom React hooks
│   ├── 📂 api/                      # TanStack Query + API clients
│   └── 📂 types/                    # TypeScript type definitions
│
├── 📂 backend/
│   ├── 📂 app/
│   │   ├── 📂 routers/              # FastAPI route handlers
│   │   ├── 📂 models/               # SQLAlchemy ORM models
│   │   ├── 📂 schemas/              # Pydantic request/response schemas
│   │   ├── 📂 services/             # Business logic layer
│   │   ├── 📂 ai/                   # AI recommendation engine
│   │   └── main.py                  # Application entry point
│   └── requirements.txt
│
├── .env.example
├── package.json
└── README.md
```

---

## 🗺️ Roadmap

- [x] AI-powered replacement engine
- [x] Internal talent marketplace
- [x] HR analytics dashboard
- [x] JWT authentication system
- [x] Skill gap analysis
- [ ] Slack / Teams integration for swap notifications
- [ ] Mobile app (React Native)
- [ ] Multi-tenant SaaS architecture
- [ ] LLM-powered career path coaching
- [ ] Integration with HRIS systems (Workday, BambooHR)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**DigSharing** · *The talent you need is already in the building.*

<br/>

⭐ Star this repo if you find it useful · 🐛 [Open an Issue](#) · 🚀 [Live Demo](https://digsharing.vercel.app/)

</div>
