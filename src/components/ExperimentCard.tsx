'use client'

import { motion } from 'framer-motion'
import { ExperimentMeta } from '@/types'
import { PreviewContainer } from './PreviewContainer'
import { getComponentLoader } from '@/lib/registry'
import { PhaseLabel } from './PhaseLabel'

interface Props {
  meta: ExperimentMeta
  onOpen: (slug: string) => void
}

export function ExperimentCard({ meta, onOpen }: Props) {
  const loader = getComponentLoader(meta.slug)

  return (
    <motion.article
      layoutId={`card-${meta.slug}`}
      onClick={() => onOpen(meta.slug)}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 hover:border-white/15 transition-colors"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Live scaled preview */}
      <div className="relative aspect-video">
        {loader ? (
          <PreviewContainer loader={loader} isCardPreview />
        ) : (
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
            <span className="text-neutral-600 text-sm">Coming soon</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            View experiment
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-medium text-sm leading-snug">
            {meta.title}
          </h3>
          <PhaseLabel phase={meta.phase} />
        </div>
        <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2">
          {meta.description}
        </p>
        <div className="flex gap-1.5 flex-wrap pt-1">
          {meta.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
