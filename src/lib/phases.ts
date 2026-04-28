import type { Phase } from '@/types'

interface PhaseRecord {
  id: Phase
  label: string
  className: string
}

const PHASE_RECORDS: PhaseRecord[] = [
  { id: 1, label: 'Cursor & Mouse', className: 'bg-violet-900/50 text-violet-300'   },
  { id: 2, label: 'Scroll',         className: 'bg-blue-900/50 text-blue-300'       },
  { id: 3, label: 'Canvas 2D',      className: 'bg-cyan-900/50 text-cyan-300'       },
  { id: 4, label: 'Three.js',       className: 'bg-emerald-900/50 text-emerald-300' },
  { id: 5, label: 'Shaders',        className: 'bg-orange-900/50 text-orange-300'   },
  { id: 6, label: 'Advanced',       className: 'bg-red-900/50 text-red-300'         },
]

export const PHASE_OPTIONS: { id: Phase; label: string }[] =
  PHASE_RECORDS.map(({ id, label }) => ({ id, label }))

export const PHASE_CONFIG: Record<Phase, { label: string; className: string }> =
  Object.fromEntries(
    PHASE_RECORDS.map(({ id, label, className }) => [id, { label, className }])
  ) as Record<Phase, { label: string; className: string }>
