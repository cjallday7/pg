'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ExperimentMeta, Phase } from '@/types'
import { ExperimentCard } from './ExperimentCard'
import { ExperimentModal } from './ExperimentModal'
import { FilterBar } from './FilterBar'

interface Props {
  experiments: ExperimentMeta[]
}

export function Gallery({ experiments }: Props) {
  const [activePhase, setActivePhase] = useState<Phase | null>(null)
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const filtered = activePhase
    ? experiments.filter((e) => e.phase === activePhase)
    : experiments

  const openMeta = experiments.find((e) => e.slug === openSlug) ?? null

  return (
    <>
      <div className="px-6 pb-8 max-w-7xl mx-auto space-y-8">
        <FilterBar activePhase={activePhase} onChange={setActivePhase} />

        {filtered.length === 0 ? (
          <p className="text-neutral-500 text-sm pt-8">
            No experiments in this phase yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((meta) => (
              <ExperimentCard
                key={meta.slug}
                meta={meta}
                onOpen={setOpenSlug}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {openMeta && (
          <ExperimentModal
            key={openMeta.slug}
            meta={openMeta}
            onClose={() => setOpenSlug(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
