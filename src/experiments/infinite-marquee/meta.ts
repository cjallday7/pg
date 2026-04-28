import { ExperimentMeta } from '@/types'

export const meta: ExperimentMeta = {
  slug: 'infinite-marquee',
  title: 'Infinite Marquee',
  description: 'A scrolling ticker that speeds up when the user scrolls and eases back to normal.',
  explanation: `The marquee duplicates its content so the strip can loop seamlessly — when the first copy exits left, it wraps back around invisibly.

Speed is driven by a velocity accumulator: each wheel event adds deltaY to the velocity, and a requestAnimationFrame loop applies friction (×0.9 per frame) to decay it. The velocity is mapped to a playback rate multiplier, so fast scrolls produce fast marquee and the strip always eases back to its base pace.

Direction is toggled by a button click — reversing the sign of the base speed so the same velocity/friction system works identically in both directions.`,
  phase: 1,
  category: 'Cursor & Mouse Magic',
  tech: ['React', 'requestAnimationFrame', 'CSS custom properties'],
  difficulty: 'beginner',
  tags: ['marquee', 'scroll', 'velocity', 'animation', 'ticker'],
}
