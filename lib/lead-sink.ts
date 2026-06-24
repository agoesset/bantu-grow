import type { ContactInput } from './contact-validation'

export interface Lead extends ContactInput {
  receivedAt: string // ISO timestamp
}

export interface LeadSink {
  record(lead: Lead): Promise<void>
}

/**
 * Default lead sink: logs the lead to the console.
 * Replace with an email/CRM integration in production.
 */
export const defaultLeadSink: LeadSink = {
  async record(lead: Lead): Promise<void> {
    console.log('[BantuGrow Lead]', JSON.stringify(lead, null, 2))
  },
}
