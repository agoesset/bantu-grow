import type { ContactInput } from './contact-validation'
import { readLeads, writeLeads } from './db'

export interface Lead extends ContactInput {
  receivedAt: string // ISO timestamp
}

export interface LeadSink {
  record(lead: Lead): Promise<void>
}

/**
 * Default lead sink: logs the lead to the console and writes it to leads.json.
 */
export const defaultLeadSink: LeadSink = {
  async record(lead: Lead): Promise<void> {
    console.log('[BantuGrow Lead]', JSON.stringify(lead, null, 2))
    try {
      const currentLeads = await readLeads()
      currentLeads.push(lead)
      await writeLeads(currentLeads)
    } catch (err) {
      console.error('[BantuGrow LeadSink] Failed to save lead to database file:', err)
    }
  },
}
