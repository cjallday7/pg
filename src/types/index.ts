export type Phase = 1 | 2 | 3 | 4 | 5 | 6

export interface ExperimentMeta {
  slug: string
  title: string
  description: string
  explanation: string
  phase: Phase
  category: string
  tech: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
}
