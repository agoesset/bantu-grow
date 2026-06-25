import type { ContactInput } from './contact-validation'
import { insertLead } from './db'

export interface Lead extends ContactInput {
  id: string // UUID
  receivedAt: string // ISO timestamp
}

export interface LeadSink {
  record(lead: Lead): Promise<void>
}

/**
 * Default lead sink: logs the lead to the console and writes it to the database.
 */
export const defaultLeadSink: LeadSink = {
  async record(lead: Lead): Promise<void> {
    console.log('[BantuGrow Lead]', JSON.stringify(lead, null, 2))
    try {
      await insertLead(lead)
    } catch (err) {
      console.error('[BantuGrow LeadSink] Failed to save lead to database:', err)
    }
  },
}
