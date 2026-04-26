import { useState } from 'react'
import { toast } from 'react-toastify'
import { Card, Button, Badge } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { MOCK_COMPANIES } from '@/services/mock/companies.mock'

export default function TalentReferralPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('')
  const [isReferring, setIsReferring] = useState(false)

  // Mock surplus candidate data based on prompt context
  // "Azİntelecom şirkətində 1 boş yer var... 2 müraciətçi ideal səviyyədə seçilib"
  const surplusCandidate = {
    id: 'emp_surplus_1',
    firstName: 'Teymur',
    lastName: 'Qasımlı',
    position: 'Senior Systems Engineer',
    matchScore: 98,
    skills: ['Linux', 'Networking', 'Cloud Architecture'],
    currentStatus: 'Unassigned / Surplus from Azİntelecom',
  }

  const handleReferral = () => {
    if (!selectedCompanyId) {
      toast.error('Please select a target company to refer the candidate.')
      return
    }

    const company = MOCK_COMPANIES.find((c) => c.id === selectedCompanyId)
    
    setIsReferring(true)
    setTimeout(() => {
      setIsReferring(false)
      toast.success(`Candidate successfully referred to ${company?.name} HR Manager.`)
      setSelectedCompanyId('')
    }, 1200)
  }

  return (
    <div>
      <PageHeader 
        title="Talent Referral" 
        description="Share ideal candidates who couldn't be hired due to headcount limits with other companies in the holding." 
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-fg">Surplus Candidate</h3>
              <p className="text-sm text-fg-secondary">Highly matched, but no open headcount.</p>
            </div>
            <Badge variant="warning">Action Required</Badge>
          </div>
          
          <div className="mb-4 rounded-md border border-border bg-surface-2 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-fg">{surplusCandidate.firstName} {surplusCandidate.lastName}</p>
                <p className="text-sm text-fg-secondary">{surplusCandidate.position}</p>
              </div>
              <Badge variant="success" className="font-mono">{surplusCandidate.matchScore}% Match</Badge>
            </div>
            <p className="mt-2 text-xs text-fg-muted">{surplusCandidate.currentStatus}</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              {surplusCandidate.skills.map((s) => (
                <Badge key={s} variant="primary" className="text-xs">{s}</Badge>
              ))}
            </div>
          </div>
        </Card>

        <Card className="flex flex-col">
          <h3 className="mb-2 text-lg font-semibold text-fg">Refer to Another Company</h3>
          <p className="mb-4 text-sm text-fg-secondary">
            Select a sister company within Azərbaycan Holding to recommend this candidate. Their HR manager will be notified.
          </p>

          <label className="block mb-1 text-sm font-medium text-fg">Target Company</label>
          <select
            className="mb-4 w-full rounded-md border border-border bg-surface p-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
          >
            <option value="">-- Select Company --</option>
            {MOCK_COMPANIES.filter(c => c.name !== 'Azİntelecom').map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="mt-auto">
            <Button
              className="w-full"
              disabled={!selectedCompanyId || isReferring}
              isLoading={isReferring}
              onClick={handleReferral}
            >
              Share Talent Profile
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
