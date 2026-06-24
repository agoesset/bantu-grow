import fs from 'fs'
import path from 'path'
import { type Product } from '@/content/products'
import { type BlogPost } from '@/content/blogs'
import { type Lead } from '@/lib/lead-sink'

const DATA_DIR = path.join(process.cwd(), 'content/data')
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json')
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json')
const LEADS_FILE = path.join(DATA_DIR, 'leads.json')

function ensureDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function readProducts(): Product[] {
  ensureDirExists()
  if (!fs.existsSync(PRODUCTS_FILE)) {
    return []
  }
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Error reading products database file:', err)
    return []
  }
}

export function writeProducts(products: Product[]): void {
  ensureDirExists()
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8')
  } catch (err) {
    console.error('Error writing products database file:', err)
  }
}

export function readBlogs(): BlogPost[] {
  ensureDirExists()
  if (!fs.existsSync(BLOGS_FILE)) {
    return []
  }
  try {
    const raw = fs.readFileSync(BLOGS_FILE, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Error reading blogs database file:', err)
    return []
  }
}

export function writeBlogs(blogs: BlogPost[]): void {
  ensureDirExists()
  try {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf8')
  } catch (err) {
    console.error('Error writing blogs database file:', err)
  }
}

export function readLeads(): Lead[] {
  ensureDirExists()
  if (!fs.existsSync(LEADS_FILE)) {
    return []
  }
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Error reading leads database file:', err)
    return []
  }
}

export function writeLeads(leads: Lead[]): void {
  ensureDirExists()
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8')
  } catch (err) {
    console.error('Error writing leads database file:', err)
  }
}
