import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { getAllSlugs } from '@/lib/registry'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'slug required' }, { status: 400 })
  }

  // Validate slug against the registry to prevent path traversal
  const validSlugs = getAllSlugs()
  if (!validSlugs.includes(slug)) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  try {
    const filePath = join(
      process.cwd(),
      'src',
      'experiments',
      slug,
      'Component.tsx'
    )
    const source = readFileSync(filePath, 'utf-8')
    return NextResponse.json({ source })
  } catch {
    return NextResponse.json({ error: 'source not found' }, { status: 404 })
  }
}
