import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { DecorIcon } from '@/components/decor-icon'
import { CallToAction } from '@/components/cta'
import { cn } from '@/lib/utils'
import { pricingTiers } from '@/content/pricing'
import { pricingMeta } from '@/lib/seo'

export const metadata: Metadata = pricingMeta()

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-3 md:text-4xl">
          Pilih Paket yang Tepat
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          Harga transparan, tanpa biaya tersembunyi. Mulai gratis dan upgrade sesuai kebutuhan bisnis Anda.
        </p>
      </div>

      <div className="relative border-y border-border/80 py-12 mb-16">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.slug}
              className={cn(
                'flex flex-col rounded-lg border p-6 md:p-8 bg-card transition-shadow',
                tier.highlighted
                  ? 'border-primary shadow-lg ring-1 ring-primary/20'
                  : 'border-border/80 hover:shadow-md'
              )}
            >
              {tier.highlighted && (
                <span className="mb-4 inline-block w-max rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Paling Populer
                </span>
              )}
              <h2 className="text-xl font-bold text-foreground mb-2">{tier.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-foreground">{tier.price}</span>
                {tier.period && (
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                )}
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle
                      className="h-4 w-4 text-primary flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.ctaHref}
                className={cn(
                  buttonVariants({
                    variant: tier.highlighted ? 'default' : 'outline',
                    size: 'sm',
                  }),
                  'w-full mt-auto font-bold'
                )}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <CallToAction />
      </div>
    </div>
  )
}
