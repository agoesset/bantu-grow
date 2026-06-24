'use client'

import { useActionState, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { submitLead, type SubmitLeadResult } from '@/app/actions/submit-lead'
import { copy } from '@/content/copy'
import type { Product } from '@/content/products'
import type { ContactInput } from '@/lib/contact-validation'

interface Props {
  products: Product[]
  preSelectedSlug?: string
}

const initialState: SubmitLeadResult | null = null

async function submitAction(
  _prev: SubmitLeadResult | null,
  formData: FormData
): Promise<SubmitLeadResult> {
  const input: ContactInput = {
    name: (formData.get('name') as string) ?? '',
    email: (formData.get('email') as string) ?? '',
    message: (formData.get('message') as string) ?? '',
    productSlug: (formData.get('productSlug') as string) || undefined,
  }
  return submitLead(input)
}

export function ContactForm({ products, preSelectedSlug }: Props) {
  const [state, formAction, isPending] = useActionState(submitAction, initialState)

  // Retained values (echoed back on validation failure or server error)
  const retained =
    state?.status === 'validation_error'
      ? state.result.values
      : state?.status === 'server_error'
        ? state.values
        : null

  const errors =
    state?.status === 'validation_error' ? state.result.errors : []

  const getError = (field: 'name' | 'email' | 'message') =>
    errors.find((e) => e.field === field)

  if (state?.status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl bg-green-50 border border-green-200 p-8 text-center"
      >
        <h2 className="text-lg font-semibold text-green-800 mb-2">Pesan Terkirim!</h2>
        <p className="text-green-700">{copy.contactSuccessMessage}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {state?.status === 'server_error' && (
        <div role="alert" className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">{copy.contactNameLabel}</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder={copy.contactNamePlaceholder}
          defaultValue={retained?.name ?? ''}
          aria-describedby={getError('name') ? 'name-error' : undefined}
          aria-invalid={!!getError('name')}
          autoComplete="name"
        />
        {getError('name') && (
          <p id="name-error" role="alert" className="text-sm text-destructive">
            {copy.validationNameRequired}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">{copy.contactEmailLabel2}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={copy.contactEmailPlaceholder}
          defaultValue={retained?.email ?? ''}
          aria-describedby={getError('email') ? 'email-error' : undefined}
          aria-invalid={!!getError('email')}
          autoComplete="email"
        />
        {getError('email') && (
          <p id="email-error" role="alert" className="text-sm text-destructive">
            {getError('email')!.code === 'invalid_email'
              ? copy.validationEmailInvalid
              : copy.validationEmailRequired}
          </p>
        )}
      </div>

      {/* Product subject (optional) */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="productSlug">{copy.contactProductLabel}</Label>
        <select
          id="productSlug"
          name="productSlug"
          defaultValue={retained?.productSlug ?? preSelectedSlug ?? ''}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label={copy.contactProductLabel}
        >
          <option value="">{copy.contactProductPlaceholder}</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">{copy.contactMessageLabel}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={copy.contactMessagePlaceholder}
          defaultValue={retained?.message ?? ''}
          rows={5}
          aria-describedby={getError('message') ? 'message-error' : undefined}
          aria-invalid={!!getError('message')}
        />
        {getError('message') && (
          <p id="message-error" role="alert" className="text-sm text-destructive">
            {copy.validationMessageRequired}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending} size="lg">
        {isPending ? 'Mengirim...' : copy.contactSubmitButton}
      </Button>
    </form>
  )
}
