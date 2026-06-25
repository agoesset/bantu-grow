import { getLeadsList } from '@/app/actions/admin'
import { LeadManager } from './LeadManager'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function AdminLeadsPage() {
  const res = await getLeadsList()
  return <LeadManager initialLeads={res.leads || []} />
}
