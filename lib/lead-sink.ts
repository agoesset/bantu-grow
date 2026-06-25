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
 * Also logs placeholder notifications (admin email + auto-reply).
 */
export const defaultLeadSink: LeadSink = {
  async record(lead: Lead): Promise<void> {
    console.log('[BantuGrow Lead]', JSON.stringify(lead, null, 2))
    await insertLead(lead)

    // TODO: Send email notification to admin when an email provider is configured
    // Example: await sendEmail({ to: 'admin@bantugrow.id', subject: `New lead: ${lead.name}`, body: ... })
    console.log(
      `[BantuGrow Notification] Would send admin notification email for lead from "${lead.name}" <${lead.email}>`
    )

    // TODO: Send auto-reply email to the lead when an email provider is configured
    // Example: await sendEmail({ to: lead.email, subject: 'Terima kasih telah menghubungi BantuGrow', body: ... })
    console.log(
      `[BantuGrow Auto-Reply] Would send auto-reply to "${lead.email}": "Terima kasih, ${lead.name}! Tim kami akan segera menghubungi Anda."`
    )
  },
}
