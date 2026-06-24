import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { copy } from '@/content/copy'

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground mb-4">{copy.notFoundHeadline}</h1>
      <p className="text-muted-foreground mb-8">{copy.notFoundProductMessage}</p>
      <Link href="/produk" className={buttonVariants()}>
        {copy.notFoundCatalogLink}
      </Link>
    </div>
  )
}
