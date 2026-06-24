import { describe, it, expect, vi } from 'vitest'
import { submitLead } from '@/app/actions/submit-lead'
import type { LeadSink, Lead } from '@/lib/lead-sink'
import type { ContactInput } from '@/lib/contact-validation'

const validInput: ContactInput = {
  name: 'Budi Santoso',
  email: 'budi@example.com',
  message: 'Saya ingin mencoba produk POS Anda.',
  productSlug: 'pos',
}

const invalidInput: ContactInput = {
  name: '',
  email: 'not-an-email',
  message: '',
}

describe('submitLead', () => {
  it('returns success when input is valid and sink records without error', async () => {
    const mockSink: LeadSink = {
      record: vi.fn().mockResolvedValue(undefined),
    }

    const result = await submitLead(validInput, mockSink)

    expect(result.status).toBe('success')
    expect(mockSink.record).toHaveBeenCalledOnce()

    // Verify the lead passed to sink has receivedAt
    const calledWith = (mockSink.record as ReturnType<typeof vi.fn>).mock.calls[0][0] as Lead
    expect(calledWith.name).toBe(validInput.name)
    expect(calledWith.email).toBe(validInput.email)
    expect(calledWith.message).toBe(validInput.message)
    expect(calledWith.receivedAt).toBeTruthy()
    expect(typeof calledWith.receivedAt).toBe('string')
  })

  it('returns validation_error with echoed values when input is invalid', async () => {
    const mockSink: LeadSink = {
      record: vi.fn(),
    }

    const result = await submitLead(invalidInput, mockSink)

    expect(result.status).toBe('validation_error')
    if (result.status === 'validation_error') {
      expect(result.result.ok).toBe(false)
      expect(result.result.errors.length).toBeGreaterThan(0)
      expect(result.result.values).toEqual(invalidInput)
    }

    expect(mockSink.record).not.toHaveBeenCalled()
  })

  it('returns server_error when sink throws', async () => {
    const failingSink: LeadSink = {
      record: vi.fn().mockRejectedValue(new Error('Email service down')),
    }

    const result = await submitLead(validInput, failingSink)

    expect(result.status).toBe('server_error')
    if (result.status === 'server_error') {
      expect(result.values).toEqual(validInput)
      expect(result.message).toBeTruthy()
    }
  })

  it('does not call sink when validation fails', async () => {
    const mockSink: LeadSink = { record: vi.fn() }
    await submitLead({ name: '', email: '', message: '' }, mockSink)
    expect(mockSink.record).not.toHaveBeenCalled()
  })

  it('records all required fields in the lead', async () => {
    const records: Lead[] = []
    const captureSink: LeadSink = {
      record: async (lead) => { records.push(lead) },
    }

    await submitLead(validInput, captureSink)

    expect(records).toHaveLength(1)
    expect(records[0].name).toBe('Budi Santoso')
    expect(records[0].email).toBe('budi@example.com')
    expect(records[0].productSlug).toBe('pos')
  })
})
