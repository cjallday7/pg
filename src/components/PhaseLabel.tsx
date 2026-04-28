import { Phase } from '@/types'
import { PHASE_CONFIG } from '@/lib/phases'

export function PhaseLabel({ phase }: { phase: Phase }) {
  const { label, className } = PHASE_CONFIG[phase]
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  )
}
