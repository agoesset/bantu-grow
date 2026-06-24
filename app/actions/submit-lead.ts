'use server'

import { validateContact, type ContactInput, type ValidationResult } from '@/lib/contact-validation'
import { defaultLeadSink, type Lead } from '@/lib/lead-sink'

export type SubmitLeadResult =
  | { status: 'success' }
  | { status: 'validation_error'; result: ValidationResult }
  | { status: 'server_error'; message: string; values: ContactInput }

export async function submitLead(
  input: ContactInput,
  sink = defaultLeadSink
): Promise<SubmitLeadResult> {
  // 1. Validate input
  const validation = validateContact(input)

  if (!validation.ok) {
    return { status: 'validation_error', result: validation }
  }

  // 2. Build Lead and record via sink
  const lead: Lead = {
    ...input,
    receivedAt: new Date().toISOString(),
  }

  try {
    await sink.record(lead)
    return { status: 'success' }
  } catch (error) {
    console.error('[BantuGrow] Lead sink error:', error)
    return {
      status: 'server_error',
      message: 'Terjadi kesalahan server. Silakan coba lagi.',
      values: input,
    }
  }
}
