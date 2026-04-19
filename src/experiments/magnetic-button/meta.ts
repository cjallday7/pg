import { ExperimentMeta } from '@/types'

export const meta: ExperimentMeta = {
  slug: 'magnetic-button',
  title: 'Magnetic Button',
  description: 'A button that physically attracts the cursor and springs back when it leaves.',
  explanation: `The button tracks cursor position via mousemove and calculates distance to its own center. Within an 80px attraction radius, a proportional translate transform is applied — the button physically moves toward the cursor.

On exit the button springs back to its origin using a CSS cubic-bezier transition. The text inside shifts at a smaller multiplier, giving it a subtle independent float.

Key concept: converting raw page coordinates into a normalized offset relative to the element center, then scaling by a strength multiplier to control how aggressively the button chases the cursor.`,
  phase: 1,
  category: 'Cursor & Mouse Magic',
  tech: ['React', 'CSS Transforms'],
  difficulty: 'beginner',
  tags: ['cursor', 'mouse', 'spring', 'transform'],
}
