import { useState } from 'react'
import { Badge, Button, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MOCK_REQUESTS = [
  {
    id: 'req_001',
    employeeName: 'Aysel Karimova',
    position: 'Backend Developer',
    type: 'internal',
    from: 'AZAL (Backend Engineering)',
    to: 'Azərkosmos (Data Engineering)',
    reason: 'Requested internal transfer for career growth and skill development.',
    date: '2024-11-20',
    status: 'pending'
  },
  {
    id: 'req_002',
    employeeName: 'Teymur Qasımlı',
    position: 'Senior Systems Engineer',
    type: 'referral',
    from: 'Azİntelecom (HR Dept)',
    to: 'Your Company',
    reason: 'Surplus candidate perfectly matching your open headcount. Referred by Azİntelecom HR.',
    date: '2024-11-22',
    status: 'pending'
  }
]

export default function TransferRequestsPage() {
  const [requests, setRequests] = useState(MOCK_REQUESTS)
  const navigate = useNavigate()

  const handleAction = (id: string, action: 'approved' | 'rejected' | 'accepted' | 'declined') => {
    setRequests(prev => prev.filter(r => r.id !== id))
    toast.success(`Request ${action} successfully.`)
  }

  return (
    <div>
      <PageHeader title="Transfer requests" description="Review and manage employee transfer requests across the holding." />
      
      <div className="space-y-4">
        {requests.length === 0 ? (
          <Card>
            <p className="text-sm text-fg-secondary">No pending transfer requests.</p>
          </Card>
        ) : (
          requests.map(req => {
            const isReferral = req.type === 'referral'
            return (
              <Card 
                key={req.id} 
                className={`flex flex-col md:flex-row justify-between gap-4 ${isReferral ? 'border-success/30 bg-success-light/5 shadow-sm' : ''}`}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-fg">{req.employeeName}</h3>
                    <Badge variant="muted">{req.position}</Badge>
                    {isReferral ? (
                      <Badge variant="success">Talent Referral</Badge>
                    ) : (
                      <Badge variant="primary">Internal Transfer</Badge>
                    )}
                    <span className="text-xs text-fg-muted ml-auto">{req.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`flex-1 p-2 rounded-md border ${isReferral ? 'bg-success/5 border-success/20' : 'bg-surface-2 border-border'}`}>
                      <span className="text-xs text-fg-muted block mb-1 uppercase tracking-wider font-semibold">From</span>
                      <span className="text-fg font-medium">{req.from}</span>
                    </div>
                    <span className="text-fg-muted font-bold text-lg">→</span>
                    <div className={`flex-1 p-2 rounded-md border ${isReferral ? 'bg-success/5 border-success/20' : 'bg-surface-2 border-border'}`}>
                      <span className="text-xs text-fg-muted block mb-1 uppercase tracking-wider font-semibold">To</span>
                      <span className="text-fg font-medium">{req.to}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs text-fg-muted uppercase tracking-wider font-semibold">
                      {isReferral ? 'Referral Note' : 'Reason'}
                    </span>
                    <p className="text-sm text-fg-secondary mt-0.5">{req.reason}</p>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col justify-end gap-2 shrink-0">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="border border-border text-fg-secondary"
                    onClick={() => navigate(`/hr/transfers/${req.id}`)}
                  >
                    View Profile
                  </Button>
                  {isReferral ? (
                    <>
                      <Button 
                        size="sm" 
                        className="bg-success hover:bg-success-dark text-white"
                        onClick={() => handleAction(req.id, 'accepted')}
                      >
                        Accept Candidate
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="text-danger hover:text-danger-dark border-danger/20"
                        onClick={() => handleAction(req.id, 'declined')}
                      >
                        Decline
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        size="sm" 
                        onClick={() => handleAction(req.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="text-danger hover:text-danger-dark border-danger/20"
                        onClick={() => handleAction(req.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
