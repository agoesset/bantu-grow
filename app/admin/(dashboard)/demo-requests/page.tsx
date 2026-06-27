import { readDemoRequests } from '@/lib/db'
import { DemoRequestManager } from './DemoRequestManager'
import React from 'react'

// Menjadikan halaman ini dinamis
export const dynamic = 'force-dynamic'

export default async function AdminDemoRequestsPage() {
  const demoRequests = await readDemoRequests()
  return <DemoRequestManager initialDemoRequests={demoRequests} />
}
