import sqlite3 from 'sqlite3'
import { open, type Database } from 'sqlite'
import path from 'path'
import fs from 'fs'
import { type Product } from '@/content/products'
import { type BlogPost } from '@/content/blogs'
import { type Lead } from '@/lib/lead-sink'

const DATA_DIR = path.join(process.cwd(), 'content/data')
const PRODUCTS_JSON = path.join(DATA_DIR, 'products.json')
const BLOGS_JSON = path.join(DATA_DIR, 'blogs.json')
const LEADS_JSON = path.join(DATA_DIR, 'leads.json')

let dbInstance: Database | null = null

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance

  const dbPath = process.env.DATABASE_PATH || path.join(DATA_DIR, 'bantugrow.db')

  // Pastikan direktori database ada
  const dbDir = path.dirname(dbPath)
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
  }

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  // 1. Inisialisasi Tabel
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS products (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      niche TEXT NOT NULL,
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      features TEXT NOT NULL,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS blogs (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      content_markdown TEXT,
      cover_image TEXT
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      received_at TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      product_slug TEXT
    );
  `)

  // 2. Migration: ensure leads table has id column as PRIMARY KEY
  const leadsSchema = await dbInstance.get<{ sql: string }>(
    `SELECT sql FROM sqlite_master WHERE type='table' AND name='leads'`
  )
  if (leadsSchema && !leadsSchema.sql.includes('id TEXT PRIMARY KEY')) {
    await dbInstance.exec(`
      CREATE TABLE leads_new (
        id TEXT PRIMARY KEY,
        received_at TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        product_slug TEXT
      );
      INSERT INTO leads_new (id, received_at, name, email, message, product_slug)
        SELECT COALESCE(id, received_at), received_at, name, email, message, product_slug FROM leads;
      DROP TABLE leads;
      ALTER TABLE leads_new RENAME TO leads;
    `)
  }

  // 3. Migration: add content_markdown and cover_image columns to blogs if missing
  const blogsSchema = await dbInstance.get<{ sql: string }>(
    `SELECT sql FROM sqlite_master WHERE type='table' AND name='blogs'`
  )
  if (blogsSchema && !blogsSchema.sql.includes('content_markdown')) {
    await dbInstance.exec(`ALTER TABLE blogs ADD COLUMN content_markdown TEXT`)
  }
  if (blogsSchema && !blogsSchema.sql.includes('cover_image')) {
    await dbInstance.exec(`ALTER TABLE blogs ADD COLUMN cover_image TEXT`)
  }

  // 4. Migration: add image column to products if missing
  const productsSchema = await dbInstance.get<{ sql: string }>(
    `SELECT sql FROM sqlite_master WHERE type='table' AND name='products'`
  )
  if (productsSchema && !productsSchema.sql.includes('image')) {
    await dbInstance.exec(`ALTER TABLE products ADD COLUMN image TEXT`)
  }

  // 5. Auto-seeding jika database kosong
  const productCountResult = await dbInstance.get<{ count: number }>('SELECT COUNT(*) as count FROM products')
  if (productCountResult && productCountResult.count === 0) {
    if (fs.existsSync(PRODUCTS_JSON)) {
      try {
        const raw = fs.readFileSync(PRODUCTS_JSON, 'utf8')
        const items = JSON.parse(raw) as Product[]
        for (const item of items) {
          await dbInstance.run(
            `INSERT OR IGNORE INTO products (slug, name, niche, short_description, full_description, features, image) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [item.slug, item.name, item.niche, item.shortDescription, item.fullDescription, JSON.stringify(item.features), item.image || null]
          )
        }
      } catch (err) {
        console.error('Failed to seed products from JSON:', err)
      }
    }
  }

  const blogCountResult = await dbInstance.get<{ count: number }>('SELECT COUNT(*) as count FROM blogs')
  if (blogCountResult && blogCountResult.count === 0) {
    if (fs.existsSync(BLOGS_JSON)) {
      try {
        const raw = fs.readFileSync(BLOGS_JSON, 'utf8')
        const items = JSON.parse(raw) as BlogPost[]
        for (const item of items) {
          await dbInstance.run(
            `INSERT OR IGNORE INTO blogs (slug, title, category, date, excerpt, author, content, content_markdown, cover_image) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [item.slug, item.title, item.category, item.date, item.excerpt, item.author, JSON.stringify(item.content), item.contentMarkdown || null, item.coverImage || null]
          )
        }
      } catch (err) {
        console.error('Failed to seed blogs from JSON:', err)
      }
    }
  }

  const leadCountResult = await dbInstance.get<{ count: number }>('SELECT COUNT(*) as count FROM leads')
  if (leadCountResult && leadCountResult.count === 0) {
    if (fs.existsSync(LEADS_JSON)) {
      try {
        const raw = fs.readFileSync(LEADS_JSON, 'utf8')
        const items = JSON.parse(raw) as Lead[]
        for (const item of items) {
          await dbInstance.run(
            `INSERT OR IGNORE INTO leads (id, received_at, name, email, message, product_slug) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [item.id, item.receivedAt, item.name, item.email, item.message, item.productSlug || null]
          )
        }
      } catch (err) {
        console.error('Failed to seed leads from JSON:', err)
      }
    }
  }

  return dbInstance
}

