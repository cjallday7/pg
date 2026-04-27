import { ExperimentMeta } from '@/types'

export const meta: ExperimentMeta = {
  slug: 'cursor-lag-trail',
  title: 'Custom Cursor with Lag Trail',
  description: 'A dot cursor that moves instantly while a ring trails behind with spring lag.',
  explanation: `The default cursor is hidden with \`cursor: none\` on the container. Two absolutely-positioned divs replace it: a small dot that snaps to the mouse immediately, and a larger ring that chases the dot using linear interpolation (lerp) on every animation frame.

The lerp factor (0.12) means the ring closes 12% of the remaining gap each frame — this creates the characteristic trailing lag. All animation runs in a single \`requestAnimationFrame\` loop with no CSS transitions on transform, which avoids fighting between the two systems.

Interactive states (scale on hover, shrink on press) are also handled via lerped target values rather than CSS transitions, keeping the motion unified and fluid.`,
  phase: 1,
  category: 'Cursor & Mouse Magic',
  tech: ['React', 'requestAnimationFrame'],
  difficulty: 'beginner',
  tags: ['cursor', 'lerp', 'raf', 'mouse', 'animation'],
}
