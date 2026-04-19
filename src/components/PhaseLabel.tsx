import { Phase } from '@/types'

const PHASE_CONFIG: Record<
  Phase,
  { label: string; className: string }
> = {
  1: { label: 'Cursor & Mouse',  className: 'bg-violet-900/50 text-violet-300' },
  2: { label: 'Scroll',          className: 'bg-blue-900/50 text-blue-300' },
  3: { label: 'Canvas 2D',       className: 'bg-cyan-900/50 text-cyan-300' },
  4: { label: 'Three.js',        className: 'bg-emerald-900/50 text-emerald-300' },
  5: { label: 'Shaders',         className: 'bg-orange-900/50 text-orange-300' },
  6: { label: 'Advanced',        className: 'bg-red-900/50 text-red-300' },
}

export function PhaseLabel({ phase }: { phase: Phase }) {
  const { label, className } = PHASE_CONFIG[phase]
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  )
}
