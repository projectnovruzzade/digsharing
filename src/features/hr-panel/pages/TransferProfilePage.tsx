import { useParams, useNavigate } from 'react-router-dom'
import { 
  Briefcase, 
  GraduationCap, 
  ArrowLeft, 
  Building2, 
  Star, 
  CheckCircle, 
  MessageSquare,
  Globe,
  Mail,
  Phone,
  Share2
} from 'lucide-react'
import { Badge, Button, Card, Progress } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { toast } from 'react-toastify'
import { ROUTES } from '@/router/routes'
import { cn } from '@/utils/cn'

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
    performanceScore: 84,
    about: 'Experienced Backend Developer specializing in scalable Node.js architectures and database optimization. Looking for internal mobility to expand skills into Data Engineering.',
    skills: [
      { name: 'Node.js', level: 'Senior' },
      { name: 'PostgreSQL', level: 'Senior' },
      { name: 'TypeScript', level: 'Mid' },
      { name: 'Docker', level: 'Mid' },
      { name: 'Redis', level: 'Mid' },
      { name: 'Microservices', level: 'Mid' }
    ],
    languages: ['Azerbaijani (Native)', 'English (C1)', 'Russian (B2)'],
    managerFeedback: [
      {
        manager: 'Farid Babayev',
        role: 'Engineering Lead @ AZAL',
        content: 'Aysel is a highly technical and reliable developer. Her contributions to the Payments API were critical. She has a strong potential for Data Engineering roles.',
        date: 'Oct 2024'
      }
    ],
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
        description: 'Developing and maintaining core booking engine APIs. Optimized database queries reducing latency by 30%.',
        isHolding: true
      },
      {
        id: 2,
        role: 'Junior Software Engineer',
        company: 'Aztelekom',
        period: '2020 - 2022',
        description: 'Worked on internal billing and customer service systems using Java Spring Boot.',
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
    performanceScore: 92,
    about: 'Senior systems engineer with 8+ years of experience in cloud infrastructure and networking. Referred by Azİntelecom due to lack of open senior headcounts.',
    skills: [
      { name: 'Linux', level: 'Expert' },
      { name: 'AWS', level: 'Expert' },
      { name: 'Kubernetes', level: 'Senior' },
      { name: 'Terraform', level: 'Senior' },
      { name: 'CI/CD', level: 'Senior' },
      { name: 'Network Security', level: 'Senior' }
    ],
    languages: ['Azerbaijani (Native)', 'English (B2)'],
    managerFeedback: [
      {
        manager: 'Leyla Hasanova',
        role: 'HR Director @ Azİntelecom',
        content: 'Teymur is one of the top system architects we have encountered. His work on the national cloud initiative was exemplary. We highly recommend him for the holding-wide infrastructure project.',
        date: 'Nov 2024'
      }
    ],
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
        description: 'Architected highly available cloud solutions for enterprise clients and national data center management.',
        isHolding: true
      },
      {
        id: 2,
        role: 'System Administrator',
        company: 'BakuBus',
        period: '2016 - 2021',
        description: 'Managed internal network infrastructure and data centers. Reduced downtime by 15% through automation.',
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
      <div className="flex flex-col items-center justify-center py-20">
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
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-2">
        <button 
          onClick={() => navigate(ROUTES.HR_TRANSFERS)}
          className="flex items-center text-sm font-medium text-fg-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Transfer Requests
        </button>
      </div>
      
      <PageHeader 
        title={profile.name} 
        description={`${profile.position} • ${profile.type === 'referral' ? 'Talent Referral' : 'Internal Transfer'}`}
        actions={
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              className="border-danger/20 text-danger hover:bg-danger-bg/50" 
              onClick={() => handleDecision('declined')}
            >
              Decline
            </Button>
            <Button 
              className="bg-primary hover:bg-primary-dark text-white shadow-sm" 
              onClick={() => handleDecision('approved')}
            >
              Approve Transfer
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-6">
          <Card className="flex flex-col items-center text-center p-6">
            <div className="relative mb-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 border-4 border-white shadow-sm text-3xl font-bold text-primary">
                {profile.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-success border-2 border-white text-white shadow-sm">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-fg leading-tight">{profile.name}</h2>
            <p className="text-sm font-medium text-fg-secondary mt-1">{profile.position}</p>
            
            <div className="mt-3 flex gap-2">
              {profile.type === 'referral' ? (
                <Badge className="bg-success/10 text-success-dark border-success/20">Talent Referral</Badge>
              ) : (
                <Badge variant="primary" className="bg-primary/10 text-primary-dark border-primary/20">Internal Transfer</Badge>
              )}
            </div>

            <div className="mt-8 w-full space-y-4 pt-6 border-t border-border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-fg-muted text-left">Contact & Links</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm text-fg-secondary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-2 border border-border">
                    <Mail className="h-4 w-4 text-fg-muted" />
                  </div>
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-fg-secondary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-2 border border-border">
                    <Phone className="h-4 w-4 text-fg-muted" />
                  </div>
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-fg-secondary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-2 border border-border">
                    <Globe className="h-4 w-4 text-[#0077B5]" />
                  </div>
                  <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors font-medium">LinkedIn Profile</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-fg-secondary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-2 border border-border">
                    <Share2 className="h-4 w-4 text-[#181717]" />
                  </div>
                  <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors font-medium">GitHub Repository</a>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-fg flex items-center gap-2">
                <Star className="h-4 w-4 text-warning" /> Performance
              </h3>
              <span className="text-lg font-bold text-primary font-mono">{profile.performanceScore}%</span>
            </div>
            <Progress value={profile.performanceScore} className="h-2 bg-primary/10" />
            <p className="mt-3 text-xs text-fg-secondary italic">
              * Score based on the last 4 quarterly reviews within the holding.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 font-bold text-fg">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s: { name: string; level: string }) => (
                <div key={s.name} className="flex items-center">
                   <Badge variant="muted" className="rounded-r-none border-r-0 font-medium">
                    {s.name}
                  </Badge>
                  <Badge className={cn(
                    "rounded-l-none border-l-0 text-[10px] uppercase font-bold px-1.5",
                    s.level === 'Senior' || s.level === 'Expert' ? 'bg-primary text-white' : 'bg-surface-2 text-fg-secondary'
                  )}>
                    {s.level}
                  </Badge>
                </div>
              ))}
            </div>
            
            <h3 className="mt-8 mb-4 font-bold text-fg">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((l: string) => (
                <Badge key={l} variant="default" className="bg-accent/10 text-accent-dark border-accent/20">{l}</Badge>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6">
            <h3 className="mb-3 text-lg font-bold text-fg flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> Professional Summary
            </h3>
            <p className="text-sm text-fg-secondary leading-relaxed font-medium">
              {profile.about}
            </p>
          </Card>

          <Card className="p-6 overflow-hidden">
            <h3 className="mb-6 text-lg font-bold text-fg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> Professional Journey
            </h3>
            <div className="space-y-0 relative">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-border"></div>
              
              {profile.experience.map((exp: any) => (
                <div key={exp.id} className="relative pl-10 pb-8 last:pb-2">
                  <div className={cn(
                    "absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-white shadow-sm z-10",
                    exp.isHolding ? "bg-primary" : "bg-fg-muted"
                  )}></div>
                  
                  <div className={cn(
                    "p-4 rounded-lg border transition-all duration-200",
                    exp.isHolding 
                      ? "bg-primary/5 border-primary/20 shadow-sm ring-1 ring-primary/5" 
                      : "bg-surface border-border hover:border-primary/20"
                  )}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="font-bold text-fg flex items-center gap-2">
                        {exp.role}
                        {exp.isHolding && (
                          <Badge className="bg-primary text-white text-[10px] h-5 px-1.5 uppercase font-bold tracking-tighter">
                            Azərbaycan Holding
                          </Badge>
                        )}
                      </h4>
                      <span className="text-xs font-bold text-fg-muted bg-surface-2 px-2 py-0.5 rounded-full border border-border">
                        {exp.period}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mb-3">
                      <Building2 className="h-4 w-4" />
                      {exp.company}
                    </div>
                    
                    <p className="text-sm text-fg-secondary leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6 text-lg font-bold text-fg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" /> Manager Feedback
            </h3>
            <div className="space-y-4">
              {profile.managerFeedback.map((fb: any, i: number) => (
                <div key={i} className="bg-surface-2 rounded-xl p-5 border border-border relative">
                  <div className="absolute -top-3 left-6 px-2 bg-surface-2 text-primary">
                    <MessageSquare size={16} fill="currentColor" />
                  </div>
                  <p className="text-sm text-fg font-medium italic mb-4 leading-relaxed">
                    "{fb.content}"
                  </p>
                  <div className="flex items-center justify-between border-t border-border/50 pt-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-fg">{fb.manager}</span>
                      <span className="text-xs text-fg-muted font-medium">{fb.role}</span>
                    </div>
                    <span className="text-xs font-bold text-fg-muted">{fb.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6 text-lg font-bold text-fg flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-accent-dark" /> Academic Background
            </h3>
            <div className="space-y-6 relative">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-border"></div>
              {profile.education.map((edu: any, i: number) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-white shadow-sm z-10 bg-accent-dark"></div>
                  <div className="bg-surface border border-border p-4 rounded-lg">
                    <h4 className="font-bold text-fg">{edu.degree}</h4>
                    <p className="text-sm font-semibold text-fg-secondary mt-1">{edu.institution}</p>
                    <p className="text-xs font-bold text-fg-muted mt-2 inline-block bg-surface-2 px-2 py-0.5 rounded-full border border-border">
                      {edu.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
