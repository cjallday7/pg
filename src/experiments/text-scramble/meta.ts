import { ExperimentMeta } from '@/types'

export const meta: ExperimentMeta = {
  slug: 'text-scramble',
  title: 'Text Scramble',
  description: 'Text that cycles through random characters before resolving to its real value.',
  explanation: `A TextScramble class drives a requestAnimationFrame loop that renders each character in one of three states: resolved (final character), scrambling (random glyph from the character set), or pending (original character).

Each character gets a random start and end frame on every setText call, which creates the staggered resolve effect. The loop fires a Promise when all characters land — making chained sequences trivial with async/await.

The headline auto-cycles through five phrases, pausing 2.2s between each setText. The hover buttons re-scramble to their own text on mouseenter, demonstrating the same mechanic with a different trigger.`,
  phase: 1,
  category: 'Cursor & Mouse Magic',
  tech: ['React', 'requestAnimationFrame'],
  difficulty: 'beginner',
  tags: ['text', 'scramble', 'raf', 'animation', 'typography'],
}
