import { useParams, useNavigate } from 'react-router-dom'
import { Github, Linkedin, Briefcase, GraduationCap, ArrowLeft, Building2 } from 'lucide-react'
import { Badge, Button, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { toast } from 'react-toastify'
import { ROUTES } from '@/router/routes'

const MOCK_PROFILES: Record<string, any> = {
  req_001: {
    id: 'req_001',
    name: 'Aysel Karimova',
    position: 'Backend Developer',
    type: 'internal',
    avatar: 'AK',
    email: 'aysel.k@azal.az',
    phone: '+994 50 123 45 67',
    linkedin: 'linkedin.com/in/aysel-karimova',
    github: 'github.com/aysel-k',
    about: 'Experienced Backend Developer specializing in scalable Node.js architectures and database optimization. Looking for internal mobility to expand skills into Data Engineering.',
    skills: ['Node.js', 'PostgreSQL', 'TypeScript', 'Docker', 'Redis', 'Microservices'],
    languages: ['Azerbaijani (Native)', 'English (C1)', 'Russian (B2)'],
    education: [
      {
        degree: 'BSc in Computer Science',
        institution: 'Baku State University',
        year: '2016 - 2020'
      }
    ],
    experience: [
      {
        id: 1,
        role: 'Backend Developer',
        company: 'AZAL',
        period: '2022 - Present',
        description: 'Developing and maintaining core booking engine APIs.',
        isHolding: true // Highlight this
      },
      {
        id: 2,
        role: 'Junior Software Engineer',
        company: 'Pasha Bank',
        period: '2020 - 2022',
        description: 'Worked on internal payment processing services.',
        isHolding: false
      }
    ]
  },
  req_002: {
    id: 'req_002',
    name: 'Teymur Qasımlı',
    position: 'Senior Systems Engineer',
    type: 'referral',
    avatar: 'TQ',
    email: 'teymur.q@gmail.com',
    phone: '+994 55 987 65 43',
    linkedin: 'linkedin.com/in/teymur-q',
    github: 'github.com/teymur-sys',
    about: 'Senior systems engineer with 8+ years of experience in cloud infrastructure and networking. Referred by Azİntelecom due to lack of open senior headcounts.',
    skills: ['Linux', 'AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Network Security'],
    languages: ['Azerbaijani (Native)', 'English (B2)'],
    education: [
      {
        degree: 'MSc in Information Technology',
        institution: 'Azerbaijan Technical University',
        year: '2013 - 2015'
      },
      {
        degree: 'BSc in Computer Engineering',
        institution: 'Azerbaijan Technical University',
        year: '2009 - 2013'
      }
    ],
    experience: [
      {
        id: 1,
        role: 'Senior Systems Engineer',
        company: 'Azİntelecom',
        period: '2021 - 2024',
        description: 'Architected highly available cloud solutions for enterprise clients.',
        isHolding: true // Highlight this
      },
      {
        id: 2,
        role: 'System Administrator',
        company: 'Azercell',
        period: '2016 - 2021',
        description: 'Managed internal network infrastructure and data centers.',
        isHolding: false
      }
    ]
  }
}

export default function TransferProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const profile = id ? MOCK_PROFILES[id] : null

  if (!profile) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-fg">Profile not found</h2>
        <Button className="mt-4" onClick={() => navigate(ROUTES.HR_TRANSFERS)}>Back to Transfers</Button>
      </div>
    )
  }

  const handleDecision = (decision: string) => {
    toast.success(`Candidate ${decision} successfully.`)
    navigate(ROUTES.HR_TRANSFERS)
  }

  return (
    <div>
      <div className="mb-4">
        <button 
          onClick={() => navigate(ROUTES.HR_TRANSFERS)}
          className="flex items-center text-sm text-fg-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Transfer Requests
        </button>
      </div>
      
      <PageHeader 
        title="Candidate Profile" 
        description="Detailed background, CV, and internal holding experience."
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" className="border-danger/20 text-danger hover:text-danger-dark" onClick={() => handleDecision('declined')}>
              Decline
            </Button>
            <Button className="bg-success hover:bg-success-dark text-white" onClick={() => handleDecision('approved')}>
              Approve Candidate
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Summary */}
        <div className="space-y-6">
          <Card className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-fg-inverse">
              {profile.avatar}
            </div>
            <h2 className="text-xl font-semibold text-fg">{profile.name}</h2>
            <p className="text-fg-secondary">{profile.position}</p>
            
            <div className="mt-3">
              {profile.type === 'referral' ? (
                <Badge variant="success">Talent Referral</Badge>
              ) : (
                <Badge variant="primary">Internal Transfer</Badge>
              )}
            </div>

            <div className="mt-6 w-full space-y-3 text-left text-sm text-fg-secondary">
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" /> 
                <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">{profile.linkedin}</a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" /> 
                <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">{profile.github}</a>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="mb-3 font-semibold text-fg">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s: string) => (
                <Badge key={s} variant="muted">{s}</Badge>
              ))}
            </div>
            
            <h3 className="mt-6 mb-3 font-semibold text-fg">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((l: string) => (
                <Badge key={l} variant="secondary">{l}</Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Details */}
        <div className="space-y-6 md:col-span-2">
          <Card>
            <h3 className="mb-2 text-lg font-semibold text-fg">About</h3>
            <p className="text-sm text-fg-secondary leading-relaxed">{profile.about}</p>
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-semibold text-fg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> Work Experience
            </h3>
            <div className="space-y-4">
              {profile.experience.map((exp: any) => (
                <div 
                  key={exp.id} 
                  className={`relative pl-4 border-l-2 py-2 ${exp.isHolding ? 'border-primary bg-primary/5 rounded-r-md px-4' : 'border-border'}`}
                >
                  {exp.isHolding && (
                    <div className="absolute top-2 right-4 flex items-center text-xs font-semibold text-primary">
                      <Building2 className="mr-1 h-3 w-3" /> Azərbaycan Holding
                    </div>
                  )}
                  <h4 className="font-semibold text-fg">{exp.role}</h4>
                  <p className="text-sm font-medium text-fg-secondary">{exp.company}</p>
                  <p className="text-xs text-fg-muted mt-1">{exp.period}</p>
                  <p className="text-sm text-fg mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-semibold text-fg flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-accent-dark" /> Education
            </h3>
            <div className="space-y-4">
              {profile.education.map((edu: any, i: number) => (
                <div key={i} className="pl-4 border-l-2 border-border py-1">
                  <h4 className="font-semibold text-fg">{edu.degree}</h4>
                  <p className="text-sm text-fg-secondary">{edu.institution}</p>
                  <p className="text-xs text-fg-muted mt-1">{edu.year}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
