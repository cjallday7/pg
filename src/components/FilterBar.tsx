'use client'

import { Phase } from '@/types'

const PHASES: { id: Phase; label: string }[] = [
  { id: 1, label: 'Cursor & Mouse' },
  { id: 2, label: 'Scroll' },
  { id: 3, label: 'Canvas 2D' },
  { id: 4, label: 'Three.js' },
  { id: 5, label: 'Shaders' },
  { id: 6, label: 'Advanced' },
]

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
      {PHASES.map((phase) => (
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
