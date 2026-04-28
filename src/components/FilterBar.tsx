'use client'

import { Phase } from '@/types'
import { PHASE_OPTIONS } from '@/lib/phases'

interface Props {
  activePhase: Phase | null
  onChange: (phase: Phase | null) => void
}

export function FilterBar({ activePhase, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap items-center">
      <button
        onClick={() => onChange(null)}
        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
          !activePhase
            ? 'bg-white text-black'
            : 'bg-neutral-800 text-neutral-400 hover:text-white'
        }`}
      >
        All
      </button>
      {PHASE_OPTIONS.map((phase) => (
        <button
          key={phase.id}
          onClick={() =>
            onChange(activePhase === phase.id ? null : phase.id)
          }
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            activePhase === phase.id
              ? 'bg-white text-black'
              : 'bg-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          {phase.label}
        </button>
      ))}
    </div>
  )
}
