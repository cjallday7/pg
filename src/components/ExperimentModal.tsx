'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExperimentMeta } from '@/types'
import { PreviewContainer } from './PreviewContainer'
import { CodeBlock } from './CodeBlock'
import { getLazyComponent } from '@/lib/registry'

interface Props {
  meta: ExperimentMeta | null
  onClose: () => void
}

type Tab = 'about' | 'code'

const DIFFICULTY_STYLES = {
  beginner:     'bg-green-900/50 text-green-400',
  intermediate: 'bg-yellow-900/50 text-yellow-400',
  advanced:     'bg-red-900/50 text-red-400',
}

interface SourceData {
  source: string
  highlighted: string
}

async function fetchSource(slug: string): Promise<SourceData | null> {
  const res = await fetch(`/api/source?slug=${slug}`)
  if (!res.ok) return null
  const data = await res.json()
  if (!data.source || !data.highlighted) return null
  return { source: data.source, highlighted: data.highlighted }
}

export function ExperimentModal({ meta, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('about')
  const [sourceData, setSourceData] = useState<SourceData | null | false>(null)
  // null = not yet fetched, false = fetch failed, SourceData = ready

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Fetch source when switching to code tab
  useEffect(() => {
    if (activeTab === 'code' && meta && sourceData === null) {
      fetchSource(meta.slug).then((data) => setSourceData(data ?? false))
    }
  }, [activeTab, meta, sourceData])

  // Reset state when a new experiment opens
  useEffect(() => {
    setActiveTab('about')
    setSourceData(null)
  }, [meta?.slug])

  if (!meta) return null

  const component = getLazyComponent(meta.slug)

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel — shares layoutId with card for the expand transition */}
      <motion.div
        key="modal"
        layoutId={`card-${meta.slug}`}
        className="fixed inset-4 md:inset-8 z-50 bg-neutral-950 rounded-3xl overflow-hidden flex flex-col md:flex-row border border-white/10"
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      >
        {/* Left: full-size preview */}
        <div className="flex-1 min-h-[40vh] md:min-h-0 relative bg-neutral-900">
          {component && (
            <PreviewContainer component={component} isCardPreview={false} />
          )}
        </div>

        {/* Right: info panel */}
        <div className="w-full md:w-[420px] flex flex-col border-t md:border-t-0 md:border-l border-white/10 min-h-0">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4 shrink-0">
            <div>
              <h2 className="text-white font-semibold text-lg leading-snug">
                {meta.title}
              </h2>
              <p className="text-neutral-400 text-sm mt-1">
                {meta.category} · Phase {meta.phase}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-white transition-colors shrink-0 mt-0.5 text-lg leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10 shrink-0">
            {(['about', 'code'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-white'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {activeTab === 'about' && (
              <div className="p-6 space-y-5">
                <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
                  {meta.explanation}
                </p>
                <div>
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">
                    Tech used
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {meta.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs text-neutral-300 bg-neutral-800 px-2.5 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className={`inline-block text-xs px-2.5 py-1 rounded-full ${
                    DIFFICULTY_STYLES[meta.difficulty]
                  }`}
                >
                  {meta.difficulty}
                </span>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="h-full">
                {sourceData === null ? (
                  <div className="p-6 text-neutral-500 text-sm">
                    Loading source...
                  </div>
                ) : sourceData === false ? (
                  <div className="p-6 text-neutral-500 text-sm">
                    Source not available.
                  </div>
                ) : (
                  <CodeBlock
                    source={sourceData.source}
                    highlighted={sourceData.highlighted}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
