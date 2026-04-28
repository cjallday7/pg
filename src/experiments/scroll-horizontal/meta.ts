import { ExperimentMeta } from '@/types'

export const meta: ExperimentMeta = {
  slug: 'scroll-horizontal',
  title: 'Scroll-Linked Horizontal',
  description: 'A section that travels sideways while you scroll vertically — four panels locked to scroll progress.',
  explanation: `The outer div is the scroll container (overflow-y: scroll). A ResizeObserver keeps the tall spacer at 4× the container height and pins the sticky viewport to exactly that height so it never scrolls away.

On every scroll event, progress = scrollTop / (scrollHeight − clientHeight), clamped to [0, 1]. The horizontal track is 400% wide (four panels), so translateX(−75% × progress) maps the full scroll range to exactly three panel-widths of rightward travel.

The progress bar and dot indicator update in the same handler. Once the user scrolls past the spacer, normal document flow resumes — the sticky element unsticks and the page continues.`,
  phase: 2,
  category: 'Scroll Experiences',
  tech: ['React', 'CSS sticky', 'ResizeObserver'],
  difficulty: 'beginner',
  tags: ['scroll', 'horizontal', 'sticky', 'progress', 'parallax'],
}
