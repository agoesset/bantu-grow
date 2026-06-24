import { readProducts } from '@/lib/db'
import { ProductManager } from './ProductManager'
import React from 'react'

// Menjadikan halaman ini dinamis
export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products = readProducts()
  return <ProductManager initialProducts={products} />
}