// ─── Products CRUD ─────────────────────────────────────────────────────────────

export async function readProducts(): Promise<Product[]> {
  const db = await getDb()
  try {
    const rows = await db.all<{
      slug: string
      name: string
      niche: string
      short_description: string
      full_description: string
      features: string
      image: string | null
    }[]>('SELECT * FROM products')

    return rows.map((row) => ({
      slug: row.slug,
      name: row.name,
      niche: row.niche,
      shortDescription: row.short_description,
      fullDescription: row.full_description,
      features: JSON.parse(row.features),
      image: row.image || undefined,
    }))
  } catch (err) {
    console.error('Error reading products from SQLite:', err)
    return []
  }
}

export async function insertProduct(product: Product): Promise<void> {
  const db = await getDb()
  await db.run(
    `INSERT INTO products (slug, name, niche, short_description, full_description, features, image) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [product.slug, product.name, product.niche, product.shortDescription, product.fullDescription, JSON.stringify(product.features), product.image || null]
  )
}

export async function updateProduct(product: Product): Promise<void> {
  const db = await getDb()
  const result = await db.run(
    `UPDATE products SET name = ?, niche = ?, short_description = ?, full_description = ?, features = ?, image = ? WHERE slug = ?`,
    [product.name, product.niche, product.shortDescription, product.fullDescription, JSON.stringify(product.features), product.image || null, product.slug]
  )
  if (result.changes === 0) {
    throw new Error('Product not found')
  }
}

export async function deleteProductBySlug(slug: string): Promise<void> {
  const db = await getDb()
  await db.run('DELETE FROM products WHERE slug = ?', [slug])
}

// ─── Blogs CRUD ────────────────────────────────────────────────────────────────

export async function readBlogs(): Promise<BlogPost[]> {
  const db = await getDb()
  try {
    const rows = await db.all<{
      slug: string
      title: string
      category: string
      date: string
      excerpt: string
      author: string
      content: string
      content_markdown: string | null
      cover_image: string | null
    }[]>('SELECT * FROM blogs')

    return rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      category: row.category,
      date: row.date,
      excerpt: row.excerpt,
      author: row.author,
      content: JSON.parse(row.content),
      contentMarkdown: row.content_markdown || undefined,
      coverImage: row.cover_image || undefined,
    }))
  } catch (err) {
    console.error('Error reading blogs from SQLite:', err)
    return []
  }
}

export async function insertBlog(blog: BlogPost): Promise<void> {
  const db = await getDb()
  await db.run(
    `INSERT INTO blogs (slug, title, category, date, excerpt, author, content, content_markdown, cover_image) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [blog.slug, blog.title, blog.category, blog.date, blog.excerpt, blog.author, JSON.stringify(blog.content), blog.contentMarkdown || null, blog.coverImage || null]
  )
}

export async function updateBlog(blog: BlogPost): Promise<void> {
  const db = await getDb()
  const result = await db.run(
    `UPDATE blogs SET title = ?, category = ?, date = ?, excerpt = ?, author = ?, content = ?, content_markdown = ?, cover_image = ? WHERE slug = ?`,
    [blog.title, blog.category, blog.date, blog.excerpt, blog.author, JSON.stringify(blog.content), blog.contentMarkdown || null, blog.coverImage || null, blog.slug]
  )
  if (result.changes === 0) {
    throw new Error('Blog not found')
  }
}

export async function deleteBlogBySlug(slug: string): Promise<void> {
  const db = await getDb()
  await db.run('DELETE FROM blogs WHERE slug = ?', [slug])
}

// ─── Leads CRUD ────────────────────────────────────────────────────────────────

export async function readLeads(): Promise<Lead[]> {
  const db = await getDb()
  try {
    const rows = await db.all<{
      id: string
      received_at: string
      name: string
      email: string
      message: string
      product_slug: string | null
    }[]>('SELECT * FROM leads')

    return rows.map((row) => ({
      id: row.id,
      receivedAt: row.received_at,
      name: row.name,
      email: row.email,
      message: row.message,
      productSlug: row.product_slug || undefined,
    }))
  } catch (err) {
    console.error('Error reading leads from SQLite:', err)
    return []
  }
}

export async function insertLead(lead: Lead): Promise<void> {
  const db = await getDb()
  await db.run(
    `INSERT INTO leads (id, received_at, name, email, message, product_slug) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [lead.id, lead.receivedAt, lead.name, lead.email, lead.message, lead.productSlug || null]
  )
}

export async function deleteLeadById(id: string): Promise<void> {
  const db = await getDb()
  await db.run('DELETE FROM leads WHERE id = ?', [id])
}
