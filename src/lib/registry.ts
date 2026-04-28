import { ComponentType, lazy } from 'react'
import { ExperimentMeta } from '@/types'

interface ExperimentEntry {
  slug: string
  loadMeta: () => Promise<{ meta: ExperimentMeta }>
  component: ComponentType
}

// Add one object here each time you finish a new experiment.
const experiments: ExperimentEntry[] = [
  {
    slug: 'magnetic-button',
    loadMeta:  () => import('@/experiments/magnetic-button/meta'),
    component: lazy(() => import('@/experiments/magnetic-button/Component')),
  },
  {
    slug: 'cursor-lag-trail',
    loadMeta:  () => import('@/experiments/cursor-lag-trail/meta'),
    component: lazy(() => import('@/experiments/cursor-lag-trail/Component')),
  },
  {
    slug: 'text-scramble',
    loadMeta:  () => import('@/experiments/text-scramble/meta'),
    component: lazy(() => import('@/experiments/text-scramble/Component')),
  },
  {
    slug: 'infinite-marquee',
    loadMeta:  () => import('@/experiments/infinite-marquee/meta'),
    component: lazy(() => import('@/experiments/infinite-marquee/Component')),
  },
]

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getAllExperiments(): Promise<ExperimentMeta[]> {
  const metas = await Promise.all(
    experiments.map(async ({ slug, loadMeta }) => {
      const mod = await loadMeta()
      return { ...mod.meta, slug }
    })
  )
  return metas.sort((a, b) => a.phase - b.phase)
}

export function getLazyComponent(slug: string): ComponentType | null {
  return experiments.find((e) => e.slug === slug)?.component ?? null
}

export function getAllSlugs(): string[] {
  return experiments.map((e) => e.slug)
}
