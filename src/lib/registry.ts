import { ComponentType } from 'react'
import { ExperimentMeta } from '@/types'

// ─── Meta modules ────────────────────────────────────────────────────────────
// Add one line here each time you finish a new experiment.

const metaModules: Record<string, () => Promise<{ meta: ExperimentMeta }>> = {
  'magnetic-button': () => import('@/experiments/magnetic-button/meta'),
  'cursor-lag-trail': () => import('@/experiments/cursor-lag-trail/meta'),
}

// ─── Component modules ───────────────────────────────────────────────────────

const componentModules: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  'magnetic-button': () => import('@/experiments/magnetic-button/Component'),
  'cursor-lag-trail': () => import('@/experiments/cursor-lag-trail/Component'),
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getAllExperiments(): Promise<ExperimentMeta[]> {
  const metas = await Promise.all(
    Object.entries(metaModules).map(async ([slug, load]) => {
      const mod = await load()
      return { ...mod.meta, slug }
    })
  )
  return metas.sort((a, b) => a.phase - b.phase)
}

export function getComponentLoader(
  slug: string
): (() => Promise<{ default: ComponentType }>) | null {
  return componentModules[slug] ?? null
}

export function getAllSlugs(): string[] {
  return Object.keys(metaModules)
}
